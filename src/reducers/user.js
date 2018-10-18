import { LOGIN, LOGOUT } from '../constants/user'

const initialState = { isLoggedIn: false, username: '' }

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case LOGIN:
      return { ...state, isLoggedIn: true, ...payload }
    case LOGOUT:
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}
