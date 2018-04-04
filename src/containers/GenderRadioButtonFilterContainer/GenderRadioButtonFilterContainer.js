import React from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import RadioButtonFilter from '../../components/RadioButtonFilter'
import { filterChangeGender as filterChangeGenderAction } from '../../store/reducers/filter/filterActions'
import { productRefreshList } from '../../store/reducers/product/productActions'

export const GenderRadioButtonFilterContainer = ({
  activeOption,
  filterChangeGender,
}) => (
  <RadioButtonFilter
    options={[{ id: 'woman', text: 'Woman' }, { id: 'man', text: 'Man' }]}
    activeOption={activeOption}
    onChange={filterChangeGender}
  />
)

const propTypes = {
  /** @ignore */
  activeOption: PropTypes.oneOf(['man', 'woman']).isRequired,
  /** @ignore */
  filterChangeGender: PropTypes.func.isRequired,
}

GenderRadioButtonFilterContainer.propTypes = propTypes

const mapStateToProps = state => ({
  activeOption: state.filter.gender,
})

const mapDispatchToProps = dispatch => ({
  filterChangeGender: gender => {
    dispatch(filterChangeGenderAction(gender))
    dispatch(productRefreshList())
    window.scrollTo(0, 0)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(
  GenderRadioButtonFilterContainer,
)
