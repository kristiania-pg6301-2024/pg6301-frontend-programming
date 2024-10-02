import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
    },
  },
});
