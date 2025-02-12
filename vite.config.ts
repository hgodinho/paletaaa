/// <reference types="vitest/config" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

import { vitePostHog } from "vite-plugin-posthog";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
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
        plugins: [
            react(),
            vitePostHog({
                apiKey: env.REACT_APP_PUBLIC_POSTHOG_KEY,
                hostUrl: env.REACT_APP_PUBLIC_POSTHOG_HOST,
                config: {
                    autocapture: false,
                    capture_pageview: true,
                    capture_pageleave: true,
                    rageclick: true,
                },
            }),
        ],
        test: {
            environment: "jsdom",
            globals: true,
        },
    };
});
