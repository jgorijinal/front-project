// 监听主题的变化, 在html元素上面添加 dark 类名

import { watch } from 'vue'
import store from '@/store'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

export default () => {
  watch(()=> store.getters.themeType, (newThemeType) => {
    let themeClassName = ''

    if (newThemeType === THEME_LIGHT) {
      themeClassName = 'light'
    } else if (newThemeType === THEME_DARK) {
      themeClassName = 'dark'
    }
    // 修改 html 元素的 class
    document.querySelector('html').className = themeClassName
  }, {
    immediate: true
  }) 
}