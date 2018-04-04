import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import AppWrapperContainer from './AppWrapperContainer'
import AppWrapper from '../../components/AppWrapper'

const createWrapper = (func, children = <div>mock children</div>) =>
  func(<AppWrapperContainer>{children}</AppWrapperContainer>)

const createWrapperShallow = children => createWrapper(shallow, children)

const createWrapperMount = children => createWrapper(mount, children)

describe('COMPONENT: <AppWrapperContainer />', () => {
  it('should render without crashing', () => {
    createWrapperMount()
  })

  it("should match component's snapshot", () => {
    const wrapper = createWrapperShallow()
    expect(toJson(wrapper.dive())).toMatchSnapshot()
  })

  it('should have a AppWrapper component', () => {
    const wrapper = createWrapperShallow()
    const hasAppWrapper = wrapper.find(AppWrapper).exists()

    expect(hasAppWrapper).toBe(true)
  })

  it('should render AppWrapper with the correct props', () => {
    const children = <div>test</div>
    const wrapper = createWrapperShallow(children)
    const hasStoreProp = wrapper.dive().prop('store')
    const childrenProp = wrapper.dive().prop('children')

    expect(hasStoreProp).toBeDefined()
    expect(childrenProp).toBe(children)
  })
})
