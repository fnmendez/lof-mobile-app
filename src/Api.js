import { destroy, get, patch, post } from './helpers/requests'

class Api {
  /**
   * This class is used as singleton for handling communication with LOF API.
   * This methods are used in redux actions.
   */

  /* USER */

  signup = async userData => {
    const response = await post('/signup', userData)
    return response
  }

  login = async userData => {
    const response = await post('/login', userData)
    return response
  }

  getUser = async ({ token }) => {
    const response = await get(`/user/${token}`)
    return response
  }

  deleteUser = async ({ token }) => {
    const response = await destroy(`/user/${token}/delete`, {})
    return response
  }

  /* BIKES */

  getBikes = async ({ latitude, longitude, token }) => {
    const response = await get(`/bikes/${latitude}/${longitude}`, token)
    return response
  }

  /* TRIPS */

  getTrips = async ({ token }) => {
    const response = await get('/trips', token)
    return response
  }

  startTrip = async ({ rubi_id, token }) => {
    const response = await post(`/trips/${rubi_id}`, {}, token)
    return response
  }

  finishTrip = async ({ token }) => {
    const response = await patch('/trips', {}, token)
    return response
  }
}

export default Api
