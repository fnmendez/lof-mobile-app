import _ from 'lodash/fp/object'
import { REHYDRATE } from 'redux-persist/lib/constants'

import {
  CHECK_CONFIRMATION_PENDING,
  CHECK_CONFIRMATION_FULFILLED,
  CHECK_CONFIRMATION_REJECTED,
  GET_USER_PENDING,
  GET_USER_FULFILLED,
  GET_USER_REJECTED,
  LOGIN_PENDING,
  LOGIN_FULFILLED,
  LOGIN_REJECTED,
  SIGNUP_PENDING,
  SIGNUP_FULFILLED,
  SIGNUP_REJECTED,
  UPDATE_PENDING,
  UPDATE_FULFILLED,
  UPDATE_REJECTED,
  DELETE_PENDING,
  DELETE_FULFILLED,
  DELETE_REJECTED,
  LOGOUT,
} from '../constants/user'

const initialState = {
  balance: null,
  error: '',
  firstName: '',
  lastName: '',
  loading: false,
  mail: '',
  token: '',
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case CHECK_CONFIRMATION_PENDING: {
      return _.merge(state, { loading: true })
    }
    case CHECK_CONFIRMATION_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case CHECK_CONFIRMATION_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case GET_USER_PENDING: {
      return _.merge(state, { loading: true })
    }
    case GET_USER_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case GET_USER_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case LOGIN_PENDING: {
      return _.merge(state, { loading: true })
    }
    case LOGIN_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case LOGIN_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case SIGNUP_PENDING: {
      return _.merge(state, { loading: true })
    }
    case SIGNUP_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case SIGNUP_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case UPDATE_PENDING: {
      return _.merge(state, { loading: true })
    }
    case UPDATE_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case UPDATE_REJECTED: {
      return _.merge(state, { error: payload.message })
    }
    case DELETE_PENDING: {
      return _.merge(state, { loading: true })
    }
    case DELETE_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case DELETE_REJECTED: {
      return _.merge(state, { error: payload.message })
    }
    case LOGOUT: {
      state = undefined
      return _.merge(state, initialState)
    }
    case REHYDRATE: {
      return state
    }
    default: {
      return _.merge(state, { error: '' })
    }
  }
}
