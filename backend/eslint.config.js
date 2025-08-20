const js = require("@eslint/js");
const typescript = require("@typescript-eslint/eslint-plugin");
const typescriptParser = require("@typescript-eslint/parser");
const prettier = require("eslint-config-prettier");
const globals = require("globals");

module.exports = [
	{
		ignores: [
			"dist/",
			"coverage/",
			"node_modules/",
			"**/*.d.ts",
			"jest.config.js",
			"eslint.config.js",
			".eslintrc.js",
			"test/",
		],
	},
	js.configs.recommended,
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: typescriptParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json",
			},
			globals: {
				...globals.node,
				...globals.jest,
				...globals.es2021,
			},
		},
		plugins: {
			"@typescript-eslint": typescript,
		},
		rules: {
			...typescript.configs.recommended.rules,
			"@typescript-eslint/interface-name-prefix": "off",
			"@typescript-eslint/explicit-function-return-type": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-explicit-any": "warn",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{ argsIgnorePattern: "^_" },
			],
			"prefer-const": "error",
			"@typescript-eslint/no-var-requires": "off",
		},
	},
	prettier,
];
