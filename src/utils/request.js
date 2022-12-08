import axios from 'axios'
import store from '@/store'
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = '719F9EBC312A0655'
  if (store.getters.token) {
    // 如果 token 存在, 纳米请求头设置 token
    config.headers.Authorization = 'Bearer ' + store.getters.token
  }
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
  // token 超时
  if (err.response &&
      err.response.data &&
      err.response.data.code
    ) {
    store.dispatch('user/logoutAction')
  }
  return Promise.reject(err)
})
export default service