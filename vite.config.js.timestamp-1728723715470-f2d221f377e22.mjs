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
              return "element-ui";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJGOlxcXFxXZWJzaXRlIFN0dWR5XFxcXElTXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJGOlxcXFxXZWJzaXRlIFN0dWR5XFxcXElTXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9GOi9XZWJzaXRlJTIwU3R1ZHkvSVMvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCBwb3N0Q3NzUHhUb1JlbSBmcm9tICdwb3N0Y3NzLXB4dG9yZW0nO1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnO1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIEF1dG9JbXBvcnQoe1xuICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3M6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcG9zdENzc1B4VG9SZW0oe1xuICAgICAgICAgIHJvb3RWYWx1ZTogMTYsXG4gICAgICAgICAgcHJvcExpc3Q6IFsnKiddLFxuICAgICAgICB9KSxcbiAgICAgICAgYXV0b3ByZWZpeGVyKHtcbiAgICAgICAgICBvdmVycmlkZUJyb3dzZXJzbGlzdDogW1xuICAgICAgICAgICAgJ0FuZHJvaWQgNC4xJyxcbiAgICAgICAgICAgICdpT1MgNy4xJyxcbiAgICAgICAgICAgICdDaHJvbWUgPiAzMScsXG4gICAgICAgICAgICAnZmYgPiAzMScsXG4gICAgICAgICAgICAnaWUgPj0gOCcsXG4gICAgICAgICAgICAnbGFzdCAyIHZlcnNpb25zJyxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGdyaWQ6IHRydWUsXG4gICAgICAgIH0pLFxuICAgICAgICB0YWlsd2luZGNzc1xuICAgICAgXVxuICAgIH0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzJykpIHtcbiAgICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnZWxlbWVudC1wbHVzJykpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdlbGVtZW50LXVpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAndmVuZG9yJztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gXHU1QkY5XHU0RThFXHU0RjYwXHU3Njg0XHU0RTNCXHU2NTg3XHU0RUY2XHU1NDhDXHU4QkVEXHU4QTAwXHU2NTg3XHU0RUY2XG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdzcmMvbWFpbi5qcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ21haW4nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ3NyYy9sYW5ncy8nKSkgeyAvLyBcdTY4MzlcdTYzNkVcdTVCOUVcdTk2NDVcdThERUZcdTVGODRcdThDMDNcdTY1NzRcbiAgICAgICAgICAgIHJldHVybiAnbGFuZ3VhZ2UnO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBcdTUxNzZcdTRGNTlcdTY1ODdcdTRFRjZcdTcyRUNcdTdBQ0JcdTYyNTNcdTUzMDVcbiAgICAgICAgfSwgICAgICAgIFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGFzc2V0RmlsZU5hbWVzKGFzc2V0SW5mbykge1xuICAgICAgICAgIGlmIChhc3NldEluZm8ubmFtZS5lbmRzV2l0aCgnLmNzcycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9jc3MvW25hbWVdLVtoYXNoXS5jc3MnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBpbWFnZUV4dHMgPSBbJy5wbmcnLCAnLmpwZycsICcuanBlZycsICcuZ2lmJywgJy5zdmcnLCAnLndlYnAnLCAnLmljbycsICcuYm1wJywgJy5naWYnXTtcbiAgICAgICAgICBpZiAoaW1hZ2VFeHRzLnNvbWUoZXh0ID0+IGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKGV4dCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9pbWdzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBmb250RXh0cyA9IFsnLndvZmYnLCAnLndvZmYyJywgJy50dGYnLCAnLmVvdCcsICcub3RmJ107XG4gICAgICAgICAgaWYgKGZvbnRFeHRzLnNvbWUoZXh0ID0+IGFzc2V0SW5mby5uYW1lLmVuZHNXaXRoKGV4dCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9mb250cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICdhc3NldHMvW2V4dG5hbWVdL1tuYW1lXS1baGFzaF0uW2V4dG5hbWVdJztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQW1QLFNBQVMsZUFBZSxXQUFXO0FBQ3RSLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQVIrRyxJQUFNLDJDQUEyQztBQVNwTSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN0RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNQLGVBQWU7QUFBQSxVQUNiLFdBQVc7QUFBQSxVQUNYLFVBQVUsQ0FBQyxHQUFHO0FBQUEsUUFDaEIsQ0FBQztBQUFBLFFBQ0QsYUFBYTtBQUFBLFVBQ1gsc0JBQXNCO0FBQUEsWUFDcEI7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE1BQU07QUFBQSxRQUNSLENBQUM7QUFBQSxRQUNEO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixhQUFhLElBQUk7QUFDZixjQUFJLEdBQUcsU0FBUyxjQUFjLEdBQUc7QUFDL0IsZ0JBQUksR0FBRyxTQUFTLGNBQWMsR0FBRztBQUMvQixxQkFBTztBQUFBLFlBQ1Q7QUFDQSxtQkFBTztBQUFBLFVBQ1Q7QUFFQSxjQUFJLEdBQUcsU0FBUyxhQUFhLEdBQUc7QUFDOUIsbUJBQU87QUFBQSxVQUNUO0FBQ0EsY0FBSSxHQUFHLFNBQVMsWUFBWSxHQUFHO0FBQzdCLG1CQUFPO0FBQUEsVUFDVDtBQUFBLFFBRUY7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFFBQ2hCLGdCQUFnQjtBQUFBLFFBQ2hCLGVBQWUsV0FBVztBQUN4QixjQUFJLFVBQVUsS0FBSyxTQUFTLE1BQU0sR0FBRztBQUNuQyxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxnQkFBTSxZQUFZLENBQUMsUUFBUSxRQUFRLFNBQVMsUUFBUSxRQUFRLFNBQVMsUUFBUSxRQUFRLE1BQU07QUFDM0YsY0FBSSxVQUFVLEtBQUssU0FBTyxVQUFVLEtBQUssU0FBUyxHQUFHLENBQUMsR0FBRztBQUN2RCxtQkFBTztBQUFBLFVBQ1Q7QUFDQSxnQkFBTSxXQUFXLENBQUMsU0FBUyxVQUFVLFFBQVEsUUFBUSxNQUFNO0FBQzNELGNBQUksU0FBUyxLQUFLLFNBQU8sVUFBVSxLQUFLLFNBQVMsR0FBRyxDQUFDLEdBQUc7QUFDdEQsbUJBQU87QUFBQSxVQUNUO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
