import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers'

import NavigatorConfig from './navigation/Navigator'

const routerMiddleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

const BaseNavigator = createStackNavigator(NavigatorConfig)

const AppWithNavigationState = reduxifyNavigator(BaseNavigator, 'root')

const mapStateToProps = state => ({
  state: state.nav,
})

const Navigator = connect(mapStateToProps)(AppWithNavigationState)

export { BaseNavigator, Navigator, routerMiddleware }
