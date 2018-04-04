import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import Filter, { styles, propTypes, defaultProps } from './Filter'
import GenderRadioButtonFilterContainer from '../../containers/GenderRadioButtonFilterContainer'
import AppWrapperContainer from '../../containers/AppWrapperContainer'

const createWrapperShallow = () => shallow(<Filter />)

const createWrapperMount = () =>
  mount(
    <AppWrapperContainer>
      <Filter />
    </AppWrapperContainer>,
  )

describe('COMPONENT: <Filter />', () => {
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

  it("should match component's defaultProps snapshot", () => {
    expect(defaultProps).toMatchSnapshot()
  })

  it('should render a GenderRadioButtonFilterContainer', () => {
    const wrapper = createWrapperShallow()
    expect(
      wrapper
        .dive()
        .find(GenderRadioButtonFilterContainer)
        .exists(),
    ).toBeTruthy()
  })
})
