<template>
  <div class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500" >
    <!--导航栏 pc/移动端-->
    <navigation-vue></navigation-vue>
    <!--图片列表-->
    <div class="max-w-screen-xl mx-auto m1 xl:mt-4">
      <list-vue></list-vue>
    </div>
  </div>
</template>
<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
</script>
<style lang="scss" scoped>
  
</style>