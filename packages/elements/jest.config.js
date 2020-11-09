module.exports = {
  preset: '@stoplight/scripts',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['./setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: ['__tests__', '__fixtures__', '__stories__'],
  moduleNameMapper: {
    '^@stoplight/elements-utils$': '<rootDir>/../elements-utils/src',
  },
};
