export default {
  testEnvironment: 'node',
  transform: {}, // Disable Babel transformation
  extensionsToTreatAsEsm: ['.js'], // Treat .js files as ES Modules
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Map .js imports correctly
  },
};