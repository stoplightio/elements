import { defineConfig } from 'cypress';

export default defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/results/output.xml',
    toConsole: false,
  },
  screenshotsFolder: 'cypress/results/screenshots',
  videosFolder: 'cypress/results/videos',
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:4200/',
  },
});
