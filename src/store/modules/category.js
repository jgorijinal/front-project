import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM,CATEGORY_NOMAR_DATA } from '@/constants'
export default {
  namespaced: true,
  state() {
    return {
      categorys: CATEGORY_NOMAR_DATA
    }
  },
  mutations: {
    setCategorys(state, categorys) {
      state.categorys = [ALL_CATEGORY_ITEM,...categorys]
    }
  },
  actions: {
    async getCategoryData(context) {
      const res = await getCategory()
      context.commit('setCategorys', res.categorys)
    }
  }
}