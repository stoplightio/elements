const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      // Needed for node_modules/@stoplight/prism-http/dist/getHttpOperations.js
      fs: 'empty',
    },
    resolve: {
      alias: {
        'decimal.js': path.join(__dirname, '..', '..', 'node_modules', 'decimal.js', 'decimal.js'),
      },
    },
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  const match = page.path.match(/^\/(api|stoplight-project)/);
  if (match) {
    page.matchPath = `${match[0]}/*`;

    // Update the page.
    createPage(page);
  }
};
