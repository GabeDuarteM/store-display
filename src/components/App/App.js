import React from 'react'

import injectSheet from 'react-jss'
import PropTypes from 'prop-types'

import AppHeader from '../AppHeader'
import Filter from '../Filter'
import ProductCardListContainer from '../../containers/ProductCardListContainer'

export const styles = {
  appHeaderSection: {
    margin: '34px 0',
  },
  filterSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    zIndex: 1,
    '&.sticky': {
      position: 'fixed',
      top: 0,
      width: '100%',
      boxShadow: '0px 1px 2px rgba(0,0,0,0.2)',
    },
  },
  filter: {
    width: 900,
  },
  productCardListSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productCardList: {
    width: 930,
  },
  '@global .sticky + section': {
    marginTop: 115,
  },
}

const App = ({ classes }) => (
  <div>
    <section className={classes.appHeaderSection}>
      <AppHeader />
    </section>
    <section id="filterSection" className={classes.filterSection}>
      <Filter className={classes.filter} />
    </section>
    <section className={classes.productCardListSection}>
      <ProductCardListContainer className={classes.productCardList} />
    </section>
  </div>
)

window.onload = () => {
  const filterSection = document.getElementById('filterSection')

  const sticky = filterSection.offsetTop

  const makeFilterStickyIfNecessary = () => {
    if (window.pageYOffset >= sticky) {
      filterSection.classList.add('sticky')
    } else {
      filterSection.classList.remove('sticky')
    }
  }
  window.onscroll = makeFilterStickyIfNecessary
}

export const propTypes = {
  /** @ignore */
  classes: PropTypes.object.isRequired,
}

App.propTypes = propTypes

export default injectSheet(styles)(App)
