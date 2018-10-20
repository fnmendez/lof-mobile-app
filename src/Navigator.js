import { connect } from 'react-redux'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'

import BaseNavigator from './navigation/Navigator'

const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

const AppWithNavigationState = reduxifyNavigator(BaseNavigator, 'root')

const mapStateToProps = state => ({
  state: state.nav,
})

const Navigator = connect(mapStateToProps)(AppWithNavigationState)

export { BaseNavigator, Navigator, routerMiddleware }
