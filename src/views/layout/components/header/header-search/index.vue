<template>
  <div class="w-full">
    <m-search v-model="inputValue">
      <template #dropdown>
        <div>
          <hint-vue :searchText="inputValue"></hint-vue>
        </div>
      </template>
    </m-search>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import hintVue from './hint.vue';

const inputValue = ref('123')
</script>
<style lang="scss" scoped>
  
</style>