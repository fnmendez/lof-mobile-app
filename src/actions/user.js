import {
  GET_USER,
  CHECK_CONFIRMATION,
  LOGIN,
  SIGNUP,
  UPDATE,
  DELETE,
  LOGOUT,
} from '../constants/user'

export const getUser = ({ token }) => (dispatch, getState, { api }) =>
  dispatch({
    type: GET_USER,
    payload: api.getUser({ token }),
  })

export const checkConfirmation = ({ token }) => (dispatch, getState, { api }) =>
  dispatch({
    type: CHECK_CONFIRMATION,
    payload: api.getUser({ token }),
  })

export const login = ({ mail, password }) => (dispatch, getState, { api }) =>
  dispatch({
    type: LOGIN,
    payload: api.login({ mail, password }),
  })

export const signup = userData => (dispatch, getState, { api }) =>
  dispatch({
    type: SIGNUP,
    payload: api.signup(userData),
  })

export const update = userData => (dispatch, getState, { api }) =>
  dispatch({
    type: UPDATE,
    payload: api.updateUser(userData),
  })

export const destroy = ({ token }) => (dispatch, getState, { api }) =>
  dispatch({
    type: DELETE,
    payload: api.deleteUser({ token }),
  })

export const logout = () => dispatch =>
  dispatch({
    type: LOGOUT,
    payload: {},
  })
