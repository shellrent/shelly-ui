module.exports = {
	env: { browser: true, es2020: true },
	extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:react/recommended",
        "plugin:storybook/recommended"
    ],
	parser: '@typescript-eslint/parser',
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	plugins: [
		'react',
		'unused-imports'
	],
	settings: {
		"react": {
			"version": "detect"
		},
	},
	rules: {
		'semi': [2, "always"],
		"indent": [2, "tab"],
		"react/prop-types": 0,
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{
				"vars": "all",
				"varsIgnorePattern": "^_",
				"args": "after-used",
				"argsIgnorePattern": "^_"
			}
		],
		"sort-imports": [
			"error",
			{
				"ignoreDeclarationSort": true
			}
		]
	},
};

