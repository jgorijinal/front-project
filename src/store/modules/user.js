import { loginUser, getProfile } from '@/api/sys'
import md5 from 'md5'
import { message } from '@/libs'
export default {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo:{}
    }
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken
    },
    setProfile(state, newUserInfo) {
      state.userInfo = newUserInfo
    }
  },
  actions: {
    // 登录 action
    async loginAction(context, data) {
      const { password } = data 
      
      const res = await loginUser({
        ...data,
        password: password ? md5(password) : ''
      })
      const token = res.token
      context.commit('setToken', token)
      
      // 调获取用户信息 action
      context.dispatch('getProfileAction')
    },
    // 获取用户信息 action
    async getProfileAction(context,) {
      const res = await getProfile()
      context.commit('setProfile', res)
      // 登录提示
      message('success', `欢迎你, ${ res.username }`)
    },
    // 退出登录
    logoutAction(context) {
      context.commit('setToken', '')
      context.commit('setUserInfo',{})
      // 重新刷新页面 , 因为对于前台项目而言, 登录/未登录的页面效果不同
      location.reload()
    }
  }
}