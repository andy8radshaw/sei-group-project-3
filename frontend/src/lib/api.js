import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

const withHeaders = () => {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }
  }
}

// Hikes

export const getAllHikes = () => {
  return axios.get(`${baseUrl}/hikes`)
}

export const getSingleHike = id => {
  return axios.get(`${baseUrl}/hikes/${id}`)
}

export const createHike = formData => {
  return axios.post(`${baseUrl}/hikes`, formData, withHeaders())
}

export const deleteHike = id => {
  return axios.delete(`${baseUrl}/hikes/${id}`, withHeaders())
}

export const updateHike = (id, formData) => {
  return axios.put(`${baseUrl}/hikes/${id}`, formData, withHeaders())
}

export const reviewHike = (id, reviewData) => {
  return axios.post(`${baseUrl}/hikes/${id}/reviews`, reviewData, withHeaders())
}

export const deleteHikeReview = (id, reviewId) => {
  return axios.delete(`${baseUrl}/hikes/${id}/reviews/${reviewId}`, withHeaders())
}

export const addHikeToFavorites = (userId, hikeId) => {
  return axios.post(`/api/profiles/${userId}/favorites`, hikeId, withHeaders())
}


//User

export const registerUser = (formData) => {
  return axios.post(`${baseUrl}/register`, formData)
}

export const getCurrentUser = (userId) => {
  return axios.get(`/api/profiles/${userId}`, withHeaders())
}

