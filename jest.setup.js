/* eslint-disable import/no-extraneous-dependencies */
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { jss } from 'react-jss'
/* eslint-enable import/no-extraneous-dependencies */

Enzyme.configure({ adapter: new Adapter() })

const createGenerateClassName = () => (rule, sheet) =>
  sheet.options.classNamePrefix + rule.key

jss.setup({ createGenerateClassName })

// eslint-disable-next-line import/prefer-default-export
export const transformConsoleMessagesToExceptions = () => {
  // eslint-disable-next-line no-console
  console.warn = jest.fn(warn => {
    throw new Error(warn)
  })
  // eslint-disable-next-line no-console
  console.error = jest.fn(error => {
    // don't throw if the error is the complementary error from react 16
    if (
      error.message &&
      error.message.startsWith('The above error occurred in the')
    ) {
      return
    }
    throw new Error(error)
  })
}

transformConsoleMessagesToExceptions()
