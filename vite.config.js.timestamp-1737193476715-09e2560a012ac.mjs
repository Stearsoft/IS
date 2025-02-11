// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///F:/Website%20Study/IS/node_modules/vite/dist/node/index.js";
import vue from "file:///F:/Website%20Study/IS/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import postCssPxToRem from "file:///F:/Website%20Study/IS/node_modules/postcss-pxtorem/index.js";
import autoprefixer from "file:///F:/Website%20Study/IS/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwindcss from "file:///F:/Website%20Study/IS/node_modules/tailwindcss/lib/index.js";
import AutoImport from "file:///F:/Website%20Study/IS/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///F:/Website%20Study/IS/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///F:/Website%20Study/IS/node_modules/unplugin-vue-components/dist/resolvers.js";
var __vite_injected_original_import_meta_url = "file:///F:/Website%20Study/IS/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
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
        }),
        tailwindcss
      ]
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("element-plus")) {
              return "element-plus";
            }
            return "vendor";
          }
          if (id.includes("src/main.js")) {
            return "main";
          }
          if (id.includes("src/langs/")) {
            return "language";
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
            return "assets/imgs/[name]-[hash][extname]";
          }
          const fontExts = [".woff", ".woff2", ".ttf", ".eot", ".otf"];
          if (fontExts.some((ext) => assetInfo.name.endsWith(ext))) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[extname]/[name]-[hash].[extname]";
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxXZWJzaXRlIFN0dWR5XFxcXElTXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxXZWJzaXRlIFN0dWR5XFxcXElTXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9XZWJzaXRlJTIwU3R1ZHkvSVMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwb3N0Q3NzUHhUb1JlbSBmcm9tICdwb3N0Y3NzLXB4dG9yZW0nO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcG9zdENzc1B4VG9SZW0oe1xuICAgICAgICAgIHJvb3RWYWx1ZTogMTYsXG4gICAgICAgICAgcHJvcExpc3Q6IFsnKiddLFxuICAgICAgICB9KSxcbiAgICAgICAgYXV0b3ByZWZpeGVyKHtcbiAgICAgICAgICBvdmVycmlkZUJyb3dzZXJzbGlzdDogW1xuICAgICAgICAgICAgJ0FuZHJvaWQgNC4xJyxcbiAgICAgICAgICAgICdpT1MgNy4xJyxcbiAgICAgICAgICAgICdDaHJvbWUgPiAzMScsXG4gICAgICAgICAgICAnZmYgPiAzMScsXG4gICAgICAgICAgICAnaWUgPj0gOCcsXG4gICAgICAgICAgICAnbGFzdCAyIHZlcnNpb25zJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGdyaWQ6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICB0YWlsd2luZGNzc1xuICAgICAgXVxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnZWxlbWVudC1wbHVzJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdlbGVtZW50LXBsdXMnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICd2ZW5kb3InO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9tYWluLmpzJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnbWFpbic7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnc3JjL2xhbmdzLycpKSB7IFxuICAgICAgICAgICAgcmV0dXJuICdsYW5ndWFnZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAgICAgICAgXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBjaHVua0ZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXMoYXNzZXRJbmZvKSB7XG4gICAgICAgICAgaWYgKGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKCcuY3NzJykpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL2Nzcy9bbmFtZV0tW2hhc2hdLmNzcyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGltYWdlRXh0cyA9IFsnLnBuZycsICcuanBnJywgJy5qcGVnJywgJy5naWYnLCAnLnN2ZycsICcud2VicCcsICcuaWNvJywgJy5ibXAnLCAnLmdpZiddO1xuICAgICAgICAgIGlmIChpbWFnZUV4dHMuc29tZShleHQgPT4gYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoZXh0KSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL2ltZ3MvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGZvbnRFeHRzID0gWycud29mZicsICcud29mZjInLCAnLnR0ZicsICcuZW90JywgJy5vdGYnXTtcbiAgICAgICAgICBpZiAoZm9udEV4dHMuc29tZShleHQgPT4gYXNzZXRJbmZvLm5hbWUuZW5kc1dpdGgoZXh0KSkpIHtcbiAgICAgICAgICAgIHJldHVybiAnYXNzZXRzL2ZvbnRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9bZXh0bmFtZV0vW25hbWVdLVtoYXNoXS5bZXh0bmFtZV0nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBbVAsU0FBUyxlQUFlLFdBQVc7QUFDdFIsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8saUJBQWlCO0FBQ3hCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBUitHLElBQU0sMkNBQTJDO0FBU3BNLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztBQUFBLElBQ25DLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gsU0FBUztBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1AsZUFBZTtBQUFBLFVBQ2IsV0FBVztBQUFBLFVBQ1gsVUFBVSxDQUFDLEdBQUc7QUFBQSxRQUNoQixDQUFDO0FBQUEsUUFDRCxhQUFhO0FBQUEsVUFDWCxzQkFBc0I7QUFBQSxZQUNwQjtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFVBQ0EsTUFBTTtBQUFBLFFBQ1IsQ0FBQztBQUFBLFFBQ0Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGFBQWEsSUFBSTtBQUNmLGNBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixnQkFBSSxHQUFHLFNBQVMsY0FBYyxHQUFHO0FBQy9CLHFCQUFPO0FBQUEsWUFDVDtBQUNBLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGNBQUksR0FBRyxTQUFTLGFBQWEsR0FBRztBQUM5QixtQkFBTztBQUFBLFVBQ1Q7QUFDQSxjQUFJLEdBQUcsU0FBUyxZQUFZLEdBQUc7QUFDN0IsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBLFFBQ0EsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZUFBZSxXQUFXO0FBQ3hCLGNBQUksVUFBVSxLQUFLLFNBQVMsTUFBTSxHQUFHO0FBQ25DLG1CQUFPO0FBQUEsVUFDVDtBQUNBLGdCQUFNLFlBQVksQ0FBQyxRQUFRLFFBQVEsU0FBUyxRQUFRLFFBQVEsU0FBUyxRQUFRLFFBQVEsTUFBTTtBQUMzRixjQUFJLFVBQVUsS0FBSyxTQUFPLFVBQVUsS0FBSyxTQUFTLEdBQUcsQ0FBQyxHQUFHO0FBQ3ZELG1CQUFPO0FBQUEsVUFDVDtBQUNBLGdCQUFNLFdBQVcsQ0FBQyxTQUFTLFVBQVUsUUFBUSxRQUFRLE1BQU07QUFDM0QsY0FBSSxTQUFTLEtBQUssU0FBTyxVQUFVLEtBQUssU0FBUyxHQUFHLENBQUMsR0FBRztBQUN0RCxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
