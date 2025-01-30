// jest.config.js (ES Module)
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest', // Use Babel to transform .js files
  },
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Map .js imports correctly
  },
};