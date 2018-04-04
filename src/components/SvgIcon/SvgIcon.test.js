import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import downArrow from '../../assets/down-arrow.svg'
import SvgIcon, { styles, propTypes, defaultProps } from './SvgIcon'

const createWrapper = (func, optionalProps) =>
  func(<SvgIcon src={downArrow} {...optionalProps} />)

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <SvgIcon />', () => {
  it('should render without crashing with default props', () => {
    createWrapperMount()
  })

  it('should render without crashing with custom props', () => {
    createWrapperMount({ width: 10, height: 25, color: '#e7e7e7' })
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

  it('should apply whatever className that is passed as prop', () => {
    const className = 'customClassname'
    const wrapper = createWrapperShallow({ className })
    const hasCustomClassnameClass = wrapper.hasClass(className)
    expect(hasCustomClassnameClass).toBeTruthy()
  })

  it('should set the dangerouslySetInnerHTML as whatever is passed as the src prop', () => {
    const src = '<div>test</div>'
    const wrapper = createWrapperShallow({ src })
    const hasCorrectSrc = wrapper.dive().prop('dangerouslySetInnerHTML')
    expect(hasCorrectSrc).toEqual({ __html: src })
  })
})
