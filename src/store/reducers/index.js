import { combineReducers } from 'redux'
import filter from './filter'
import product from './product'

const rootReducer = combineReducers({ filter, product })

export default rootReducer
