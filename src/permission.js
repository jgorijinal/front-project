import store from '@/store'
import router from '@/router'
import { message } from '@/libs';

router.beforeEach((to,from) => {
  if (store.getters.token) {
    // 已登录
    return true
  } else {
    // 没有登录
    if (to.meta.user) { // 需要登录的页面
      message('warn', '访问失败, 请先登录')
      return '/login'
    } else {
      return true
    }
  }
})
