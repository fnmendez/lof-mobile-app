import {
  GET_BIKES,
  REQUEST_BIKE,
  RETURN_BIKE,
  GET_TRIPS,
} from '../constants/bikes'

export const getBikes = ({ latitude, longitude, token }) => (
  dispatch,
  getState,
  { api }
) =>
  dispatch({
    type: GET_BIKES,
    payload: api.getBikes({ latitude, longitude, token }),
  })

export const requestBike = ({ rubi_id, token }) => (
  dispatch,
  getState,
  { api }
) =>
  dispatch({
    type: REQUEST_BIKE,
    payload: api.requestBike({ rubi_id, token }),
  })

export const returnBike = ({ tripId, token }) => (
  dispatch,
  getState,
  { api }
) =>
  dispatch({
    type: RETURN_BIKE,
    payload: api.returnBike({ tripId, token }),
  })

export const getTrips = ({ token }) => (dispatch, getState, { api }) =>
  dispatch({
    type: GET_TRIPS,
    payload: api.getTrips({ token }),
  })
