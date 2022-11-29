<template>
  <div class="w-full">
    <m-search v-model="inputValue"></m-search>
    {{inputValue}}
  </div>
</template>
<script setup>
import { ref } from 'vue'
const inputValue = ref('123')
</script>
<style lang="scss" scoped>
  
</style>