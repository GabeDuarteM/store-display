import React from 'react'
import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import RadioButtonFilterItem from '../RadioButtonFilterItem'

export const styles = {
  radioButtonFilter: {
    display: 'flex',
    userSelect: 'none',
  },
}

const RadioButtonFilter = ({ classes, options, activeOption, onChange }) => (
  <div className={classes.radioButtonFilter}>
    {options.map(elem => (
      <RadioButtonFilterItem
        key={elem.id}
        onChange={() => onChange(elem.id)}
        text={elem.text}
        active={elem.id === activeOption}
      />
    ))}
  </div>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Array of items that will be displayed inside the RadioButton */
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /**
   * Gets called when the user clicks on the radiobutton
   *
   * @param {string} id Id of the option that was clicked
   */
  onChange: PropTypes.func.isRequired,
  /** The active filter */
  activeOption: PropTypes.string,
}

export const defaultProps = {
  activeOption: null,
}

RadioButtonFilter.propTypes = propTypes
RadioButtonFilter.defaultProps = defaultProps

export default injectSheet(styles)(RadioButtonFilter)
