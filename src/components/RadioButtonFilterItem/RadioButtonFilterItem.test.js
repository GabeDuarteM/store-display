import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import RadioButtonFilterItem, {
  styles,
  propTypes,
  defaultProps,
} from './RadioButtonFilterItem'

const createWrapper = (func, optionalProps) =>
  func(
    <RadioButtonFilterItem onChange={jest.fn} text="Text" {...optionalProps} />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <RadioButtonFilterItem />', () => {
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

  it("should match component's defaultProps snapshot", () => {
    expect(defaultProps).toMatchSnapshot()
  })

  it('should place an active classname if the item is active', () => {
    const wrapper = createWrapperShallow({ active: true })

    expect(wrapper.dive().hasClass('active')).toBeTruthy()
  })

  it('should not place an active classname if the item is not active', () => {
    const wrapper = createWrapperShallow({ active: false })

    expect(wrapper.dive().hasClass('active')).toBeFalsy()
  })

  it('should check the radio input if the item is active', () => {
    const wrapper = createWrapperShallow({ active: true })

    expect(
      wrapper
        .dive()
        .find('input')
        .prop('checked'),
    ).toBeTruthy()
  })

  it('should not check the radio input if the item is not active', () => {
    const wrapper = createWrapperShallow({ active: false })

    expect(
      wrapper
        .dive()
        .find('input')
        .prop('checked'),
    ).toBeFalsy()
  })

  it("should call the input's onClick when the user clicks the input", () => {
    const onChange = jest.fn()
    const wrapper = createWrapperShallow({ onChange })
    wrapper
      .dive()
      .find('input')
      .simulate('change')

    expect(onChange).toHaveBeenCalledTimes(1)
  })

  it('should render wherever text passed to the text prop', () => {
    const text = 'About You'
    const wrapper = createWrapperShallow({ text })

    expect(wrapper.dive().text()).toBe(text)
  })
})
