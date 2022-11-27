<template>
  <div>
    <mobile-navigation-vue v-if="isMobileTerminal" />
  </div>
</template>
<script setup>
import { isMobileTerminal } from '@/utils/flexible'
import mobileNavigationVue from './mobile/index.vue'

import { getCategory } from '@/api/category'
const getCategoryData = async () => {
  const res = await getCategory()
  console.log(res)
}
getCategoryData()
</script>
<style lang="scss" scoped>
  
</style>