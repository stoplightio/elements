module.exports = {
  arrowParens: 'avoid',
  printWidth: 120,
  trailingComma: 'all',
  proseWrap: 'always',
  singleQuote: true,
  overrides: [
    {
      files: 'package*.json',
      options: {
        printWidth: 1000,
      },
    },
  ],
};
