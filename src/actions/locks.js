import { GET_INFO, REQUEST_UNLOCK, REQUEST_LOCK } from '../constants/locks'

export const getInfo = ({ mac, hs1, hs2 }) => (
  dispatch,
  getState,
  { bluetooth }
) =>
  dispatch({
    type: GET_INFO,
    payload: bluetooth.getInfo({ mac, hs1, hs2 }),
  })

export const requestUnlock = ({ mac, hs1, hs2 }) => (
  dispatch,
  getState,
  { bluetooth }
) =>
  dispatch({
    type: REQUEST_UNLOCK,
    payload: bluetooth.requestUnlock({ mac, hs1, hs2 }),
  })

export const requestLock = ({ mac, hs1, hs2 }) => (
  dispatch,
  getState,
  { bluetooth }
) =>
  dispatch({
    type: REQUEST_LOCK,
    payload: bluetooth.requestLock({ mac, hs1, hs2 }),
  })
