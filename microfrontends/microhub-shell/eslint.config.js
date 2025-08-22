const js = require("@eslint/js");
const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const prettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
	{
		ignores: [
			"dist/",
			"build/",
			"coverage/",
			"node_modules/",
			"**/*.d.ts",
			"webpack.*.js",
			"tailwind.config.js",
			"pnpm-lock.yaml",
			"package-lock.json",
			"yarn.lock",
			"eslint.config.js",
			"config/",
		],
	},
	js.configs.recommended,
	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json",
			},
			globals: {
				...globals.browser,
				...globals.node,
				...globals.es2021,
			},
		},
		plugins: {
			"@typescript-eslint": typescript,
			react: react,
			"react-hooks": reactHooks,
		},
		rules: {
			...typescript.configs.recommended.rules,
			"react/react-in-jsx-scope": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
			"@typescript-eslint/no-explicit-any": "warn",
			"react-hooks/rules-of-hooks": "error",
			"react-hooks/exhaustive-deps": "warn",
		},
		settings: {
			react: {
				version: "detect",
			},
		},
	},
	prettier,
];
