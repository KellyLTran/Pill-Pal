module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Use Babel to transform .js files
  },
  extensionsToTreatAsEsm: ['.jsx'], // Treat .jsx files as ES Modules
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Map .js imports correctly
  },
};