module.exports = {
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module",
  },
  env: {
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  plugins: [
    "prettier",
    "react",
    "react-native"
  ],
  rules: {
    "prettier/prettier": ["error", {
      trailingComma: "es5",
      semi: false,
      "singleQuote": true,
    }],
    "no-var": "error",
    "prefer-const": ["error", {
        "destructuring": "any",
        "ignoreReadBeforeAssign": false
    }],
    "eqeqeq": "error",
  },
};
