/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    base: "/paletaaa",
    server: {
        host: "0.0.0.0",
        port: 4000,
    },
    preview: {
        host: "0.0.0.0",
        port: 4001,
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
    build: {
        emptyOutDir: true,
    },
    plugins: [react()],
    test: {
        environment: "jsdom",
        globals: true,
    }
});
