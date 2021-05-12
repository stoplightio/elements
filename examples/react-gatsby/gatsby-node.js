exports.onCreateWebpackConfig = ({ stage, loaders, actions, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        "http": false,
        "https": false,
        "stream": false,
        "path": false,
        "process": false
      }
    }
  });

  if (stage === 'build-javascript' || stage === 'develop') {
    actions.setWebpackConfig({
      plugins: [
        plugins.provide({ process: 'process/browser' })
      ]
    })
  }

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
