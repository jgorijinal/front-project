// 这个模块是不被缓存
import { ALL_CATEGORY_ITEM } from '@/constants'
export default {
  namespaced: true,
  state() {
    return {
      // navigation 的当前选中项
      currentCategory:  ALL_CATEGORY_ITEM 
    }
  },
  mutations: {
    setCurrentCategory(state, newCategoryObj) {
      state.currentCategory = newCategoryObj
    }
  }
}

