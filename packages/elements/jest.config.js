module.exports = {
  ...require('../../jest.config'),
  reporters: [
    'default',
    ['jest-junit', { suiteName: 'elements', outputFile: '<rootDir>/../../test-results/elements/results.xml' }],
  ],
};
