import store from '@/store'
import router from '@/router'
import { message } from '@/libs';

router.beforeEach((to,from) => {
  if (store.getters.token) {
    if (to.name === 'login') {
      return '/'
    }
    return true
  } else {
    // 没有登录
    if (to.meta.user) { // 需要登录的页面
      message('warn', '请登录后再试')
      return '/login'
    } else {
      return true
    }
  }
})
