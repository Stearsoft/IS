// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///F:/Website%20Study/IS/node_modules/.store/vite@5.4.7/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/Website%20Study/IS/node_modules/.store/@vitejs+plugin-vue@5.1.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import postCssPxToRem from "file:///F:/Website%20Study/IS/node_modules/.store/postcss-pxtorem@6.1.0/node_modules/postcss-pxtorem/index.js";
import autoprefixer from "file:///F:/Website%20Study/IS/node_modules/.store/autoprefixer@10.4.20/node_modules/autoprefixer/lib/autoprefixer.js";
import Components from "file:///F:/Website%20Study/IS/node_modules/.store/unplugin-vue-components@0.27.4/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///F:/Website%20Study/IS/node_modules/.store/unplugin-vue-components@0.27.4/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///F:/Website%20Study/IS/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 16,
          propList: ["*"]
        }),
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "last 2 versions"
          ],
          grid: true
        })
      ]
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        entryFileNames: "assets/js/[name]-[hash].js",
        chunkFileNames: "assets/js/[name]-[hash].js",
        assetFileNames(assetInfo) {
          if (assetInfo.name.endsWith(".css")) {
            return "assets/css/[name]-[hash].css";
          }
          const imageExts = [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico", ".bmp", ".gif"];
          if (imageExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return "assets/img/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash].[extname]";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxXZWJzaXRlIFN0dWR5XFxcXElTXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxXZWJzaXRlIFN0dWR5XFxcXElTXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9XZWJzaXRlJTIwU3R1ZHkvSVMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwb3N0Q3NzUHhUb1JlbSBmcm9tICdwb3N0Y3NzLXB4dG9yZW0nO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInO1xuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSc7XG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJztcblxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgQ29tcG9uZW50cyh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLCBcbiAgICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW1xuICAgICAgICBwb3N0Q3NzUHhUb1JlbSh7XG4gICAgICAgICAgcm9vdFZhbHVlOiAxNixcbiAgICAgICAgICBwcm9wTGlzdDogWycqJ10sXG4gICAgICAgIH0pLFxuICAgICAgICBhdXRvcHJlZml4ZXIoe1xuICAgICAgICAgIG92ZXJyaWRlQnJvd3NlcnNsaXN0OiBbXG4gICAgICAgICAgICAnQW5kcm9pZCA0LjEnLFxuICAgICAgICAgICAgJ2lPUyA3LjEnLFxuICAgICAgICAgICAgJ0Nocm9tZSA+IDMxJyxcbiAgICAgICAgICAgICdmZiA+IDMxJyxcbiAgICAgICAgICAgICdpZSA+PSA4JyxcbiAgICAgICAgICAgICdsYXN0IDIgdmVyc2lvbnMnLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgZ3JpZDogdHJ1ZSxcbiAgICAgICAgfSksXG4gICAgICBdXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzKGlkKSB7XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMnKSkge1xuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lcyhhc3NldEluZm8pIHtcbiAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoJy5jc3MnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdhc3NldHMvY3NzL1tuYW1lXS1baGFzaF0uY3NzJztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgaW1hZ2VFeHRzID0gWycucG5nJywgJy5qcGcnLCAnLmpwZWcnLCAnLmdpZicsICcuc3ZnJywnLndlYnAnLCAnLmljbycsICcuYm1wJywnLmdpZiddO1xuICAgICAgICAgIGlmIChpbWFnZUV4dHMuc29tZShleHQgPT4gYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoZXh0KSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL2ltZy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICdhc3NldHMvW25hbWVdLVtoYXNoXS5bZXh0bmFtZV0nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVAsU0FBUyxlQUFlLFdBQVc7QUFDdFIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBTitHLElBQU0sMkNBQTJDO0FBU3BNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsZUFBZTtBQUFBLFVBQ2IsV0FBVztBQUFBLFVBQ1gsVUFBVSxDQUFDLEdBQUc7QUFBQSxRQUNoQixDQUFDO0FBQUEsUUFDRCxhQUFhO0FBQUEsVUFDWCxzQkFBc0I7QUFBQSxZQUNwQjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sYUFBYSxJQUFJO0FBQ2YsY0FBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGVBQWUsV0FBVztBQUN4QixjQUFJLFVBQVUsS0FBSyxTQUFTLE1BQU0sR0FBRztBQUNuQyxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxnQkFBTSxZQUFZLENBQUMsUUFBUSxRQUFRLFNBQVMsUUFBUSxRQUFPLFNBQVMsUUFBUSxRQUFPLE1BQU07QUFDekYsY0FBSSxVQUFVLEtBQUssU0FBTyxVQUFVLEtBQUssU0FBUyxHQUFHLENBQUMsR0FBRztBQUN2RCxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
