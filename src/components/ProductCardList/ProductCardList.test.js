import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import ProductCardList, {
  styles,
  propTypes,
  defaultProps,
} from './ProductCardList'
import ProductCard from '../ProductCard'
import Button from '../Button'

const createWrapper = (func, optionalProps) =>
  func(
    <ProductCardList
      products={[
        {
          id: '5a51804f840a30ab47a631a2',
          imgUrl: '',
          gender: 'woman',
          rating: 10,
          price: 27.59,
          isNew: true,
          name: 'Candacechase Blackturner',
          brand: 'NIKE',
        },
      ]}
      handleClickLoadMore={() => {}}
      toggleIsWishlisted={() => {}}
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <ProductCardList />', () => {
  it('should render without crashing with default props', () => {
    createWrapperMount()
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()
    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })

  it("should match component's snapshot with custom props", () => {
    const wrapper = createWrapperShallow({ isLastPage: false })
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

  it('should render a ProductCard for each product passed', () => {
    const products = [
      {
        id: '5a518050e421e659c6e24c46',
        imgUrl: 'https://tru-spec-cdn.azureedge.net/media/1175/1060f.png',
        gender: 'man',
        rating: 10,
        price: 282.1,
        isNew: true,
        name: 'Perkinsjames Clinegalloway',
        brand: 'VERO MODA',
      },
      {
        id: '5a51805044d1030570bcab76',
        imgUrl: 'https://tru-spec-cdn.azureedge.net/media/1025/1436f.png',
        gender: 'woman',
        rating: 4,
        price: 296.55,
        isNew: false,
        name: 'Henriettagillespie Dellavargas',
        brand: 'NIKE',
      },
    ]
    const wrapper = createWrapperShallow({ products })
    const productCardLength = wrapper.dive().find(ProductCard).length
    expect(productCardLength).toBe(2)
  })

  it('should have a Load more Button when isLastPage is false', () => {
    const wrapper = createWrapperShallow({ isLastPage: false })
    const button = wrapper.dive().find(Button)
    expect(button.exists()).toBe(true)
    expect(
      button
        .dive()
        .dive()
        .text(),
    ).toBe('Load more')
  })

  it('should not have a Load more Button when isLastPage is true', () => {
    const wrapper = createWrapperShallow({ isLastPage: true })
    const button = wrapper.dive().find(Button)
    expect(button.exists()).toBe(false)
  })

  it('should call handleClickLoadMore when the button is clicked', () => {
    const handleClickLoadMore = jest.fn()
    const wrapper = createWrapperShallow({
      isLastPage: false,
      handleClickLoadMore,
    })
    wrapper
      .dive()
      .find(Button)
      .simulate('click')
    expect(handleClickLoadMore).toHaveBeenCalledTimes(1)
  })
})
