export default {
  namespaced: true,
  state() {
    return {
      // 搜索历史
      histories:[]
    }
  },
  mutations: {
    /**
     * 添加历史记录到最前面
     */
    addHistory(state, newHistory) {
      // 找到旧的 index
      const oldHistoryIndex = state.histories.findIndex(item => item === newHistory)

      if (oldHistoryIndex >= 0) {
        // 先把旧的删除
        state.histories.splice(oldHistoryIndex, 1)
      }
      // 添加到最前面
      state.histories.unshift(newHistory)
    },
    /**
     * 删除指定的历史记录
     */
    deleteHistory(state, index) {
      state.histories.splice(index, 1)
    },
    /**
     * 删除所有历史记录
     */
    deleteAllHistory(state) {
      state.histories = []
    }
  }
}