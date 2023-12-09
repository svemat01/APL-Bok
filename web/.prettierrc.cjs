/** @type {import('prettier').Config} */
module.exports = {
    pluginSearchDirs: false,
    // plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
    // overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
    
    useTabs: false,
    tabWidth: 4,
    printWidth: 100,
    singleQuote: true,
    trailingComma: 'all',
  };