import axios from 'axios'

class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  request = async req => {
    try {
      const res = await req
      return res.data
    } catch (err) {
      throw Object(err.response.data)
    }
  }

  get = async (endpoint, token = '') =>
    this.request(
      axios.get(`${this.baseUrl}${endpoint}`, {
        headers: { Authorization: token },
      })
    )

  post = async (endpoint, body, token = '') =>
    this.request(
      axios.post(`${this.baseUrl}${endpoint}`, body, {
        headers: { Authorization: token },
      })
    )

  /* USER */

  signup = async userData => {
    const response = await this.post('/signup', userData)
    return response
  }

  login = async userData => {
    const response = await this.post('/login', userData)
    return response
  }

  getUser = async ({ token }) => {
    const response = await this.get(`/user/${token}`)
    return response
  }

  updateUser = async ({ token, ...userData }) => {
    const response = await this.post(`/user/${token}`, userData)
    return response
  }

  deleteUser = async ({ token }) => {
    const response = await this.post(`/user/${token}/delete`)
    return response
  }

  /* BIKES */

  getBikes = async ({ latitude, longitude, token }) => {
    const response = await this.get(`/bikes/${latitude}/${longitude}`, token)
    return response
  }

  requestBike = async ({ rubi_id, token }) => {
    const response = await this.post(`/bikes/${rubi_id}/request`, {}, { token })
    return response
  }

  returnBike = async ({ tripId, token }) => {
    const response = await this.post(`/bikes/trips/${tripId}`, {}, { token })
    return response
  }

  /* TRIPS */

  getHistory = async ({ token }) => {
    const response = await this.get('/bikes/trips', {
      token,
    })
    return response
  }
}

export default Api
