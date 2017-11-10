module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "eslint:recommended"
  ],
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "ecmaFeatures": {
      "modules": true
    }
  },
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": [
      2,
      {
        "singleQuote": true,
        "semi": true
      },
    ],
    "comma-dangle": 0
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  }
};
