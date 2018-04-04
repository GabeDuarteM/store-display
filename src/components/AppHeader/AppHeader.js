import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

export const styles = {
  appHeader: {
    color: '#585858',
    fontFamily: 'Montserrat',
    fontSize: 24.0,
    fontWeight: 400,
    textAlign: 'center',
  },
}

const AppHeader = ({ classes }) => (
  <div className={classes.appHeader}>STORE DISPLAY</div>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

AppHeader.propTypes = propTypes

export default injectSheet(styles)(AppHeader)
