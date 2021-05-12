module.exports = {
  preset: '@stoplight/scripts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).(ts|js)?(x)'],
  coveragePathIgnorePatterns: ['__tests__', '__fixtures__', '__stories__'],
  moduleNameMapper: {
    '^@stoplight/elements-utils$': '<rootDir>/../elements-utils/src',
    '^@stoplight/elements-core/(.*)': '<rootDir>/../elements-core/src/$1',
  },
  testTimeout: 10000,
};
