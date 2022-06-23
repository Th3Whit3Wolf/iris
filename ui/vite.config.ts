/// <reference types="vitest" />
/// <reference types="vite/client" />
import eslintPlugin from "@nabla/vite-plugin-eslint";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { ViteAliases } from "vite-aliases";
import mkcert from "vite-plugin-mkcert";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
	const apiURL =
		command === "build" ? "https://real-url.com" : "http://localhost:8080";
	return {
		define: {
			"process.env.API_URL": JSON.stringify(apiURL)
		},
		server: {
			https: true
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
			environment: "jsdom",
			setupFiles: ["./src/vitest.config.ts"],
			coverage: {
				reporter: ["text", "html"],
				exclude: ["node_modules/", "**/*.test.{js,ts,tsx}"]
			}
		}
	};
});
