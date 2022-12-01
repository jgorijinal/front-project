<template>
  <div>
    <template v-for="item in pexelsData" :key="item.id">
      <item-vue :item="item"></item-vue>
    </template>
  </div>
</template>
<script setup>
import itemVue from './item.vue';
import { getPexelsList } from '@/api/pexels'
import { ref } from 'vue'
// 图片列表
const pexelsData = ref([])
// 当前页码
const page = ref(1)
// 一页数量
const size = ref(20)
// 总数据数
const total = ref(0)
const getPexelsData = async () => {
  const res = await getPexelsList({
    page: page.value,
    size:size.value
  })
  console.log(res.list)
  pexelsData.value = res.list
  total.value = res.total
}
getPexelsData()
</script>
<style lang="scss" scoped>
  
</style>