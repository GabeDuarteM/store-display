import React from 'react'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import ProductCardList from '../../components/ProductCardList'
import { filterLoadMoreProducts } from '../../store/reducers/filter/filterActions'
import {
  productRefreshList,
  productSetWishlistProp,
} from '../../store/reducers/product/productActions'

export class ProductCardListContainer extends React.Component {
  componentDidMount = () => {
    this.props.productRefreshList()
  }

  toggleIsWishlisted = id => {
    const wishlistProducts =
      JSON.parse(localStorage.getItem('wishlistProducts')) || []
    let newWishlistProducts
    const productInsideWishlist = wishlistProducts.find(
      wishlistId => wishlistId === id,
    )

    if (productInsideWishlist) {
      newWishlistProducts = [
        ...wishlistProducts.filter(productId => productId !== id),
      ]
    } else {
      newWishlistProducts = [...wishlistProducts, id]
    }
    localStorage.setItem(
      'wishlistProducts',
      JSON.stringify(newWishlistProducts),
    )
    this.props.productSetWishlistProp({
      id,
      isWishlisted: !productInsideWishlist,
    })
  }

  render() {
    const { handleClickLoadMore, products, isLastPage, className } = this.props

    return (
      <ProductCardList
        className={className}
        products={products}
        handleClickLoadMore={handleClickLoadMore}
        toggleIsWishlisted={this.toggleIsWishlisted}
        isLastPage={isLastPage}
      />
    )
  }
}

export const propTypes = {
  /** A className to apply to the root component  */
  className: PropTypes.string,
  /** @ignore */
  handleClickLoadMore: PropTypes.func.isRequired,
  /** @ignore */
  productRefreshList: PropTypes.func.isRequired,
  /** @ignore */
  productSetWishlistProp: PropTypes.func.isRequired,
  /** @ignore */
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      isNew: PropTypes.bool.isRequired,
      isWishlisted: PropTypes.bool,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
    }),
  ),
  /** @ignore */
  isLastPage: PropTypes.bool,
}

export const defaultProps = {
  products: [],
  isLastPage: null,
  className: null,
}

ProductCardListContainer.defaultProps = defaultProps
ProductCardListContainer.propTypes = propTypes

const mapStateToProps = state => ({
  products: state.product.products,
  isLastPage: state.product.isLastPage,
})

const mapDispatchToProps = dispatch => ({
  handleClickLoadMore: () => {
    dispatch(filterLoadMoreProducts())
    dispatch(productRefreshList())
  },
  productRefreshList: () => dispatch(productRefreshList()),
  productSetWishlistProp: ({ id, isWishlisted }) =>
    dispatch(productSetWishlistProp({ id, isWishlisted })),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  ProductCardListContainer,
)
