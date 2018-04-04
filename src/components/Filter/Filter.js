import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

import GenderRadioButtonFilterContainer from '../../containers/GenderRadioButtonFilterContainer'
import SortDropdownFilterContainer from '../../containers/SortDropdownFilterContainer'

export const styles = {
  filter: {
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 25,
    paddingLeft: 62,
    paddingRight: 62,
    display: 'flex',
    justifyContent: 'space-between',
  },
}

const Filter = ({ classes, className }) => (
  <div className={cn(classes.filter, className)}>
    <GenderRadioButtonFilterContainer />
    <SortDropdownFilterContainer />
  </div>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Apply a classname to the root component */
  className: PropTypes.string,
}

export const defaultProps = {
  className: null,
}

Filter.propTypes = propTypes
Filter.defaultProps = defaultProps

export default injectSheet(styles)(Filter)
