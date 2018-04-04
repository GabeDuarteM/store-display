export const FILTER__CHANGE_GENDER = 'FILTER/CHANGE_GENDER'
export const FILTER__CHANGE_SORT = 'FILTER/CHANGE_SORT'
export const FILTER__LOAD_MORE_PRODUCTS = 'FILTER/LOAD_MORE_PRODUCTS'

export const filterChangeGender = gender => ({
  type: FILTER__CHANGE_GENDER,
  payload: gender,
})

export const filterChangeSort = sort => ({
  type: FILTER__CHANGE_SORT,
  payload: sort,
})

export const filterLoadMoreProducts = () => ({
  type: FILTER__LOAD_MORE_PRODUCTS,
})
