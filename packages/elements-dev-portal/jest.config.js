module.exports = {
  ...require('../../jest.config'),
  reporters: [
    'default',
    [
      'jest-junit',
      { suiteName: 'elements-dev-portal', outputFile: '<rootDir>/../../test-results/elements-dev-portal/results.xml' },
    ],
  ],
};
