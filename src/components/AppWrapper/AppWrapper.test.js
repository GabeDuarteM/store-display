import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import AppWrapper, { styles, propTypes } from './AppWrapper'

const createWrapper = (
  func,
  children = (
    <React.Fragment>
      thing to be <span>wrapped</span>
    </React.Fragment>
  ),
) => func(<AppWrapper>{children}</AppWrapper>)

const createWrapperShallow = children => createWrapper(shallow, children)

const createWrapperMount = children => createWrapper(mount, children)

describe('COMPONENT: <AppWrapper />', () => {
  it('should render without crashing with default props', () => {
    createWrapperMount()
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()
    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })

  it("should match component's style snapshot", () => {
    expect(styles).toMatchSnapshot()
  })

  it("should match component's propTypes snapshot", () => {
    expect(propTypes).toMatchSnapshot()
  })

  it('should correctly render whatever is passed as children inside the wrapper', () => {
    const children = <div>é bolacha, não biscoito (brazilian joke)</div>
    const wrapper = createWrapperShallow(children)
    expect(wrapper.dive().containsAllMatchingElements([children])).toBeTruthy()
  })

  it('should render global styles under the key "@global body" when process.env.NODE_ENV is different than "styleguide"', () => {
    // eslint-disable-next-line global-require
    const { styles: stylesDev } = require('./AppWrapper')

    expect(process.env.NODE_ENV).not.toBe('styleguide')
    expect(stylesDev['@global body']).toBeDefined()
  })

  it('should render global styles under the key "@global *[data-preview]" when process.env.NODE_ENV is "styleguide"', () => {
    const nodeEnvBackup = process.env.NODE_ENV

    process.env.NODE_ENV = 'styleguide'
    jest.resetModules()

    // eslint-disable-next-line global-require
    const { styles: stylesStyleguide } = require('./AppWrapper')

    expect(process.env.NODE_ENV).toBe('styleguide')
    expect(stylesStyleguide['@global *[data-preview]']).toBeDefined()

    process.env.NODE_ENV = nodeEnvBackup
    jest.resetModules()
    expect(process.env.NODE_ENV).toBe(nodeEnvBackup)
  })
})
