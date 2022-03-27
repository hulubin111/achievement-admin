import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// request interceptor
request.interceptors.request.use(
  config => {
    nprogress.start()
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
    nprogress.done()
    return res
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
