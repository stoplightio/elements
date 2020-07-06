module.exports = {
  stories: ['../src/__stories__/**/*.tsx'],
  addons: [
    '@storybook/addon-knobs/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/.tsx$/],
        },
        loaderOptions: {
          parser: 'typescript',
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
};
