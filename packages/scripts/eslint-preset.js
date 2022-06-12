module.exports = {
  extends: ["react-app"],
  "ignorePatterns": ["**/__fixtures/*.ts"],
  settings: {
    react: {
      version: "detect",
    },
  },
  "rules": {
    "@typescript-eslint/no-redeclare": "off",
    "no-redeclare": "off"
  }
};
