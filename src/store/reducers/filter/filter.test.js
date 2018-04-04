import filter from './filter'
import {
  FILTER__CHANGE_GENDER,
  FILTER__CHANGE_SORT,
  FILTER__LOAD_MORE_PRODUCTS,
  filterChangeGender,
  filterChangeSort,
  filterLoadMoreProducts,
} from './filterActions'

const returnInitialState = () => ({
  gender: 'woman',
  sort: 'price-asc',
  productListLength: 9,
})

const returnMockedState = () => ({
  gender: 'man',
  sort: 'rating-desc',
  productListLength: 27,
})

describe('REDUCER: Filter', () => {
  it('should return the default state when no state is passed', () => {
    const state = undefined
    const action = undefined
    const expected = returnInitialState()

    const actual = filter(state, action)

    expect(actual).toEqual(expected)
  })

  it('should return the same state when an unknown action is passed', () => {
    const state = returnMockedState()
    const action = undefined
    const expected = returnMockedState()

    const actual = filter(state, action)

    expect(actual).toEqual(expected)
  })

  describe(FILTER__CHANGE_GENDER, () => {
    it('should change the gender and reset the productListLenght to the initial value', () => {
      const state = returnMockedState()

      const gender = 'woman'
      const action = filterChangeGender(gender)
      const expected = { ...returnMockedState(), gender, productListLength: 9 }

      const actual = filter(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe(FILTER__CHANGE_SORT, () => {
    it('should change the sort to whatever is passed as the payload', () => {
      const state = returnMockedState()

      const sort = 'rating-asc'
      const action = filterChangeSort(sort)
      const expected = { ...returnMockedState(), sort }

      const actual = filter(state, action)

      expect(actual).toEqual(expected)
    })
  })

  describe(FILTER__LOAD_MORE_PRODUCTS, () => {
    it('should add 9 to the productListLength', () => {
      const state = returnMockedState()

      const action = filterLoadMoreProducts()
      const expected = { ...returnMockedState(), productListLength: 36 }

      const actual = filter(state, action)

      expect(actual).toEqual(expected)
    })
  })
})
