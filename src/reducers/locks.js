import _ from 'lodash/fp/object'

import {
  GET_INFO_PENDING,
  GET_INFO_FULFILLED,
  GET_INFO_REJECTED,
  REQUEST_UNLOCK_PENDING,
  REQUEST_UNLOCK_FULFILLED,
  REQUEST_UNLOCK_REJECTED,
  REQUEST_LOCK_PENDING,
  REQUEST_LOCK_FULFILLED,
  REQUEST_LOCK_REJECTED,
} from '../constants/locks'

const initialState = {
  mac: '' /* MAC address */,
  hs1: '' /* handshake 1 */,
  hs2: '' /* handshake 2 */,
  battery: 0 /* 0 to 100 */,
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_INFO_PENDING: {
      return _.merge(state, { loading: true })
    }
    case GET_INFO_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case GET_INFO_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case REQUEST_LOCK_PENDING: {
      return _.merge(state, { loading: true })
    }
    case REQUEST_LOCK_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case REQUEST_LOCK_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case REQUEST_UNLOCK_PENDING: {
      return _.merge(state, { loading: true })
    }
    case REQUEST_UNLOCK_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case REQUEST_UNLOCK_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    default: {
      return state
    }
  }
}
