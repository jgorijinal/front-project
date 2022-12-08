import { loginUser } from '@/api/sys'
import md5 from 'md5'
export default {
  namespaced: true,
  state() {
    return {
      token:''
    }
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    }
  },
  actions: {
    // 登录
    async loginAction(context, data) {
      const { password } = data 
      
      const res = await loginUser({
        ...data,
        password: password ? md5(password) : ''
      })
      const token = res.token
      context.commit('setToken', token)
    }
  }
}