import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import DropdownFilter, { propTypes, defaultProps } from './DropdownFilter'
import DropdownFilterRender from '../DropdownFilterRender'

const createWrapper = (func, optionalProps) =>
  func(
    <DropdownFilter
      items={[
        { id: 'item-1', text: 'item 1' },
        { id: 'item-2', text: 'item 2' },
        { id: 'item-3', text: 'item 3' },
      ]}
      selectedItem={{ id: 'item-2', text: 'item 2' }}
      itemToString={item => item.text}
      onChange={jest.fn}
      handleChangeMenuIsOpen={jest.fn}
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <DropdownFilter />', () => {
  it('should render without crashing with default props', () => {
    createWrapperMount()
  })

  it('should render without crashing with custom props', () => {
    createWrapperMount({ label: 'Something' })
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it("should match component's propTypes snapshot", () => {
    expect(propTypes).toMatchSnapshot()
  })

  it("should match component's defaultProps snapshot", () => {
    expect(defaultProps).toMatchSnapshot()
  })

  it('should call handleChangeMenuIsOpen passing false as an argument when onSelect is called', () => {
    const handleChangeMenuIsOpen = jest.fn()
    const wrapper = createWrapperShallow({ handleChangeMenuIsOpen })

    const onSelect = wrapper.prop('onSelect')
    onSelect()

    expect(handleChangeMenuIsOpen).toHaveBeenCalledTimes(1)
    expect(handleChangeMenuIsOpen).toHaveBeenLastCalledWith(false)
  })

  it('should call handleChangeMenuIsOpen passing false as an argument when onOuterClick is called', () => {
    const handleChangeMenuIsOpen = jest.fn()
    const wrapper = createWrapperShallow({ handleChangeMenuIsOpen })

    const onOuterClick = wrapper.prop('onOuterClick')
    onOuterClick()

    expect(handleChangeMenuIsOpen).toHaveBeenCalledTimes(1)
    expect(handleChangeMenuIsOpen).toHaveBeenLastCalledWith(false)
  })

  it('should have the render method returning a DropdownFilterRender component', () => {
    const wrapper = createWrapperShallow()
    const render = wrapper.prop('render')
    const wrapperRender = shallow(
      render({
        getButtonProps: customProps => customProps,
        getLabelProps: customProps => customProps,
        getItemProps: customProps => customProps,
        isOpen: true,
        selectedItem: 'item 1',
      }),
    )
    const dropdownFilterRenderExists = wrapperRender
      .find(DropdownFilterRender)
      .exists()

    expect(dropdownFilterRenderExists).toBeTruthy()
  })

  it("should return the item's text when itemToString is called passing an item", () => {
    const item = { id: 'item-2', text: 'Item 2' }
    const wrapper = createWrapperShallow()
    const itemToString = wrapper.prop('itemToString')

    expect(itemToString(item)).toBe(item.text)
  })
})
