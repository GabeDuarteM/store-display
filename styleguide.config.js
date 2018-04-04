const { join } = require('path')
const { readFileSync } = require('fs')

const htmlTemplate = readFileSync('./src/index.html')

module.exports = {
  template: {
    body: {
      raw: htmlTemplate,
    },
  },
  styleguideComponents: {
    Wrapper: join(__dirname, 'src/containers/AppWrapperContainer'),
  },
  ignore: [
    '**/__tests__/**',
    '**/*.test.{js,jsx,ts,tsx}',
    '**/*.spec.{js,jsx,ts,tsx}',
    '**/*.d.ts',
    '**/index.js',
  ],
}
