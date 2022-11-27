<template>
  <div>
    <mobile-navigation-vue v-if="isMobileTerminal" :data="categorys"/>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'
import { getCategory } from '@/api/category'

const categorys = ref([]) // 分类
const getCategoryData = async () => {
  const res = await getCategory()
  categorys.value = res.categorys
  console.log(res.categorys)
}
getCategoryData()
</script>
<style lang="scss" scoped>
  
</style>