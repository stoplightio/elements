exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /canvas/,
            use: loaders.null(),
          },
        ],
      },
    });
  }
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  const match = page.path.match(/^\/(stoplight-project|zoom-api)/);
  if (match) {
    page.matchPath = `${match[0]}/*`;

    // Update the page.
    createPage(page);
  }
};
