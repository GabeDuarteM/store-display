import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import SortDropdownFilterContainerConnected, {
  SortDropdownFilterContainer,
  propTypes,
} from './SortDropdownFilterContainer'
import { filterChangeSort } from '../../store/reducers/filter/filterActions'

const createWrapper = func =>
  func(
    <SortDropdownFilterContainer
      selectedItem={{ id: 'price-asc', text: 'Price: low to high' }}
      onChange={() => {}}
    />,
  )

const createWrapperShallow = () => createWrapper(shallow)

const createWrapperMount = () => createWrapper(mount)

describe('COMPONENT: <SortDropdownFilterContainer />', () => {
  it('should render without crashing', () => {
    createWrapperMount()
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()

    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("should match component's propTypes snapshot", () => {
    expect(propTypes).toMatchSnapshot()
  })

  it('should start with the state menuIsOpen = false', () => {
    const wrapper = createWrapperShallow()
    const { menuIsOpen } = wrapper.state()

    expect(menuIsOpen).toBeFalsy()
  })

  it('should change the menuIsOpen state when handleChangeMenuIsOpen is called', () => {
    const expected = true
    const wrapper = createWrapperShallow()
    wrapper.instance().handleChangeMenuIsOpen(expected)
    const actual = wrapper.state('menuIsOpen')

    expect(actual).toEqual(expected)
  })

  it('should have the correct set of items', () => {
    const expected = [
      { id: 'price-asc', text: 'Price: low to high' },
      { id: 'price-desc', text: 'Price: high to low' },
      { id: 'rating-asc', text: 'Rating: low to high' },
      { id: 'rating-desc', text: 'Rating: high to low' },
    ]
    const wrapper = createWrapperShallow()
    const received = wrapper.prop('items')

    expect(expected).toEqual(received)
  })

  it('should have the correct label', () => {
    const expected = 'Sort by'
    const wrapper = createWrapperShallow()
    const received = wrapper.prop('label')

    expect(expected).toEqual(received)
  })

  it('should have a connected component rendering the props correctly', () => {
    const filter = {
      gender: 'man',
      productListLength: 9,
      sort: 'price-desc',
    }
    const selectedItem = { id: 'price-desc', text: 'Price: high to low' }
    const store = {
      getState: () => ({
        filter,
      }),
      dispatch: jest.fn(),
      subscribe: () => {},
    }

    const component = shallow(
      <SortDropdownFilterContainerConnected store={store} />,
    ).find(SortDropdownFilterContainer)
    const selectedItemProp = component.prop('selectedItem')
    const onChangeProp = component.prop('onChange')
    onChangeProp(selectedItem)

    expect(selectedItemProp).toEqual(selectedItem)
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalledWith(
      filterChangeSort(selectedItem.id),
    )
  })

  it('should have a connected component that scrolls to the top when onChange is fired', () => {
    const filter = {
      gender: 'man',
      productListLength: 9,
      sort: 'price-desc',
    }
    const selectedItem = { id: 'price-desc', text: 'Price: high to low' }
    const store = {
      getState: () => ({
        filter,
      }),
      dispatch: jest.fn(),
      subscribe: () => {},
    }

    const component = shallow(
      <SortDropdownFilterContainerConnected store={store} />,
    ).find(SortDropdownFilterContainer)
    const onChangeProp = component.prop('onChange')
    window.scrollTo.mockClear()

    onChangeProp(selectedItem)

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
  })
})
