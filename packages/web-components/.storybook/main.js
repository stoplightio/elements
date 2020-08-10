module.exports = {
  stories: ['../src/__stories__/**/*.{js,jsx,ts,tsx}'],
  addons: [
    '@storybook/addon-knobs/register',
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          test: [/__stories__\/.*.tsx?$/],
        },
        loaderOptions: {
          parser: 'typescript',
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
  ],
};
