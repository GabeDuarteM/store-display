import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Button, { styles, propTypes } from './Button'

const createWrapper = (func, { children, ...optionalProps }) =>
  func(
    <Button onClick={() => {}} {...optionalProps}>
      {children || 'Button text'}
    </Button>,
  )

const createWrapperShallow = (optionalProps = {}) =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = (optionalProps = {}) =>
  createWrapper(mount, optionalProps)

describe('COMPONENT: <Button />', () => {
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

  it('should apply whatever classname that is passed as props', () => {
    const className = 'custom-classname'
    const wrapper = createWrapperShallow({ className })

    const hasSpecifiedClassname = wrapper.dive().hasClass(className)
    expect(hasSpecifiedClassname).toBe(true)
  })

  it('should call onClick when the user clicks the button', () => {
    const onClick = jest.fn()
    const wrapper = createWrapperShallow({ onClick })

    wrapper.dive().simulate('click')
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should pass the disabled state to the button', () => {
    const disabled = true
    const wrapper = createWrapperShallow({ disabled })

    const disabledProp = wrapper.dive().prop('disabled')
    expect(disabledProp).toBe(true)
  })

  it('should render whatever children that is passed', () => {
    const children = 'Some random button'
    const wrapper = createWrapperShallow({ children })

    const childrenText = wrapper.dive().text()
    expect(childrenText).toBe(children)
  })
})
