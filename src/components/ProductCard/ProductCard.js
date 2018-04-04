import React from 'react'

import PropTypes from 'prop-types'
import injectSheet from 'react-jss'
import cn from 'classnames'

import SvgIcon from '../SvgIcon/SvgIcon'
import heart from '../../assets/heart.svg'
import heartO from '../../assets/heart-o.svg'

export const styles = {
  productCard: {
    width: 280,
    height: 344,
    background: '#ffffff',
    overflow: 'hidden',
    transition: 'box-shadow 0.3s ease-in-out',
    '&:hover': {
      boxShadow: '0px 30px 50px rgba(0,0,0,0.15)',
    },
    '&:hover $wishlistButton': {
      visibility: 'visible !important',
    },
  },
  img: {
    backgroundImage: ({ imgUrl }) => `url(${imgUrl})`,
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    width: 260,
    height: 260,
    display: 'flex',
    justifyContent: 'space-between',
  },
  imgContainer: {
    width: 280,
    height: 280,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistButton: {
    visibility: 'hidden',
    cursor: 'pointer',
    transition: 'transform 180ms',
    transitionTimingFunction: 'cubic-bezier(.2,.7,.8,.7)',
    marginTop: 10,
    marginLeft: 8,
    '&:hover': {
      transform: 'scale(1.2,1.2)',
    },
    '&.wishlisted': {
      visibility: 'visible !important',
    },
  },
  newProduct: {
    width: 90,
    color: '#d0011b',
    height: 90,
    fontSize: 12,
    background: '#fff2f2',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    transform: 'rotate(45deg)',
    margin: -61,
    paddingBottom: 6,
    boxSizing: 'border-box',
    userSelect: 'none',
  },
  description: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 14,
  },
  brand: {
    color: '#585858',
    fontFamily: 'Montserrat',
    fontSize: 14.0,
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  name: {
    color: '#646464',
    fontSize: 12.0,
    fontWeight: 300,
    width: 160,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    marginTop: 4,
    height: 16,
  },
  price: {
    color: '#585858',
    fontSize: 14.0,
    fontWeight: 400,
    marginRight: 6,
  },
}

const ProductCard = ({
  classes,
  brand,
  name,
  price,
  id,
  currency,
  isWishlisted,
  toggleIsWishlisted,
  isNew,
  className,
}) => (
  <div className={cn(classes.productCard, className)}>
    <div className={classes.imgContainer}>
      <div className={classes.img}>
        <SvgIcon
          className={cn(classes.wishlistButton, { wishlisted: isWishlisted })}
          onClick={() => toggleIsWishlisted(id)}
          width={20}
          height={20}
          color={`#${isWishlisted ? 'ff5454' : '808080'}`}
          src={isWishlisted ? heart : heartO}
        />
        {isNew && <div className={classes.newProduct}>New</div>}
      </div>
    </div>
    <div className={classes.description}>
      <div>
        <div className={classes.brand}>{brand}</div>
        <div className={classes.name}>{name}</div>
      </div>
      <div className={classes.price}>
        {currency}
        {Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2 }).format(price)}
      </div>
    </div>
  </div>
)

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
  /** The url of the image to be displayed */
  imgUrl: PropTypes.string.isRequired, // eslint-disable-line react/no-unused-prop-types
  /** The brand of the product */
  brand: PropTypes.string.isRequired,
  /** The name of the product */
  name: PropTypes.string.isRequired,
  /** The price of the product */
  price: PropTypes.number.isRequired,
  /** The id of the product */
  id: PropTypes.string.isRequired,
  /** Gets called when the user clicks the wishlist button */
  toggleIsWishlisted: PropTypes.func.isRequired,
  /** The currency of the product's price */
  currency: PropTypes.string,
  /** Prop that define if the product is wishlisted or not */
  isWishlisted: PropTypes.bool,
  /** Prop that define if the product is new or not */
  isNew: PropTypes.bool,
  /** custom className to be applied on the root element */
  className: PropTypes.string,
}

export const defaultProps = {
  currency: 'R$',
  isWishlisted: false,
  isNew: false,
  className: null,
}

ProductCard.propTypes = propTypes
ProductCard.defaultProps = defaultProps

export default injectSheet(styles)(ProductCard)
