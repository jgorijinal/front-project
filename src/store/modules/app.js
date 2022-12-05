// 这个模块是不被缓存
import { ALL_CATEGORY_ITEM } from '@/constants'
export default {
  namespaced: true,
  state() {
    return {
      // navigation 的当前选中项
      currentCategory: ALL_CATEGORY_ITEM,
      // 搜索文本
      searchText: ''
    }
  },
  mutations: {
    setCurrentCategory(state, newCategoryObj) {
      state.currentCategory = newCategoryObj
    },
    // 修改搜索文本
    setSearchText(state, newSearchText){
      state.searchText = newSearchText
    }
  }
}

