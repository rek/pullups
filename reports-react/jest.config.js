module.exports = {
  ...require('@snowpack/app-scripts-react/jest.config.js')(),
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)"
  ]
};
