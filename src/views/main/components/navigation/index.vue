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
import { ALL_CATEGORY_ITEM } from '@/constants'

const categorys = ref([]) // 分类
const getCategoryData = async () => {
  const res = await getCategory()
  categorys.value = res.categorys
  // 补一下 '全部' 分类
  categorys.value.unshift(ALL_CATEGORY_ITEM)

}
getCategoryData()
</script>
<style lang="scss" scoped>
  
</style>