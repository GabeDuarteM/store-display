import React from 'react'

import PropTypes from 'prop-types'
import cn from 'classnames'
import injectSheet from 'react-jss'

import downArrow from '../../assets/down-arrow.svg'
import SvgIcon from '../SvgIcon'

export const styles = {
  dropdownFilter: {
    WebkitAppearance: 'none !important',
    boxSizing: 'border-box',
    height: 36,
    paddingLeft: 15,
    width: ({ width }) => width,
    alignItems: 'center',
    display: 'flex',
    fontSize: 12,
    border: ({ isOpen }) => `1px solid #${isOpen ? '6e8be3' : 'd7d8db'}`,
    borderRadius: 3,
    color: '#585858',
    backgroundColor: 'white',
    '&:active': {
      border: '1px solid #6e8be3',
    },
  },
  downArrow: {
    marginLeft: 'auto',
    paddingRight: 16,
    '&.isOpen': {
      transform: 'rotateX(180deg)',
    },
  },
}

const DropdownFilterInput = ({
  classes,
  getButtonProps,
  handleChangeMenuIsOpen,
  selectedItem,
  isOpen,
}) => (
  <div
    role="button"
    {...getButtonProps({
      onClick: () => {
        handleChangeMenuIsOpen(!isOpen)
      },
      className: classes.dropdownFilter,
    })}
  >
    {selectedItem.text}
    <SvgIcon
      className={cn(classes.downArrow, { isOpen })}
      width={9}
      color="#9B9B9B"
      src={downArrow}
    />
  </div>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Function to get the props from Downshift */
  getButtonProps: PropTypes.func.isRequired,
  /** Property that define if the item list is opened or not */
  isOpen: PropTypes.bool.isRequired,
  /** Gets called when the user clicks the input. It used to open the menu with the items. */
  handleChangeMenuIsOpen: PropTypes.func.isRequired,
  /** The current selected item to be displayed on the input */
  selectedItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  /** The width of the component */
  width: PropTypes.number.isRequired,
}

DropdownFilterInput.propTypes = propTypes

export default injectSheet(styles)(DropdownFilterInput)
