import _ from 'lodash/fp/object'
import { REHYDRATE } from 'redux-persist/constants'

import {
  GET_BIKES_PENDING,
  GET_BIKES_FULFILLED,
  GET_BIKES_REJECTED,
  REQUEST_BIKE_PENDING,
  REQUEST_BIKE_FULFILLED,
  REQUEST_BIKE_REJECTED,
  RETURN_BIKE_PENDING,
  RETURN_BIKE_FULFILLED,
  RETURN_BIKE_REJECTED,
  GET_TRIPS_PENDING,
  GET_TRIPS_FULFILLED,
  GET_TRIPS_REJECTED,
} from '../constants/bikes'

const initialState = {
  bike: {},
  bikes: [],
  trips: [],
  error: '',
  loading: false,
}

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_BIKES_PENDING: {
      return _.merge(state, { loading: true })
    }
    case GET_BIKES_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case GET_BIKES_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case REQUEST_BIKE_PENDING: {
      return _.merge(state, { loading: true })
    }
    case REQUEST_BIKE_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case REQUEST_BIKE_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case RETURN_BIKE_PENDING: {
      return _.merge(state, { loading: true })
    }
    case RETURN_BIKE_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case RETURN_BIKE_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case GET_TRIPS_PENDING: {
      return _.merge(state, { loading: true })
    }
    case GET_TRIPS_FULFILLED: {
      return _.merge(state, { ...payload, loading: false })
    }
    case GET_TRIPS_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case REHYDRATE: {
      return _.merge(state, {
        ...payload.bike,
        error: '',
        loading: false,
      })
    }
    default: {
      return state
    }
  }
}
