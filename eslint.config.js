import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [
			js.configs.recommended,
			importPlugin.flatConfigs.recommended,
			...tseslint.configs.recommended,
		],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'unused-imports': unusedImports,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'@typescript-eslint/no-unused-vars': 'off',
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				'warn',
				{
					vars: 'all',
					varsIgnorePattern: '^_',
					args: 'after-used',
					argsIgnorePattern: '^_',
				},
			],
			'import/prefer-default-export': 'off',
			'import/no-unresolved': 'off',
			'import/extensions': 'off',
			'react/require-default-props': 'off',
			'react/react-in-jsx-scope': 'off',
			'import/no-import-module-exports': 'off',
			'@typescript-eslint/ban-ts-comment': 'off',
			'no-shadow': 'warn',
			'react/function-component-definition': 'off',
			'no-underscore-dangle': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal'],
					pathGroups: [
						{
							pattern: 'react',
							group: 'external',
							position: 'before',
						},
					],
					pathGroupsExcludedImportTypes: ['react'],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
		},
	},
	eslintConfigPrettier,
);
