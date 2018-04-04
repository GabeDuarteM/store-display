import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import ProductCard, { styles, propTypes, defaultProps } from './ProductCard'
import SvgIcon from '../SvgIcon/SvgIcon'

const createWrapper = (func, optionalProps) =>
  func(
    <ProductCard
      imgUrl=""
      id="5a518050fbb2da0a6d228cf9"
      brand="Nike"
      name="Legend 2.0 Long Sleeve"
      price={24.99}
      toggleIsWishlisted={() => {}}
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <ProductCard />', () => {
  it('should render without crashing', () => {
    createWrapperMount()
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()
    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })

  it("should match component's snapshot with optional props", () => {
    const wrapper = createWrapperShallow({ isNew: true, isWishlisted: true })
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

  it('should have an SvgIcon', () => {
    const wrapper = createWrapperShallow()

    const svgIconExists = wrapper
      .dive()
      .find(SvgIcon)
      .exists()
    expect(svgIconExists).toBe(true)
  })

  it('should have an SvgIcon', () => {
    const wrapper = createWrapperShallow()

    const svgIconExists = wrapper
      .dive()
      .find(SvgIcon)
      .exists()
    expect(svgIconExists).toBe(true)
  })

  it('should have an SvgIcon that calls toggleIsWishlisted when clicked', () => {
    const toggleIsWishlisted = jest.fn()
    const wrapper = createWrapperShallow({ toggleIsWishlisted })

    wrapper
      .dive()
      .find(SvgIcon)
      .simulate('click')
    expect(toggleIsWishlisted).toHaveBeenCalledTimes(1)
  })

  it('should have a red SvgIcon when isWishlisted is true', () => {
    const wrapper = createWrapperShallow({ isWishlisted: true })

    const color = wrapper
      .dive()
      .find(SvgIcon)
      .prop('color')
    expect(color).toBe('#ff5454')
  })

  it('should have a red SvgIcon when isWishlisted is true', () => {
    const wrapper = createWrapperShallow({ isWishlisted: false })

    const color = wrapper
      .dive()
      .find(SvgIcon)
      .prop('color')
    expect(color).toBe('#808080')
  })

  it('should have a wishlisted class when isWishlisted is true', () => {
    const wrapper = createWrapperShallow({ isWishlisted: true })

    const color = wrapper
      .dive()
      .find(SvgIcon)
      .hasClass('wishlisted')
    expect(color).toBe(true)
  })

  it('should not have a wishlisted class when isWishlisted is false', () => {
    const wrapper = createWrapperShallow({ isWishlisted: false })

    const color = wrapper
      .dive()
      .find(SvgIcon)
      .hasClass('wishlisted')
    expect(color).toBe(false)
  })

  it('should have a div with "New" as text when isNew is true', () => {
    const wrapper = createWrapperShallow({ isNew: true })

    const isNewDiv = wrapper
      .dive()
      .childAt(0)
      .childAt(0)
      .childAt(1)
    expect(isNewDiv.exists()).toBe(true)
    expect(isNewDiv.text()).toBe('New')
  })

  it('should not have a div with "New" as text when isNew is false', () => {
    const wrapper = createWrapperShallow({ isNew: false })

    expect(
      wrapper
        .dive()
        .childAt(0)
        .childAt(0)
        .children().length,
    ).toBe(1)
  })

  it('should correctly render the brand name', () => {
    const brand = 'brand name'
    const wrapper = createWrapperShallow({ brand })

    expect(
      wrapper
        .dive()
        .childAt(1)
        .childAt(0)
        .childAt(0)
        .text(),
    ).toBe(brand)
  })

  it('should correctly render the product price and currency', () => {
    const price = 15.99
    const currency = 'R$'
    const wrapper = createWrapperShallow({ price, currency })

    expect(
      wrapper
        .dive()
        .childAt(1)
        .childAt(1)
        .text(),
    ).toBe(currency + price)
  })
})
