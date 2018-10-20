import { LOGIN } from '../constants/user'

export const login = ({ username }) => dispatch =>
  dispatch({
    type: LOGIN,
    payload: { username },
  })
