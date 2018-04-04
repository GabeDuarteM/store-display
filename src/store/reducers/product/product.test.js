import product from './product'
import {
  PRODUCT__SET_LIST,
  PRODUCT__SET_WISHLIST_PROP,
  productSetList,
  productSetWishlistProp,
  filterProducts,
  injectIsWishlistedProp,
} from './productActions'

const returnInitialState = () => ({ products: [], isLastPage: null })
const returnMockedState = () => ({
  products: [
    {
      id: '5a5180507dceaccd20a314e0',
      imgUrl: '//images.arcteryx.com/F17/450x625/Cerium-LT-Jacket-Rooibos.png',
      gender: 'woman',
      rating: 9,
      price: 96.44,
      isNew: true,
      name: 'Aguirrewatson Ritakirkland',
      brand: 'Mazine',
    },
    {
      id: '5a518050fbb2da0a6d228cf9',
      imgUrl:
        '//cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_W_Wool_Runner_Kotare_GREY_ANGLE_900x900.png?v=1514576081',
      gender: 'man',
      rating: 8,
      price: 105.7,
      isNew: false,
      name: 'Arlineschneider Loriemartinez',
      brand: 'NIKE',
    },
    {
      id: '5a51804f840a30ab47a631a2',
      imgUrl: '//www.kicksusa.com/media/wysiwyg/brands/nike/nike-men.png',
      gender: 'woman',
      rating: 10,
      price: 27.59,
      isNew: true,
      name: 'Candacechase Blackturner',
      brand: 'NIKE',
    },
    {
      id: '5a518050bbbe951b1e561fed',
      imgUrl:
        'http://shop.autismspeaks.org/Shared/images/Product/AUT/AT17012.png',
      gender: 'woman',
      rating: 4,
      price: 235.1,
      isNew: false,
      name: 'Burkemejia Cochranbray',
      brand: 'Urban Classics',
    },
    {
      id: '5a51805085f01f4226367dfd',
      imgUrl:
        'http://cdn.shopify.com/s/files/1/1378/9837/products/lets-love-tshirt_grande.png?v=1509580185',
      gender: 'man',
      rating: 2,
      price: 257.36,
      isNew: true,
      name: 'Fitzgeraldwallace Agnesmarks',
      brand: 'Urban Classics',
    },
  ],
  isLastPage: null,
})

