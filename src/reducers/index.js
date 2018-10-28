import { combineReducers } from 'redux'
import nav from './nav'
import user from './user'
import bikes from './bikes'

const AppReducer = combineReducers({
  nav,
  user,
  bikes,
})

export default AppReducer
