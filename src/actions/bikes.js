import {
  GET_BIKES,
  GET_TRIPS,
  REQUEST_BIKE,
  RETURN_BIKE,
  SAVE_TRIP,
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

export const startTrip = ({ rubi_id, token }) => (
  dispatch,
  getState,
  { api }
) =>
  dispatch({
    type: REQUEST_BIKE,
    payload: api.startTrip({ rubi_id, token }),
  })

export const finishTrip = ({ token }) => (dispatch, getState, { api }) =>
  dispatch({
    type: RETURN_BIKE,
    payload: api.finishTrip({ token }),
  })

export const saveTrip = ({ bike, trip }) => dispatch =>
  dispatch({
    type: SAVE_TRIP,
    payload: { bike, trip },
  })

export const getTrips = ({ token }) => (dispatch, getState, { api }) =>
  dispatch({
    type: GET_TRIPS,
    payload: api.getTrips({ token }),
  })
