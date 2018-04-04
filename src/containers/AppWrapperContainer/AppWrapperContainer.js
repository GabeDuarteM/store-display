import React from 'react'

import PropTypes from 'prop-types'

import configureStore from '../../store'
import AppWrapper from '../../components/AppWrapper'

const store = configureStore()

const AppWrapperContainer = ({ children }) => (
  <AppWrapper store={store}>{children}</AppWrapper>
)

export const propTypes = {
  /** The children that is supposed to be rendered */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

AppWrapperContainer.propTypes = propTypes

export default AppWrapperContainer
