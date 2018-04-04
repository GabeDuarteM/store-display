import React from 'react'

import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import DropdownFilterInput from '../DropdownFilterInput'
import DropdownFilterItemsList from '../DropdownFilterItemsList'

export const styles = {
  renderRoot: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'default',
    userSelect: 'none',
  },
  label: {
    fontSize: 12,
    color: '#585858',
    fontWeight: 500,
    marginRight: 8,
  },
}

const DropdownFilterRender = ({
  classes,
  label,
  getLabelProps,
  getButtonProps,
  getItemProps,
  isOpen,
  handleChangeMenuIsOpen,
  selectedItem,
  width,
  items,
}) => (
  <div className={classes.renderRoot}>
    {label && (
      <label className={classes.label} {...getLabelProps()}>
        {label}
      </label>
    )}
    <div>
      <DropdownFilterInput
        getButtonProps={getButtonProps}
        isOpen={isOpen}
        handleChangeMenuIsOpen={handleChangeMenuIsOpen}
        selectedItem={selectedItem}
        width={width}
      />
      {isOpen ? (
        <DropdownFilterItemsList
          items={items}
          getItemProps={getItemProps}
          selectedItem={selectedItem}
          width={width}
        />
      ) : null}
    </div>
  </div>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** If provided, it displays a label to the dropdown */
  label: PropTypes.string,
  /** Function to get the props from Downshift */
  getLabelProps: PropTypes.func.isRequired,
  /** Function to get the props from Downshift */
  getButtonProps: PropTypes.func.isRequired,
  /** Function to get the props from Downshift */
  getItemProps: PropTypes.func.isRequired,
  /** Defines if the dropdown menu should be open */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Gets called when the dropdown gets or loses focus
   * @param {bool} menuIsOpen The value that defines if the menu should or should not be open
   */
  handleChangeMenuIsOpen: PropTypes.func.isRequired,
  /** The current selected item to be displayed on the input */
  selectedItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  /** The width of the component */
  width: PropTypes.number.isRequired,
  /** Array of items to display */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
}

export const defaultProps = {
  label: null,
}

DropdownFilterRender.propTypes = propTypes
DropdownFilterRender.defaultProps = defaultProps

export default injectSheet(styles)(DropdownFilterRender)
