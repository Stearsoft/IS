import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import postCssPxToRem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16,
          propList: ['*'],
        }),
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            'last 2 versions',
          ],
          grid: true,
        }),
        tailwindcss
      ]
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('element-plus')) {
              return 'element-ui';
            }
            return 'vendor';
          }
          // 对于你的主文件和语言文件
          if (id.includes('src/main.js')) {
            return 'main';
          }
          if (id.includes('src/langs/')) { // 根据实际路径调整
            return 'language';
          }
          // 其余文件独立打包
        },        
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith('.css')) {
            return 'assets/css/[name]-[hash].css';
          }
          const imageExts = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico', '.bmp', '.gif'];
          if (imageExts.some(ext => assetInfo.name.endsWith(ext))) {
            return 'assets/imgs/[name]-[hash][extname]';
          }
          const fontExts = ['.woff', '.woff2', '.ttf', '.eot', '.otf'];
          if (fontExts.some(ext => assetInfo.name.endsWith(ext))) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[extname]/[name]-[hash].[extname]';
        }
      }
    }
  }
});
