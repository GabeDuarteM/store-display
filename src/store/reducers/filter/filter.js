import {
  FILTER__CHANGE_GENDER,
  FILTER__CHANGE_SORT,
  FILTER__LOAD_MORE_PRODUCTS,
} from './filterActions'

const returnInitialState = () => ({
  gender: 'woman',
  sort: 'price-asc',
  productListLength: 9,
})

const filter = (state = returnInitialState(), action = {}) => {
  switch (action.type) {
    case FILTER__CHANGE_GENDER:
      return {
        ...state,
        gender: action.payload,
        productListLength: 9,
      }
    case FILTER__CHANGE_SORT:
      return {
        ...state,
        sort: action.payload,
      }
    case FILTER__LOAD_MORE_PRODUCTS:
      return {
        ...state,
        productListLength: state.productListLength + 9,
      }
    default:
      return state
  }
}

export default filter
