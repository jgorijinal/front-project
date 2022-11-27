import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = '719F9EBC312A0655'
  return config
}, (err) => {
  return Promise.reject(err)
})
export default service