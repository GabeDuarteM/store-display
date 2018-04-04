import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import RadioButtonFilter, { styles, propTypes } from './RadioButtonFilter'
import RadioButtonFilterItem from '../RadioButtonFilterItem'

const createWrapper = (func, optionalProps) =>
  func(
    <RadioButtonFilter
      onChange={jest.fn}
      options={[{ id: 'woman', text: 'Woman' }, { id: 'man', text: 'Man' }]}
      activeOption="woman"
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <RadioButtonFilter />', () => {
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

  it('should render one RadioButtonFilterItem component for each option passed', () => {
    const options = [
      { id: 'woman', text: 'Woman' },
      { id: 'man', text: 'Man' },
      { id: 'alien', text: 'Alien' },
    ]
    const wrapper = createWrapperShallow({ options })

    expect(wrapper.dive().find(RadioButtonFilterItem).length).toBe(3)
  })

  it('should render RadioButtonFilterItem with the props passed on the options', () => {
    expect.assertions(9)
    const options = [
      { id: 'woman', text: 'Woman' },
      { id: 'man', text: 'Man' },
      { id: 'alien', text: 'Alien' },
    ]
    const activeOption = 'man'
    const onChange = jest.fn()
    const wrapper = createWrapperShallow({ options, activeOption, onChange })
    const elements = wrapper.dive().find(RadioButtonFilterItem)

    for (let i = 0; i < options.length; i += 1) {
      expect(elements.at(i).prop('text')).toBe(options[i].text)
      expect(elements.at(i).prop('active')).toBe(options[i].id === activeOption)
      const radioButtonFilterItemOnChange = elements.at(i).prop('onChange')
      radioButtonFilterItemOnChange()
      expect(onChange).toHaveBeenLastCalledWith(options[i].id)
    }
  })
})
