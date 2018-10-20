import { NavigationActions } from 'react-navigation'

import { BaseNavigator } from '../Navigator'
import { LOGIN } from '../constants/user'

const firstAction = BaseNavigator.router.getActionForPathAndParams('Main')
const initialNavState = BaseNavigator.router.getStateForAction(firstAction)

export default function reducer(state = initialNavState, action) {
  let nextState
  switch (action.type) {
    case LOGIN:
      nextState = BaseNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ConfirmAccount' }),
        state
      )
      break
    default:
      nextState = BaseNavigator.router.getStateForAction(action, state)
      break
  }
  return nextState || state
}
