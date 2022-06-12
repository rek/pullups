/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.ts": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js"],
  modulePathIgnorePatterns: [
    "<rootDir>/src/__fixtures",
    "<rootDir>/node_modules",
    "<rootDir>/dist",
  ],
  preset: "ts-jest",
};