import axios from 'axios'

export const axiosClient = axios.create({
  baseURL: 'https://reqres.in/api', // public test API
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

axiosClient.interceptors.request.use(
  async (config) => {
    // ⚠️ Replace this with real token from storage later
    const token = null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)