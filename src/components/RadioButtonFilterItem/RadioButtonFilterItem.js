import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

export const styles = {
  radioButtonFilterItem: {
    boxSizing: 'border-box',
    fontSize: 12,
    width: 160,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#656565',
    backgroundColor: 'white',
    border: '1px solid #d7d8db',
    borderLeft: '0',
    borderRight: '0',
    '&:first-child': {
      borderLeft: '1px solid #d7d8db',
      borderTopLeftRadius: '3px',
      borderBottomLeftRadius: '3px',
    },
    '&:last-child': {
      borderRight: '1px solid #d7d8db',
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
    },
    '&.active': {
      color: 'white',
      backgroundColor: '#6F8CE3',
      border: '1px solid #6F8CE3 !important',
    },
  },
  hiddenInput: {
    display: 'none',
  },
}

const RadioButtonFilterItem = ({ classes, text, active, onChange }) => (
  <label className={cn(classes.radioButtonFilterItem, { active })}>
    <input
      className={classes.hiddenInput}
      type="radio"
      checked={active}
      onChange={onChange}
    />
    {text}
  </label>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Text to be displayed */
  text: PropTypes.string.isRequired,
  /** Property to define if the filter is active or not */
  active: PropTypes.bool,
  /**
   * Gets called when the user clicks on the radiobutton
   *
   * @param {string} id Id of the option that was clicked
   */
  onChange: PropTypes.func.isRequired,
}

export const defaultProps = {
  active: false,
}

RadioButtonFilterItem.propTypes = propTypes

RadioButtonFilterItem.defaultProps = defaultProps

export default injectSheet(styles)(RadioButtonFilterItem)
