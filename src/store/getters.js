export default {
  // navigation 的全部的分类
  categorys: state => state.category.categorys,
  // 主题
  themeType: state => state.theme.themeType,
  // navigation 的当前选中项
  currentCategory: state => state.app.currentCategory,
  // navigation 的当前选中项的索引 index
  currentCategoryIndex: (state, getters) => {
    return getters.categorys.findIndex(category => {
      return category.id === getters.currentCategory.id
    })
  },
  // 搜素历史
  histories: state => state.search.histories,
  // 搜索文本
  searchText : state => state.app.searchText
}