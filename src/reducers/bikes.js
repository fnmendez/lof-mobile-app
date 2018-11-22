import _ from 'lodash/fp/object'

import {
  GET_BIKES_PENDING,
  GET_BIKES_FULFILLED,
  GET_BIKES_REJECTED,
  GET_TRIPS_PENDING,
  GET_TRIPS_FULFILLED,
  GET_TRIPS_REJECTED,
  RETURN_BIKE_PENDING,
  RETURN_BIKE_FULFILLED,
  RETURN_BIKE_REJECTED,
  REQUEST_BIKE_PENDING,
  REQUEST_BIKE_FULFILLED,
  REQUEST_BIKE_REJECTED,
  SAVE_TRIP,
} from '../constants/bikes'

import { LOGIN_FULFILLED } from '../constants/user'

const initialState = {
  available: [],
  currentTrip: null,
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
      return _.merge(state, { available: payload.bikes, loading: false })
    }
    case GET_BIKES_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    case REQUEST_BIKE_PENDING: {
      return _.merge(state, { loading: true })
    }
    case REQUEST_BIKE_FULFILLED: {
      const { trip, bike } = payload
      return _.merge(state, {
        currentTrip: { ...trip, bike },
        loading: false,
      })
    }
    case REQUEST_BIKE_REJECTED: {
      return _.merge(state, { error: payload.message })
    }
    case LOGIN_FULFILLED: {
      const { trip, bike } = payload
      if (!trip || Object.keys(trip).length === 0) return state
      return _.merge(state, {
        currentTrip: { ...trip, bike },
      })
    }
    case RETURN_BIKE_PENDING: {
      return _.merge(state, { loading: true })
    }
    case RETURN_BIKE_FULFILLED: {
      const { trips } = payload
      return _.merge(state, { currentTrip: null, loading: false, trips })
    }
    case RETURN_BIKE_REJECTED: {
      return _.merge(state, { error: payload.message })
    }
    case SAVE_TRIP: {
      const { trip, bike } = payload
      return _.merge(state, {
        currentTrip: { ...trip, bike },
      })
    }
    case GET_TRIPS_PENDING: {
      return _.merge(state, { loading: true })
    }
    case GET_TRIPS_FULFILLED: {
      const { trips } = payload
      return _.merge(state, { loading: false, trips })
    }
    case GET_TRIPS_REJECTED: {
      return _.merge(state, { ...initialState, error: payload.message })
    }
    default: {
      return state
    }
  }
}
