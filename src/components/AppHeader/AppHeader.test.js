import React from 'react'

import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import AppHeader, { styles, propTypes } from './AppHeader'

describe('COMPONENT: <AppHeader />', () => {
  it('should render without crashing', () => {
    shallow(<AppHeader />)
  })

  it("should match component's snapshot", () => {
    const wrapper = shallow(<AppHeader />)
    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })

  it("should match component's style snapshot", () => {
    expect(styles).toMatchSnapshot()
  })

  it("should match component's propTypes snapshot", () => {
    expect(propTypes).toMatchSnapshot()
  })

  it('should have the text set to STORE DISPLAY', () => {
    const wrapper = shallow(<AppHeader />)
    expect(wrapper.dive().text()).toBe('STORE DISPLAY')
  })
})
