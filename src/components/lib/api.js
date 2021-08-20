import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

export function createBinge(formdata) {
  return axios.post(`${baseUrl}/binge`, formdata, headers())
}


// * Auth requests

export function registerUser(formdata) {
  return axios.post(`${baseUrl}/register`, formdata)
} 

export function loginUser(formdata) {
  return axios.post(`${baseUrl}/login`, formdata)
}