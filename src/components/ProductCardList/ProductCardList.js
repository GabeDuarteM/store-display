import React from 'react'

import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

import ProductCard from '../ProductCard'
import Button from '../Button'

export const styles = {
  productCardList: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '15px 0',
    margin: '0 47px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCard: {
    flex: 'none',
    margin: 15,
  },
  loadMoreButtonRoot: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadMoreButton: {
    margin: 25,
  },
}

const ProductCardList = ({
  className,
  classes,
  products,
  toggleIsWishlisted,
  handleClickLoadMore,
  isLastPage,
}) => (
  <div className={cn(classes.productCardList, className)}>
    {products.map(product => (
      <ProductCard
        key={product.id}
        className={classes.productCard}
        toggleIsWishlisted={toggleIsWishlisted}
        {...product}
      />
    ))}
    <div className={classes.loadMoreButtonRoot}>
      {isLastPage === false && (
        <Button
          className={classes.loadMoreButton}
          onClick={handleClickLoadMore}
        >
          Load more
        </Button>
      )}
    </div>
  </div>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** Array of products to list */
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imgUrl: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      isNew: PropTypes.bool.isRequired,
      name: PropTypes.string.isRequired,
      brand: PropTypes.string.isRequired,
    }),
  ).isRequired,
  /**
   * Function to add an item to a wishlist
   * @param {id} string The id of the item to toggle the wishlist state
   */
  toggleIsWishlisted: PropTypes.func.isRequired,
  /** Gets called when the user clicks on the Load more button */
  handleClickLoadMore: PropTypes.func.isRequired,
  /** Property that defines if there are more products to load or not  */
  isLastPage: PropTypes.bool,
  /** Apply that className to the root component */
  className: PropTypes.string,
}

export const defaultProps = {
  isLastPage: null,
  className: null,
}

ProductCardList.propTypes = propTypes
ProductCardList.defaultProps = defaultProps

export default injectSheet(styles)(ProductCardList)
