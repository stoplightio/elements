/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs');
const path = require('path');
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  on('task', {
    readPackageDir(packageName) {
      return {
        'web-components.min.js': fs.readFileSync(path.join(packageName, 'web-components.min.js'), {
          encoding: 'utf-8',
        }),
        'styles.min.css': fs.readFileSync(path.join(packageName, 'styles.min.css'), { encoding: 'utf-8' }),
      };
    },
  });
};
