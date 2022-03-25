import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// request interceptor
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
request.interceptors.response.use(

  response => {
    const res = response.data

    if (response.status !== 200) {
      return Promise.reject(new Error('faile'))
    }
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
