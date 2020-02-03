module.exports = {
  preset: '@stoplight/scripts',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: ['__tests__', '__fixtures__', '__stories__'],
  moduleNameMapper: {
    'worker-loader.+(.\\/.+)$': '<rootDir>/src/$1'
  },
};
