module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    jest: true,
    browser: true,
  },
  plugins: ['prettier'],
  parser: 'babel-eslint',
  rules: {
    'linebreak-style': 'off',
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': 'off',
    'react/forbid-prop-types': ['error', { forbid: ['any'] }],
    'react/jsx-key': 'error',
    'jsx-a11y/label-has-for': 'off',
  },
}
