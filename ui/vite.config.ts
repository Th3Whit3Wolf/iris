/// <reference types="vitest" />
/// <reference types="vite/client" />

import eslintPlugin from "@nabla/vite-plugin-eslint";
import { ViteAliases } from "vite-aliases";
import tsconfigPaths from "vite-tsconfig-paths";
import mkcert from "vite-plugin-mkcert";
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: true,
  },
  plugins: [ 
    react(),
    tsconfigPaths(),
    ViteAliases({ prefix: "#", useTypescript: true }),
    mkcert(),
    eslintPlugin()
    ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/vitest.config.ts'],
  },
})