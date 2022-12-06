<template>
  <div class="fixed left-0 top-0 w-screen h-screen bg-slate-500 z-20">
    {{id}}
  </div>
</template>
<script setup>
const props = defineProps({
  // 图片的 id
  id: {
    type: String,
  }
})
</script>
<style lang="scss" scoped>
  
</style>