/** @type {import('prettier').Config} */
module.exports = {
    plugins: ['prettier-plugin-svelte'],
    overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],

    useTabs: false,
    tabWidth: 4,
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
};
