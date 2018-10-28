import { NavigationActions } from 'react-navigation'
import get from 'lodash/get'

import { BaseNavigator } from '../Navigator'
import {
  LOGIN_FULFILLED,
  SIGNUP_FULFILLED,
  CHECK_CONFIRMATION_FULFILLED,
} from '../constants/user'

const firstAction = BaseNavigator.router.getActionForPathAndParams('Main')
const initialNavState = BaseNavigator.router.getStateForAction(firstAction)

export default function reducer(state = initialNavState, action) {
  const { type, payload } = action
  let nextState
  switch (type) {
    case LOGIN_FULFILLED: {
      const confirmed = get(payload, ['confirmed'])
      if (!confirmed) {
        nextState = BaseNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'ConfirmAccount' }),
          state
        )
      } else {
        nextState = BaseNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Tabs' }),
          state
        )
      }
      break
    }
    case SIGNUP_FULFILLED: {
      nextState = BaseNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'ConfirmAccount' }),
        state
      )
      break
    }
    case CHECK_CONFIRMATION_FULFILLED: {
      const confirmed = get(payload, ['confirmed'])
      if (!confirmed) {
        nextState = BaseNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'ConfirmAccount' }),
          state
        )
      } else {
        nextState = BaseNavigator.router.getStateForAction(
          NavigationActions.navigate({ routeName: 'Tabs' }),
          state
        )
      }
      break
    }
    default: {
      nextState = BaseNavigator.router.getStateForAction(action, state)
      break
    }
  }
  return nextState || state
}
