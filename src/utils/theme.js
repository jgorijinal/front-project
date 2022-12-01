// 监听主题的变化, 在html元素上面添加 dark 类名

import { watch } from 'vue'
import store from '@/store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

// 监听系统主题变化
let matchMedia
const watchSystemThemeChange = () => {
  // 仅需初始化一次
  if (matchMedia) return 
  matchMedia = window.matchMedia('(prefers-color-schema:dark)')
  // 监听主题变更
  matchMedia.onchange = () => {
    changeTheme(THEME_SYSTEM)
  }
}

const changeTheme = (newThemeType) => {
  let themeClassName = ''

  if (newThemeType === THEME_LIGHT) {
    themeClassName = 'light'
  } else if (newThemeType === THEME_DARK) {
    themeClassName = 'dark'
  } else if (newThemeType === THEME_SYSTEM) {
    watchSystemThemeChange()
    themeClassName = matchMedia.matches ? 'dark' : 'light'
  }
  // 修改 html 元素的 class
  document.querySelector('html').className = themeClassName
}

export default () => {
  watch(()=> store.getters.themeType, changeTheme , {
    immediate: true
  }) 
}