import { combineReducers } from 'redux'
import nav from './nav'
import user from './user'

const AppReducer = combineReducers({
  nav,
  user,
})

export default AppReducer
