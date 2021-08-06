module.exports = {
  ...require('../../jest.config'),
  reporters: [
    'default',
    [
      'jest-junit',
      { suiteName: 'elements-core', outputFile: '<rootDir>/../../test-results/elements-core/results.xml' },
    ],
  ],
};
