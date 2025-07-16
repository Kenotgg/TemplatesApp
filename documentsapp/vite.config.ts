import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    plugins: [plugin()],
    server: {
        port: 53477,
    }
})
