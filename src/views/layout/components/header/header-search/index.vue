<template>
  <div class="w-full">
    <m-search v-model="inputValue"
      @search="onSearchHandler"
    >
      <template #dropdown>
        <!--搜索提示-->
        <hint-vue :searchText="inputValue" @itemClick="hintClickHandler" v-if="inputValue"></hint-vue>
        <div v-else>
          <!--搜索历史-->
          <history-vue v-if="!inputValue" @itemClick="onSearchHandler"></history-vue>
          <!--热门精选-->
          <theme-vue v-if="!inputValue"></theme-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
import historyVue from './history.vue'
import themeVue from './theme.vue'
import { useStore } from 'vuex'
// 输入框的内容
const inputValue = ref('123')

const store = useStore()
// 点击了搜索按钮
// 或者 点击了搜索历史中的某一项  
const onSearchHandler = (item) => {
  if (inputValue.value === '') {
    return
  }
  inputValue.value = item
  console.log('开始搜索', inputValue.value)
  store.commit('search/addHistory', item )
}
// 监听点击了某一个搜索提示
const hintClickHandler = (item) => {
  console.log('开始搜索', inputValue.value)
  inputValue.value = item
  store.commit('search/addHistory', item )
}
</script>
<style lang="scss" scoped>
  
</style>