describe('REDUCER: product', () => {
  it('should return the default state when no state is passed', () => {
    const state = undefined
    const action = undefined
    const expected = returnInitialState()

    const actual = product(state, action)

    expect(actual).toEqual(expected)
  })

  it('should return the same state when an unknown action is passed', () => {
    const state = returnMockedState()
    const action = undefined
    const expected = returnMockedState()

    const actual = product(state, action)

    expect(actual).toEqual(expected)
  })

  describe(PRODUCT__SET_LIST, () => {
    it('should be able to add a list of products to the state', () => {
      const productList = [
        {
          id: '5a51805027ba64a1eea9d18e',
          imgUrl:
            'https://dfp2hfrf3mn0u.cloudfront.net/243/2430500001_146220_png_overview_6.png',
          gender: 'man',
          rating: 8,
          price: 71.72,
          isNew: false,
          name: 'Irwincarey Buckdudley',
          brand: 'Asics Tiger',
        },
        {
          id: '5a5180508b8c28487711c53f',
          imgUrl:
            '//images.footlocker.com/pi/27324010/zoom/nike-windrunner-jacket-mens',
          gender: 'man',
          rating: 6,
          price: 295.38,
          isNew: true,
          name: 'Clevelandlamb Jensenhawkins',
          brand: 'Urban Classics',
        },
      ]
      const state = returnMockedState()
      const action = productSetList({ products: productList, isLastPage: true })
      const expected = { products: [...productList], isLastPage: true }

      const actual = product(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe(PRODUCT__SET_WISHLIST_PROP, () => {
    it('should modify the product changing the isWishlisted prop to whatever is passed as argument', () => {
      const productId = '5a518050fbb2da0a6d228cf9'

      const state = returnMockedState()
      const action = productSetWishlistProp({
        id: productId,
      })
      const expected = {
        id: '5a518050fbb2da0a6d228cf9',
        imgUrl:
          '//cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_W_Wool_Runner_Kotare_GREY_ANGLE_900x900.png?v=1514576081',
        gender: 'man',
        rating: 8,
        price: 105.7,
        isNew: false,
        name: 'Arlineschneider Loriemartinez',
        brand: 'NIKE',
      }

      const actual = product(state, action).products.find(
        x => x.id === productId,
      )

      expect(actual).toEqual(expected)
    })
  })

  describe('filterProducts function', () => {
    it('should correctly sort the products component', () => {
      const products = [
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'man', rating: 9, price: 1 },
        { gender: 'man', rating: 10, price: 0 },
        { gender: 'woman', rating: 0, price: 0 },
        { gender: 'woman', rating: 5, price: 9 },
        { gender: 'woman', rating: 2, price: 5 },
        { gender: 'woman', rating: 9, price: 1 },
        { gender: 'woman', rating: 10, price: 0 },
      ]
      const sortedProductsPriceAsc = filterProducts(products, {
        gender: 'man',
        productListLength: 9,
        sort: 'price-asc',
      })
      const sortedProductsPriceDesc = filterProducts(products, {
        gender: 'man',
        productListLength: 9,
        sort: 'price-desc',
      })
      const sortedProductsRatingAsc = filterProducts(products, {
        gender: 'man',
        productListLength: 9,
        sort: 'rating-asc',
      })
      const sortedProductsRatingDesc = filterProducts(products, {
        gender: 'man',
        productListLength: 9,
        sort: 'rating-desc',
      })

      expect(sortedProductsPriceAsc.products).toEqual([
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 10, price: 0 },
        { gender: 'man', rating: 9, price: 1 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'man', rating: 5, price: 9 },
      ])

      expect(sortedProductsPriceDesc.products).toEqual([
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'man', rating: 9, price: 1 },
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 10, price: 0 },
      ])

      expect(sortedProductsRatingAsc.products).toEqual([
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 9, price: 1 },
        { gender: 'man', rating: 10, price: 0 },
      ])

      expect(sortedProductsRatingDesc.products).toEqual([
        { gender: 'man', rating: 10, price: 0 },
        { gender: 'man', rating: 9, price: 1 },
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'man', rating: 0, price: 0 },
      ])
    })

    it('should correctly filter the products using the gender', () => {
      const products = [
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'man', rating: 9, price: 1 },
        { gender: 'man', rating: 10, price: 0 },
        { gender: 'woman', rating: 0, price: 0 },
        { gender: 'woman', rating: 5, price: 9 },
        { gender: 'woman', rating: 2, price: 5 },
        { gender: 'woman', rating: 9, price: 1 },
        { gender: 'woman', rating: 10, price: 0 },
      ]
      const filteredProductsMan = filterProducts(products, {
        gender: 'man',
        productListLength: 9,
        sort: 'price-asc',
      })
      const filteredProductsWoman = filterProducts(products, {
        gender: 'woman',
        productListLength: 9,
        sort: 'price-asc',
      })

      expect(filteredProductsMan.products).toEqual([
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 10, price: 0 },
        { gender: 'man', rating: 9, price: 1 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'man', rating: 5, price: 9 },
      ])

      expect(filteredProductsWoman.products).toEqual([
        { gender: 'woman', rating: 0, price: 0 },
        { gender: 'woman', rating: 10, price: 0 },
        { gender: 'woman', rating: 9, price: 1 },
        { gender: 'woman', rating: 2, price: 5 },
        { gender: 'woman', rating: 5, price: 9 },
      ])
    })

    it('should correctly filter the products using the productListLength', () => {
      const products = [
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'man', rating: 9, price: 1 },
        { gender: 'man', rating: 10, price: 0 },
        { gender: 'woman', rating: 0, price: 0 },
        { gender: 'woman', rating: 5, price: 9 },
        { gender: 'woman', rating: 2, price: 5 },
        { gender: 'woman', rating: 9, price: 1 },
        { gender: 'woman', rating: 10, price: 0 },
      ]
      const filteredProducts = filterProducts(products, {
        gender: 'man',
        productListLength: 3,
        sort: 'price-asc',
      })

      expect(filteredProducts.products).toEqual([
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 10, price: 0 },
        { gender: 'man', rating: 9, price: 1 },
      ])
    })

    it('should throw an "Invalid sort type" error if the sort type is invalid', () => {
      const products = [
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'woman', rating: 9, price: 1 },
        { gender: 'woman', rating: 10, price: 0 },
      ]
      const filterProductsFunction = () =>
        filterProducts(products, {
          gender: 'man',
          productListLength: 3,
          sort: 'unknown',
        })

      expect(filterProductsFunction).toThrow('Invalid sort type: unknown')
    })

    it('should return a isLastPage that equals to true when there is no more products to load', () => {
      const products = [
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'woman', rating: 9, price: 1 },
      ]
      const { isLastPage } = filterProducts(products, {
        gender: 'man',
        productListLength: 5,
        sort: 'price-asc',
      })

      expect(isLastPage).toBe(true)
    })

    it('should return a isLastPage that equals to true when there is more products to load', () => {
      const products = [
        { gender: 'man', rating: 0, price: 0 },
        { gender: 'man', rating: 5, price: 9 },
        { gender: 'man', rating: 2, price: 5 },
        { gender: 'woman', rating: 9, price: 1 },
        { gender: 'woman', rating: 10, price: 0 },
      ]
      const { isLastPage } = filterProducts(products, {
        gender: 'man',
        productListLength: 2,
        sort: 'price-asc',
      })

      expect(isLastPage).toBe(false)
    })
  })

  describe('injectIsWishlistedProp function', () => {
    it('should inject the isWishlisted property correctly', () => {
      const productList = [
        {
          id: '5a51805027ba64a1eea9d18e',
          imgUrl:
            'https://dfp2hfrf3mn0u.cloudfront.net/243/2430500001_146220_png_overview_6.png',
          gender: 'man',
          rating: 8,
          price: 71.72,
          isNew: false,
          name: 'Irwincarey Buckdudley',
          brand: 'Asics Tiger',
        },
        {
          id: '5a5180508b8c28487711c53f',
          imgUrl:
            '//images.footlocker.com/pi/27324010/zoom/nike-windrunner-jacket-mens',
          gender: 'man',
          rating: 6,
          price: 295.38,
          isNew: true,
          name: 'Clevelandlamb Jensenhawkins',
          brand: 'Urban Classics',
        },
      ]
      const expected = [
        {
          id: '5a51805027ba64a1eea9d18e',
          isWishlisted: false,
          imgUrl:
            'https://dfp2hfrf3mn0u.cloudfront.net/243/2430500001_146220_png_overview_6.png',
          gender: 'man',
          rating: 8,
          price: 71.72,
          isNew: false,
          name: 'Irwincarey Buckdudley',
          brand: 'Asics Tiger',
        },
        {
          id: '5a5180508b8c28487711c53f',
          isWishlisted: true,
          imgUrl:
            '//images.footlocker.com/pi/27324010/zoom/nike-windrunner-jacket-mens',
          gender: 'man',
          rating: 6,
          price: 295.38,
          isNew: true,
          name: 'Clevelandlamb Jensenhawkins',
          brand: 'Urban Classics',
        },
      ]

      localStorage.setItem(
        'wishlistProducts',
        JSON.stringify(['5a5180508b8c28487711c53f']),
      )

      const actual = injectIsWishlistedProp(productList)

      expect(actual).toEqual(expected)
    })
  })
})
