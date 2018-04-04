import React from 'react'

import PropTypes from 'prop-types'
import injectSheet from 'react-jss'

import checkMark from '../../assets/check-mark.svg'
import SvgIcon from '../SvgIcon'

export const styles = {
  itemList: {
    boxSizing: 'border-box',
    width: ({ width }) => width,
    position: 'absolute',
    marginTop: 4,
    cursor: 'pointer',
    border: '1px solid #e7e8ec',
    boxShadow: '0px 2px 6px rgba(115,115,115,0.12)',
    borderRadius: 3,
    backgroundColor: 'white',
    zIndex: 1,
  },
  item: {
    height: 36,
    padding: '0 16px',
    display: 'flex',
    alignItems: 'center',
    fontSize: 12,
    color: '#585858',
    '&:hover': {
      backgroundColor: '#f4f6f7',
    },
  },
  checkMark: {
    marginLeft: 'auto',
  },
}

const DropdownFilterItemsList = ({
  classes,
  items,
  getItemProps,
  selectedItem,
}) => (
  <div className={classes.itemList}>
    {items.map(item => (
      <div {...getItemProps({ item, className: classes.item })} key={item.id}>
        {item.text}
        {selectedItem.id === item.id && (
          <SvgIcon
            width={9}
            color="#6e8be3"
            src={checkMark}
            className={classes.checkMark}
          />
        )}
      </div>
    ))}
  </div>
)

const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Array of items to display */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /** Function to get the props from Downshift */
  getItemProps: PropTypes.func.isRequired,
  /** The current selected item to be highlighted with the check mark  */
  selectedItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  /** The width of the component */
  width: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
}

DropdownFilterItemsList.propTypes = propTypes

export default injectSheet(styles)(DropdownFilterItemsList)
