import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import DropdownFilterItemsList, {
  styles,
  propTypes,
} from './DropdownFilterItemsList'
import SvgIcon from '../SvgIcon'

const createWrapper = (func, optionalProps) =>
  func(
    <DropdownFilterItemsList
      items={[
        { id: 'price-asc', text: 'Price: low to high' },
        { id: 'price-desc', text: 'Price: high to low' },
        { id: 'rating-asc', text: 'Rating: low to high' },
        { id: 'rating-desc', text: 'Rating: high to low' },
      ]}
      getItemProps={customProps => customProps}
      selectedItem={{ id: 'price-desc', text: 'Price: high to low' }}
      width={200}
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <DropdownFilterItemsList />', () => {
  it('should render without crashing with default props', () => {
    createWrapperMount()
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()
    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })

  it("should match component's style snapshot", () => {
    expect(styles).toMatchSnapshot()
  })

  it("should match component's propTypes snapshot", () => {
    expect(propTypes).toMatchSnapshot()
  })

  it('should spread the return of the method getItemProps on the root component', () => {
    const wrapper = createWrapperShallow()
    const { className } = wrapper.dive().props()
    expect(className).toBeDefined()
  })

  it('should render one item for each array item passed in the props', () => {
    const items = [
      { id: 'item-1', text: 'item 1' },
      { id: 'item-2', text: 'item 2' },
      { id: 'item-3', text: 'item 3' },
    ]
    const wrapper = createWrapperShallow({ items })
    const childrenLength = wrapper.dive().children().length
    expect(childrenLength).toBe(3)
  })

  it('should render each item displaying its text', () => {
    const items = [{ id: 'item-1', text: 'item 1' }]
    const wrapper = createWrapperShallow({ items })
    const text = wrapper
      .dive()
      .childAt(0)
      .text()
    expect(text).toBe(items[0].text)
  })

  it('should render an SvgIcon when the item is the selected item', () => {
    const selectedItem = { id: 'item-3', text: 'item 3' }
    const items = [
      { id: 'item-1', text: 'item 1' },
      { id: 'item-2', text: 'item 2' },
      selectedItem,
      { id: 'item-4', text: 'item 4' },
    ]
    const wrapper = createWrapperShallow({ items, selectedItem })
    const childrenLength = wrapper
      .dive()
      .childAt(2)
      .find(SvgIcon)
      .exists()
    expect(childrenLength).toBeTruthy()
  })
})
