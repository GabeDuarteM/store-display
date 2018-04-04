import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import DropdownFilter from '../../components/DropdownFilter'
import { filterChangeSort } from '../../store/reducers/filter/filterActions'
import { productRefreshList } from '../../store/reducers/product/productActions'

const items = [
  { id: 'price-asc', text: 'Price: low to high' },
  { id: 'price-desc', text: 'Price: high to low' },
  { id: 'rating-asc', text: 'Rating: low to high' },
  { id: 'rating-desc', text: 'Rating: high to low' },
]

export class SortDropdownFilterContainer extends React.PureComponent {
  state = {
    menuIsOpen: false,
  }

  handleChangeMenuIsOpen = menuIsOpen => {
    this.setState({ menuIsOpen })
  }

  render() {
    const { selectedItem, onChange } = this.props
    return (
      <DropdownFilter
        items={items}
        onChange={onChange}
        selectedItem={selectedItem}
        menuIsOpen={this.state.menuIsOpen}
        handleChangeMenuIsOpen={this.handleChangeMenuIsOpen}
        label="Sort by"
      />
    )
  }
}

export const propTypes = {
  /** @ignore */
  selectedItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  /** @ignore */
  onChange: PropTypes.func.isRequired,
}

SortDropdownFilterContainer.propTypes = propTypes

const mapStateToProps = state => ({
  selectedItem: items.find(elem => elem.id === state.filter.sort),
})

const mapDispatchToProps = dispatch => ({
  onChange: item => {
    dispatch(filterChangeSort(item.id))
    dispatch(productRefreshList())
    window.scrollTo(0, 0)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(
  SortDropdownFilterContainer,
)
