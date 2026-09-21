import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import query from "@tanstack/eslint-plugin-query";

const eslintConfig = defineConfig([
	...nextVitals,
	...nextTs,

	// Подключаем React Query Plugin
	{
		plugins: {
			"@tanstack/query": query,
		},
		rules: {
			// Включаем recommended-настройки, как советует TanStack
			...query.configs.recommended.rules,
		},
	},

	// Override default ignores of eslint-config-next.
	globalIgnores([
		// Default ignores of eslint-config-next:
		".next/**",
		"out/**",
		"build/**",
		"next-env.d.ts",
	]),
]);

export default eslintConfig;
