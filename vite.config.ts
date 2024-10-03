/// <reference types="vitest" />

import path from "path";
import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), svgrPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3333,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
