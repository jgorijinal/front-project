<template>
  <div class="w-full">
    <m-search v-model="inputValue">
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
import hintVue from './hint.vue';

const inputValue = ref('123')

// 监听点击了某一个搜索提示
const onSearchHandler = (item) => {
  inputValue.value = item
}
</script>
<style lang="scss" scoped>
  
</style>