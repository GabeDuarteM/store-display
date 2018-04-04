import React from 'react'

import PropTypes from 'prop-types'
import Downshift from 'downshift'

import DropdownFilterRender from '../DropdownFilterRender'

const DropdownFilter = ({
  items,
  label,
  onChange,
  menuIsOpen,
  handleChangeMenuIsOpen,
  selectedItem,
  width,
}) => (
  <Downshift
    onChange={onChange}
    onSelect={() => handleChangeMenuIsOpen(false)}
    selectedItem={selectedItem}
    isOpen={menuIsOpen}
    onOuterClick={() => {
      handleChangeMenuIsOpen(false)
    }}
    itemToString={item => item.text}
    render={({
      getButtonProps,
      getLabelProps,
      getItemProps,
      isOpen,
      selectedItem: selectedItemRender,
    }) => (
      <div>
        <DropdownFilterRender
          label={label}
          getLabelProps={getLabelProps}
          getButtonProps={getButtonProps}
          getItemProps={getItemProps}
          isOpen={isOpen}
          handleChangeMenuIsOpen={handleChangeMenuIsOpen}
          selectedItem={selectedItemRender}
          width={width}
          items={items}
        />
      </div>
    )}
  />
)

export const propTypes = {
  /** Array of items to display */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /** Gets called when the user changes the selected item */
  onChange: PropTypes.func.isRequired,
  /**
   * Gets called when the dropdown gets or loses focus
   * @param {bool} menuIsOpen The value that defines if the menu should or should not be open
   */
  handleChangeMenuIsOpen: PropTypes.func.isRequired,
  /** The current selected item */
  selectedItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  /** The width of the component */
  width: PropTypes.number,
  /** If provided, it displays a label to the dropdown */
  label: PropTypes.string,
  /** Defines if the dropdown menu should be open */
  menuIsOpen: PropTypes.bool,
}

export const defaultProps = {
  width: 200,
  label: null,
  menuIsOpen: false,
}

DropdownFilter.propTypes = propTypes
DropdownFilter.defaultProps = defaultProps

export default DropdownFilter
