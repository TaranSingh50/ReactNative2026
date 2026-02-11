import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'https://dummyjson.com', // using dummyjson login
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Optional: Response interceptor for debugging
axiosClient.interceptors.response.use(
  response => response,
  error => {
    console.log('AXIOS ERROR:', error.response)
    return Promise.reject(error)
  }
)