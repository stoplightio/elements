module.exports = {
  preset: '@stoplight/scripts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/../../setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  testMatch: ['<rootDir>/src/**/*.(spec|test).(ts|js)?(x)'],
  coveragePathIgnorePatterns: ['__tests__', '__fixtures__', '__stories__'],
  testTimeout: 10000,
  moduleNameMapper: {
    '^@stoplight/elements-core$': '<rootDir>/../elements-core/src',
  },
};
