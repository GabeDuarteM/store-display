import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import ProductCardListContainerConnected, {
  ProductCardListContainer,
} from './ProductCardListContainer'
import ProductCardList from '../../components/ProductCardList'
import { filterLoadMoreProducts as filterLoadMoreProductsAction } from '../../store/reducers/filter/filterActions'
import { productSetWishlistProp } from '../../store/reducers/product/productActions'

const createWrapper = (func, optionalProps) =>
  func(
    <ProductCardListContainer
      filter={{ gender: 'man', productListLength: 18, sort: 'price-desc' }}
      products={[
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
      ]}
      handleClickLoadMore={() => {}}
      productRefreshList={() => {}}
      productSetWishlistProp={() => {}}
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <ProductCardListContainer />', () => {
  it('should render without crashing', () => {
    createWrapperMount()
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()
    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })

  it('should have a ProductCardList component', () => {
    const wrapper = createWrapperShallow()
    const hasProductCardList = wrapper.find(ProductCardList).exists()

    expect(hasProductCardList).toBe(true)
  })

  it('should render ProductCardList with the correct props', () => {
    const handleClickLoadMore = jest.fn()
    const toggleIsWishlisted = jest.fn()

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
    const className = 'custom-classname'
    const isLastPage = true

    const wrapper = createWrapperShallow({
      handleClickLoadMore,
      toggleIsWishlisted,
      products,
      className,
      isLastPage,
    })
    const handleClickLoadMoreProp = wrapper.dive().prop('handleClickLoadMore')
    const productsProp = wrapper.dive().prop('products')
    const classNameProp = wrapper.dive().prop('className')
    const isLastPageProp = wrapper.dive().prop('isLastPage')

    expect(handleClickLoadMoreProp).toEqual(handleClickLoadMore)
    expect(productsProp).toEqual(products)
    expect(classNameProp).toEqual(className)
    expect(isLastPageProp).toEqual(isLastPage)
  })

  it('should have a connected component rendering the props correctly', () => {
    const filter = {
      gender: 'man',
      productListLength: 9,
      sort: 'price-asc',
    }
    const store = {
      getState: () => ({
        filter,
        product: {
          products: [],
          isLastPage: true,
        },
      }),
      dispatch: jest.fn(),
      subscribe: () => {},
    }

    const component = shallow(
      <ProductCardListContainerConnected store={store} />,
    ).find(ProductCardListContainer)
    const productsProp = component.prop('products')
    const handleClickLoadMoreProp = component.prop('handleClickLoadMore')
    const productRefreshListProp = component.prop('productRefreshList')
    const productSetWishlistPropProp = component.prop('productSetWishlistProp')

    expect(productsProp).toBeDefined()
    expect(handleClickLoadMoreProp).toBeDefined()
    expect(productRefreshListProp).toBeDefined()
    expect(productSetWishlistPropProp).toBeDefined()

    handleClickLoadMoreProp()
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalledWith(filterLoadMoreProductsAction())

    store.dispatch.mockClear()
    productRefreshListProp()
    expect(store.dispatch).toHaveBeenCalled()

    store.dispatch.mockClear()
    const wishlistInfo = { id: 'some id', isWishlisted: true }
    productSetWishlistPropProp(wishlistInfo)
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalledWith(
      productSetWishlistProp(wishlistInfo),
    )
  })

  it('should toggle the isWishlisted prop of the product when toggleIsWishlisted is called passing the product id', () => {
    const productSetWishlistPropMock = jest.fn()
    const productId = '5a518050e421e659c6e24c46'
    const wrapper = createWrapperShallow({
      productSetWishlistProp: productSetWishlistPropMock,
    })
    const { toggleIsWishlisted } = wrapper.instance()
    localStorage.clear()

    toggleIsWishlisted(productId)

    let expected = [productId]
    let actual = JSON.parse(localStorage.getItem('wishlistProducts'))

    expect(actual).toEqual(expected)
    expect(productSetWishlistPropMock).toHaveBeenCalledTimes(1)
    expect(productSetWishlistPropMock).toHaveBeenLastCalledWith({
      id: productId,
      isWishlisted: true,
    })

    toggleIsWishlisted(productId)

    expected = []
    actual = JSON.parse(localStorage.getItem('wishlistProducts'))

    expect(actual).toEqual(expected)
    expect(productSetWishlistPropMock).toHaveBeenCalledTimes(2)
    expect(productSetWishlistPropMock).toHaveBeenLastCalledWith({
      id: productId,
      isWishlisted: false,
    })
  })
})
