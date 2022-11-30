import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'
export default {
  namespaced: true,
  state() {
    return {
      category: [ALL_CATEGORY_ITEM]
    }
  },
  mutations: {
    setCategorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM, ...categorys]
    }
  },
  actions: {
    async getCategoryData(context) {
      const res = await getCategory()
      context.commit('setCategorys', res.categorys)
    }
  }
}