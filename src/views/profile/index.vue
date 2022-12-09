<template>
  <div>
    profile 个人资料
    <div>
      用户名 <m-input v-model="inputValue" :max="20"></m-input>
      {{inputValue}}
    </div>
  </div>
</template> 
<script setup>
import { ref } from 'vue';
const inputValue  = ref('')
</script>
<style lang="scss" scoped>
  
</style>