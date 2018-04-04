import { PRODUCT__SET_LIST, PRODUCT__SET_WISHLIST_PROP } from './productActions'

const product = (state = { products: [], isLastPage: null }, action = {}) => {
  switch (action.type) {
    case PRODUCT__SET_LIST:
      return {
        ...state,
        ...action.payload,
      }
    case PRODUCT__SET_WISHLIST_PROP:
      return {
        ...state,
        products: [
          ...state.products.map(
            elem =>
              elem.id !== action.payload.id
                ? elem
                : { ...elem, isWishlisted: action.payload.isWishlisted },
          ),
        ],
      }

    default:
      return state
  }
}

export default product
