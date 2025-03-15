/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  bracketSpacing: true,
  arrowParens: 'avoid',
  endOfLine: 'lf',

  // NOTE: prettier-plugin-tailwindcss must be the last plugin in the array
  plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],

  // Sort imports
  importOrder: [
    '^react($|/)',
    '^next($|/)',
    '',
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '',
    '^[./]',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',

  // Tailwind CSS class sorting configuration
  tailwindFunctions: ['cn', 'clsx', 'cva', 'tw'],
  tailwindAttributes: ['tw'],
};
