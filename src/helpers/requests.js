import axios from 'axios'

import { API_SECRET, API_URI } from '../constants'

const request = async req => {
  try {
    const res = await req
    return res.data
  } catch (err) {
    if (!err.response)
      throw Object({
        message: 'El servidor no responde, por favor intenta más tarde',
      })
    throw Object(err.response.data)
  }
}

export const get = async (endpoint, token = '') => {
  return request(
    axios.get(`${API_URI}${endpoint}`, {
      headers: { Authorization: token, Secret: API_SECRET },
    })
  )
}

export const destroy = async endpoint =>
  request(
    axios.delete(`${API_URI}${endpoint}`, {
      headers: { Secret: API_SECRET },
    })
  )

export const post = async (endpoint, body, token = '') =>
  request(
    axios.post(`${API_URI}${endpoint}`, body, {
      headers: { Authorization: token, Secret: API_SECRET },
    })
  )

export const patch = async (endpoint, body, token = '') =>
  request(
    axios.patch(`${API_URI}${endpoint}`, body, {
      headers: { Authorization: token, Secret: API_SECRET },
    })
  )
