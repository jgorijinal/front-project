import store from '@/store'
import router from '@/router'
import { message } from '@/libs';

router.beforeEach((to,from) => {
  if (store.getters.token) {
    // 已登录
    // if (to.name === 'login' || 'register') {
    
    // }
  } else {
    // 没有登录
    if (to.meta.user) { // 需要登录的页面
      // message('warn', '请先登录后再试')
      return '/login'
    } else {
      return true
    }
  }
})
