module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-multiple-empty-lines': 'error',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    "react/state-in-constructor": "off",
    "react/prop-types": "off",
  },
  settings: {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};
