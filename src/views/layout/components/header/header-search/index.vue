<template>
  <div class="w-full">
    <m-search v-model="inputValue"
      @search="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <hint-vue :searchText="inputValue" @itemClick="hintClickHandler"></hint-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'
import { useStore } from 'vuex'

// 输入框的内容
const inputValue = ref('123')

const store = useStore()
// 点击了搜索按钮
// TODO : 点击了搜索历史中的某一项  
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