import {
  GET_BIKES,
  REQUEST_BIKE,
  RETURN_BIKE,
  GET_HISTORY,
} from '../constants/bikes'

export const getBikes = ({ lat, lon, token }) => (
  dispatch,
  getState,
  { api }
) =>
  dispatch({
    type: GET_BIKES,
    payload: api.getBikes({ lat, lon, token }),
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

export const getHistory = ({ token }) => (dispatch, getState, { api }) =>
  dispatch({
    type: GET_HISTORY,
    payload: api.getHistory({ token }),
  })
