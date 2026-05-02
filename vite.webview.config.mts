import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production")
  },
  build: {
    outDir: path.resolve(projectRoot, "media", "webview"),
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(projectRoot, "webview", "src", "main.tsx"),
      formats: ["es"],
      fileName: () => "gitLogWebview.js"
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "gitLogWebview.css";
          }

          return "[name][extname]";
        }
      }
    }
  }
});
