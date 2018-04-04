import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import DropdownFilterRender, {
  styles,
  propTypes,
  defaultProps,
} from './DropdownFilterRender'
import DropdownFilterInput from '../DropdownFilterInput'
import DropdownFilterItemsList from '../DropdownFilterItemsList'

const createWrapper = (func, optionalProps) =>
  func(
    <DropdownFilterRender
      getLabelProps={customProps => customProps}
      getButtonProps={customProps => customProps}
      getItemProps={customProps => customProps}
      isOpen
      handleChangeMenuIsOpen={() => {}}
      selectedItem={{ id: 'item-1', text: 'item 1' }}
      width={200}
      items={[
        { id: 'item-1', text: 'item 1' },
        { id: 'item-2', text: 'item 2' },
        { id: 'item-3', text: 'item 3' },
      ]}
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <DropdownFilterRender />', () => {
  it('should render without crashing with default props', () => {
    createWrapperMount()
  })

  it('should render without crashing with custom props', () => {
    createWrapperMount({ label: 'Something' })
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

  it("should match component's defaultProps snapshot", () => {
    expect(defaultProps).toMatchSnapshot()
  })

  it('should display a label with the correct text if the prop is provided', () => {
    const wrapper = createWrapperShallow({ label: 'Something' })

    const label = wrapper.dive().find('label')
    const labelExists = label.exists()
    const labelText = label.text()

    expect(labelExists).toBeTruthy()
    expect(labelText).toBe('Something')
  })

  it('should not display a label if the prop is not provided', () => {
    const wrapper = createWrapperShallow()

    const label = wrapper.dive().find('label')
    const labelExists = label.exists()

    expect(labelExists).toBeFalsy()
  })

  it('should have a DropdownFilterInput component', () => {
    const wrapper = createWrapperShallow()

    const dropdownFilterInput = wrapper.dive().find(DropdownFilterInput)
    const dropdownFilterInputExists = dropdownFilterInput.exists()

    expect(dropdownFilterInputExists).toBeTruthy()
  })

  it('should have a DropdownFilterItemsList component if the isOpen prop is true', () => {
    const wrapper = createWrapperShallow({ isOpen: true })

    const dropdownFilterItemsList = wrapper.dive().find(DropdownFilterItemsList)
    const dropdownFilterItemsListExists = dropdownFilterItemsList.exists()

    expect(dropdownFilterItemsListExists).toBeTruthy()
  })

  it('should not have a DropdownFilterItemsList component if the isOpen prop is false', () => {
    const wrapper = createWrapperShallow({ isOpen: false })

    const dropdownFilterItemsList = wrapper.dive().find(DropdownFilterItemsList)
    const dropdownFilterItemsListExists = dropdownFilterItemsList.exists()

    expect(dropdownFilterItemsListExists).toBeFalsy()
  })
})
