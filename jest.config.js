module.exports = {
  moduleFileExtensions: ['js', 'vue', 'json'],
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    ".*\\.(vue)$": "vue-jest"
  },
  testMatch: [
    "**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};