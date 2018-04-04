import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import { Provider } from 'react-redux'

export const styles = {
  [`@global ${
    process.env.NODE_ENV === 'styleguide' ? '*[data-preview]' : 'body'
  }`]: {
    fontFamily: 'Montserrat, sans-serif',
    backgroundColor: '#f5f5f5',
  },
}

const AppWrapper = ({ children, store }) => {
  if (store) {
    return <Provider store={store}>{children}</Provider>
  }
  return children
}

export const propTypes = {
  /** The children that the component will render */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  /** The redux's store */
  store: PropTypes.object,
}

export const defaultProps = {
  store: null,
}

AppWrapper.propTypes = propTypes
AppWrapper.defaultProps = defaultProps

export default injectSheet(styles)(AppWrapper)
