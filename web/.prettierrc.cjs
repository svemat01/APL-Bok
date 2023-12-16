/** @type {import('prettier').Config} */
module.exports = {
    pluginSearchDirs: false,
    // plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
    // overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
    plugins: ['prettier-plugin-svelte'],
    // pluginSearchDirs: ['.'], // should be removed in v3
    overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],

    useTabs: false,
    tabWidth: 4,
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
};
