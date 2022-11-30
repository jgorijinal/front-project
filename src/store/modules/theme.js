// 主题
import { THEME_LIGHT } from '@/constants'
export default {
  namespaced: true,
  state() {
    return {
      themeType: THEME_LIGHT
    }
  },
  mutations: {
    // 更换主题
    setThemeType(state, themeType) {
      state.themeType = themeType
    }
  }
}