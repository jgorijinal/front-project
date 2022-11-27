import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = '719F9EBC312A0655'
  return config
}, (err) => {
  return Promise.reject(err)
})

// 响应拦截器
service.interceptors.response.use(res => {
  const { success, message, data } = res.data
  if (success) {
    return data
  } else {
    return Promise.reject(new Error(message))
  }
}, (err) => {
  return Promise.reject(err)
})
export default service