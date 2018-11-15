import { NavigationActions, StackActions } from 'react-navigation'
import get from 'lodash/get'

import { BaseNavigator } from '../Navigator'
import {
  CHECK_CONFIRMATION_FULFILLED,
  DELETE_FULFILLED,
  LOGIN_FULFILLED,
  LOGOUT,
  SIGNUP_FULFILLED,
} from '../constants/user'
import { RETURN_BIKE_FULFILLED } from '../constants/bikes'

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
    case LOGOUT: {
      nextState = BaseNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      )
      break
    }
    case DELETE_FULFILLED: {
      nextState = BaseNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: 'Main' }),
        state
      )
      break
    }
    case RETURN_BIKE_FULFILLED: {
      nextState = BaseNavigator.router.getStateForAction(
        StackActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Tabs' }),
            NavigationActions.navigate({ routeName: 'TripFinished' }),
          ],
        }),
        state
      )
      break
    }
    default: {
      nextState = BaseNavigator.router.getStateForAction(action, state)
      break
    }
  }
  return nextState || state
}
