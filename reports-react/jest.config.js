module.exports = {
  ...require('@snowpack/app-scripts-react/jest.config.js')(),
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)"
  ],
  testPathIgnorePatterns: [
    "reports-react/src/processing/utils/__tests__/zScore.test.ts"
  ]
};
