import { LOGIN, LOGOUT } from '../constants/user'

export const login = ({ username }) => dispatch =>
  dispatch({
    type: LOGIN,
    payload: { username },
  })

export const logout = () => dispatch => dispatch({ type: LOGOUT, payload: {} })
