/** @type { import("eslint").Linter.FlatConfig } */
module.exports = {
    root: true,
    extends: [
        // 'plugin:@typescript-eslint/recommended-type-checked',
        // 'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        'plugin:tailwindcss/recommended',
        'plugin:prettier/recommended',
        'plugin:svelte/recommended',
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'isaacscript', 'import', 'unused-imports'],
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2020,
        extraFileExtensions: ['.svelte'],
        project: './tsconfig.json',
    },
    env: {
        browser: true,
        es2017: true,
        node: true,
    },
    overrides: [
        {
            files: ['*.svelte'],
            parser: 'svelte-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
            },
        },
    ],
    rules: {
        // These off/not-configured-the-way-we-want lint rules we like & opt into
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        'unused-imports/no-unused-vars': [
            'warn',
            { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
        '@typescript-eslint/consistent-type-imports': [
            'error',
            { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
        ],
        'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
        'import/order': [
            'error',
            {
                alphabetize: { order: 'asc' },
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ],
        'unused-imports/no-unused-imports': 'error',

        // For educational purposes we format our comments/jsdoc nicely
        'isaacscript/complete-sentences-jsdoc': 'warn',
        'isaacscript/format-jsdoc-comments': 'warn',

        // These lint rules don't make sense for us but are enabled in the preset configs
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',

        // This rule doesn't seem to be working properly
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',

        // These lint rules are too slow to run on every file
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/unbound-method': 'off',
    },
};
