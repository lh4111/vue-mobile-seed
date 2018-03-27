import axios from 'axios'
import { API_BASE_URL } from '../config'

axios.defaults.timeout = 10000
axios.defaults.baseURL = API_BASE_URL

axios.get = (url, params) => {
  return axios.request({
    url: url,
    method: 'get',
    params: params || {}
  })
}
// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers['Token'] = localStorage.getItem('token')
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    const { code, data } = response.data
    if (code) {
      if (code === 10001) {
        localStorage.setItem('token', '')
        setTimeout(() => (location.href = '/'), 1500)
      }
      return Promise.reject(response.data)
    } else {
      return data
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default axios
