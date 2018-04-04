import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import DropdownFilterInput, { styles, propTypes } from './DropdownFilterInput'
import SvgIcon from '../SvgIcon'

const createWrapper = (func, optionalProps) =>
  func(
    <DropdownFilterInput
      getButtonProps={jest.fn(customProps => customProps)}
      handleChangeMenuIsOpen={jest.fn()}
      isOpen
      selectedItem={{ id: '', text: 'selectedItem' }}
      width={123}
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <DropdownFilterInput />', () => {
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

  it('should spread the return of the method getButtonProps on the root component', () => {
    const wrapper = createWrapperShallow()
    const { onClick, className } = wrapper.dive().props()
    expect(onClick).toBeDefined()
    expect(className).toBeDefined()
  })

  it('should call handleChangeMenuIsOpen passing the opposite of the isOpen state when the root component is clicked', () => {
    const handleChangeMenuIsOpen = jest.fn()
    const isOpen = false
    const wrapper = createWrapperShallow({ handleChangeMenuIsOpen, isOpen })
    wrapper.dive().simulate('click')
    expect(handleChangeMenuIsOpen).toHaveBeenCalledTimes(1)
    expect(handleChangeMenuIsOpen).toHaveBeenLastCalledWith(!isOpen)
  })

  it('should render the selected item inside the root component', () => {
    const selectedItem = { id: 'price', text: 'Price' }
    const wrapper = createWrapperShallow({ selectedItem })

    expect(wrapper.render().text()).toBe(selectedItem.text)
  })

  it('should render a SvgIcon inside the root component', () => {
    const wrapper = createWrapperShallow()

    expect(
      wrapper
        .dive()
        .find(SvgIcon)
        .exists(),
    ).toBeTruthy()
  })

  it('should render a SvgIcon with an isOpen className when the prop isOpen is true', () => {
    const wrapper = createWrapperShallow({ isOpen: true })

    expect(
      wrapper
        .dive()
        .find(SvgIcon)
        .hasClass('isOpen'),
    ).toBeTruthy()
  })

  it('should render a SvgIcon without an isOpen className when the prop isOpen is false', () => {
    const wrapper = createWrapperShallow({ isOpen: false })

    expect(
      wrapper
        .dive()
        .find(SvgIcon)
        .hasClass('isOpen'),
    ).toBeFalsy()
  })
})
