import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'https://reqres.in/api', // public test API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})