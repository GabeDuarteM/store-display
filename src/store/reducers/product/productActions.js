import productListData from '../../../../data/products'

export const PRODUCT__SET_LIST = 'PRODUCT/SET_LIST'
export const PRODUCT__REFRESH_LIST = 'PRODUCT/REFRESH_LIST'
export const PRODUCT__SET_WISHLIST_PROP = 'PRODUCT/SET_WISHLIST_PROP'

const sortAsc = (itemA, itemB) => itemA - itemB
const sortDesc = (itemA, itemB) => itemB - itemA

const sortPrice = (sortType, itemA, itemB) => {
  const sortFunc = sortType === 'asc' ? sortAsc : sortDesc
  return sortFunc(itemA.price, itemB.price)
}

const sortRating = (sortType, itemA, itemB) => {
  const sortFunc = sortType === 'asc' ? sortAsc : sortDesc
  return sortFunc(itemA.rating, itemB.rating)
}

const sortProducts = sort => {
  const [prop, sortType] = sort.split('-')
  let sortFunc
  switch (prop) {
    case 'price':
      sortFunc = sortPrice
      break
    case 'rating':
      sortFunc = sortRating
      break
    default:
      throw new Error(`Invalid sort type: ${sort}`)
  }
  return sortFunc.bind(null, sortType)
}

export const filterProducts = (
  productList,
  { productListLength, gender, sort },
) => {
  const totalProductsFilteredByGender = productList.filter(
    product => product.gender === gender,
  )
  const sortedProductsFilteredByGender = [
    ...totalProductsFilteredByGender
      .sort(sortProducts(sort))
      .slice(0, productListLength),
  ]
  return {
    products: [...sortedProductsFilteredByGender],
    isLastPage:
      sortedProductsFilteredByGender.length ===
      totalProductsFilteredByGender.length,
  }
}

export const injectIsWishlistedProp = productList => {
  const wishlistProducts =
    JSON.parse(localStorage.getItem('wishlistProducts')) || []
  return productList.map(
    product =>
      wishlistProducts.includes(product.id)
        ? { ...product, isWishlisted: true }
        : { ...product, isWishlisted: false },
  )
}

export const productSetList = ({ products, isLastPage }) => ({
  type: PRODUCT__SET_LIST,
  payload: { products, isLastPage },
})

export const productSetWishlistProp = ({ id, isWishlisted }) => ({
  type: PRODUCT__SET_WISHLIST_PROP,
  payload: { id, isWishlisted },
})

export const productRefreshList = () => (dispatch, getState) => {
  const { filter } = getState()
  const { products: sortedProducts, isLastPage } = filterProducts(
    productListData,
    filter,
  )
  const productsWithWishlistProp = injectIsWishlistedProp(sortedProducts)

  dispatch(productSetList({ products: productsWithWishlistProp, isLastPage }))
}
