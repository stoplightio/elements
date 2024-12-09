module.exports = {
  ...require('../../jest.config'),
  reporters: [
    'default',
    [
      'jest-junit',
      { suiteName: 'elements-utils', outputFile: '<rootDir>/../../test-results/elements-utils/results.xml' },
    ],
  ],
};
