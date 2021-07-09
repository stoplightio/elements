exports.onCreateWebpackConfig = ({ stage, actions, plugins }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
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
