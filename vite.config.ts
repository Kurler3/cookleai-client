import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from 'vite-tsconfig-paths';

import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");
    return {
        plugins: [react(), tsconfigPaths()],
        define: {
            "process.env": env,
        },
        server: {
            open: true,
        }
    };
});

