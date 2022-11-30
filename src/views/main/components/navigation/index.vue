<template>
  <div>
    <mobile-navigation-vue v-if="isMobileTerminal"/>
    <pc-navigation-vue v-else/>
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex';
import mobileNavigationVue from './mobile/index.vue'
import pcNavigationVue from './pc/index.vue'
// const categorys = ref([]) // 分类
// const getCategoryData = async () => {
//   const res = await getCategory()
//   categorys.value = res.categorys
//   // 补一下 '全部' 分类
//   categorys.value.unshift(ALL_CATEGORY_ITEM)
// }

// 发起获取分类请求 Vuex
const store = useStore()
store.dispatch('category/getCategoryData')
</script>
<style lang="scss" scoped>
  
</style>