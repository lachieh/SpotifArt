module.exports = {
  'env': {
    'browser': true,
    'jest': true,
    'es6': true,
    'node': true,
  },
  'extends': [
    'airbnb',
    'prettier',
    'react-app',
  ],
  'plugins': [
    'prettier',
  ],
  'rules': {
    'prettier/prettier': ['error', {
      'singleQuote': true,
      'trailingComma': 'es5'
    }],
    'react/jsx-one-expression-per-line': false,
  },
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true,
    }
  }
}
