<template>
  <div class="w-full">
    <m-search v-model="inputValue"
      @search="onSearchHandler"
    >
      <template #dropdown>
        <div>
          <hint-vue :searchText="inputValue" @itemClick="onSearchHandler"></hint-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue'

// 输入框的内容
const inputValue = ref('123')

// 点击了搜索按钮
// 监听点击了某一个搜索提示
// TODO : 点击了搜索历史中的某一项  
const onSearchHandler = (item) => {
  inputValue.value = item
  console.log('开始搜索', inputValue.value)
}
</script>
<style lang="scss" scoped>
  
</style>