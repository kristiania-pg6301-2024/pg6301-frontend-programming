import {defineConfig} from "vite";
import reactVite from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [reactVite()],
    server: {
        proxy: {
            "/api": "http://localhost:3000"
        }
    }
})
