import React from 'react'

import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'

import App, { styles, propTypes } from './App'
import AppHeader from '../AppHeader'
import Filter from '../Filter'
import AppWrapperContainer from '../../containers/AppWrapperContainer'
import ProductCardListContainer from '../../containers/ProductCardListContainer'

const createWrapperShallow = () => shallow(<App />)

const createWrapperMount = () =>
  mount(
    <AppWrapperContainer>
      <App />
    </AppWrapperContainer>,
  )

describe('COMPONENT: <App />', () => {
  it('should render without crashing', () => {
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

  it('should have an AppHeader component', () => {
    const wrapper = createWrapperShallow()

    const appHeaderExists = wrapper
      .dive()
      .find(AppHeader)
      .exists()
    expect(appHeaderExists).toBeTruthy()
  })

  it('should have an Filter component', () => {
    const wrapper = createWrapperShallow()

    const filterExists = wrapper
      .dive()
      .find(Filter)
      .exists()
    expect(filterExists).toBeTruthy()
  })

  it('should have a ProductCardListContainer component', () => {
    const wrapper = createWrapperShallow()

    const productCardListContainerExists = wrapper
      .dive()
      .find(ProductCardListContainer)
      .exists()
    expect(productCardListContainerExists).toBeTruthy()
  })

  it('should not have a sticky class on the filter section when the whole element is visible', () => {
    const section = document.createElement('section')
    section.setAttribute('id', 'filterSection')

    document.body.appendChild(section)
    window.onload()
    window.onscroll()

    const hasStickyClass = document
      .getElementById('filterSection')
      .classList.contains('sticky')
    expect(hasStickyClass).toBe(true)
  })
})
