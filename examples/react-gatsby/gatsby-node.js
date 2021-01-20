const path = require('path');

exports.onCreateWebpackConfig = ({
  stage,
  rules,
  loaders,
  plugins,
  actions,
}) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'json-schema-faker': path.resolve(__dirname, 'node_modules/json-schema-faker/dist/main.cjs.js'),
          'decimal.js': path.resolve(__dirname, 'node_modules/decimal.js/decimal.js'),
        },
      },
      node: {
        // Needed for node_modules/@stoplight/prism-http/dist/getHttpOperations.js
        fs: "empty",
      },
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null(),
          },
        ],
      }
    })
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  const match = page.path.match(/^\/(elements|zoom-api)/);
  if (match) {
    page.matchPath = `${match[0]}/*`;

    // Update the page.
    createPage(page);
  }
};
