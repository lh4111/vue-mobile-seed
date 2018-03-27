import http from '../http'

export default {
  userInfo: (id) => {
    return http.get('/user/info', { id })
  }
}
