import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import GenderRadioButtonFilterContainerConnected, {
  GenderRadioButtonFilterContainer,
} from './GenderRadioButtonFilterContainer'
import RadioButtonFilter from '../../components/RadioButtonFilter/RadioButtonFilter'
import { filterChangeGender as filterChangeGenderAction } from '../../store/reducers/filter/filterActions'

const createWrapper = (func, optionalProps) =>
  func(
    <GenderRadioButtonFilterContainer
      activeOption="woman"
      filterChangeGender={() => {}}
      {...optionalProps}
    />,
  )

const createWrapperShallow = optionalProps =>
  createWrapper(shallow, optionalProps)

const createWrapperMount = optionalProps => createWrapper(mount, optionalProps)

describe('COMPONENT: <GenderRadioButtonFilterContainer />', () => {
  it('should render without crashing', () => {
    createWrapperMount()
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()
    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })

  it('should have a RadioButtonFilter component', () => {
    const wrapper = createWrapperShallow()
    const hasRadioButtonFilter = wrapper.find(RadioButtonFilter).exists()

    expect(hasRadioButtonFilter).toBe(true)
  })

  it('should render RadioButtonFilter with the correct props', () => {
    const genders = [{ id: 'woman', text: 'Woman' }, { id: 'man', text: 'Man' }]
    const activeOption = 'man'
    const filterChangeGender = jest.fn()

    const wrapper = createWrapperShallow({ activeOption, filterChangeGender })
    const gendersProp = wrapper.dive().prop('options')
    const activeOptionProp = wrapper.dive().prop('activeOption')
    const filterChangeGenderProp = wrapper.dive().prop('onChange')

    expect(gendersProp).toEqual(genders)
    expect(activeOptionProp).toBe(activeOption)
    expect(filterChangeGenderProp).toBe(filterChangeGender)
  })

  it('should have a connected component rendering the props correctly', () => {
    const activeOption = 'man'
    const store = {
      getState: () => ({
        filter: { gender: activeOption },
      }),
      dispatch: jest.fn(),
      subscribe: () => {},
    }

    const component = shallow(
      <GenderRadioButtonFilterContainerConnected store={store} />,
    ).find(GenderRadioButtonFilterContainer)
    const activeOptionProp = component.prop('activeOption')
    const filterChangeGenderProp = component.prop('filterChangeGender')
    filterChangeGenderProp(activeOption)

    expect(activeOptionProp).toBe(activeOption)
    expect(store.dispatch).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalledWith(
      filterChangeGenderAction(activeOption),
    )
  })

  it('should have a connected component that scrolls to the top when filterChangeGender is fired', () => {
    const activeOption = 'man'
    const store = {
      getState: () => ({
        filter: { gender: activeOption },
      }),
      dispatch: jest.fn(),
      subscribe: () => {},
    }

    const component = shallow(
      <GenderRadioButtonFilterContainerConnected store={store} />,
    ).find(GenderRadioButtonFilterContainer)

    const filterChangeGenderProp = component.prop('filterChangeGender')
    window.scrollTo.mockClear()
    filterChangeGenderProp(activeOption)

    expect(window.scrollTo).toHaveBeenCalledTimes(1)
    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0)
  })
})
