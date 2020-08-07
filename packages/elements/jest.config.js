module.exports = {
  preset: '@stoplight/scripts',
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['./setupTests.ts'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  coveragePathIgnorePatterns: ['__tests__', '__fixtures__', '__stories__'],
  moduleNameMapper: {
    'use-resize-observer': 'use-resize-observer/dist/bundle.esm.js',
  },
  transformIgnorePatterns: ['node_modules/(?!use-resize-observer/)'],
  globals: {
    'ts-jest': {
      tsConfig: {
        allowJs: true,
      },
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
};
