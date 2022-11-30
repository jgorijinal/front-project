<template>
<div class="w-full bg-white border-b border-b-zinc-200 px-2 py-1 dark:bg-zinc-800 dark:border-b-zinc-700 duration-300">
  <div class="flex items-center">
    <!--logo-->
    <img src="@/assets/vue.svg" class="h-4 cursor-pointer mr-2" alt="" @click="onClickLogo">
    <!--search-->
    <header-search-vue class="mr-1"></header-search-vue>
    <!--theme-->
    <header-theme-vue class="mr-1"></header-theme-vue>
    <!--my-->
    <header-my-vue></header-my-vue>
  </div>
</div>
</template>
<script setup>
import headerSearchVue from './header-search/index.vue'
import headerThemeVue from './header-theme.vue'
import headerMyVue from './header-my.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const onClickLogo = () => {
  router.push('/')
}
</script>
<style lang="scss" scoped>
  
</style>