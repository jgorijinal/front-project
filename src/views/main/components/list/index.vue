<template>
  <div id="containerId">
    <m-waterfull :data="pexelsData" :column="isMobileTerminal ? 2 : 5" nodeKey="id" class="w-full px-1" :picturePreReading="false">
      <template v-slot="{item, width}">
        <item-vue :item="item" :width="width"></item-vue>
      </template>
      </m-waterfull>
    </div>
</template>
<script setup>
import itemVue from './item.vue';
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible';
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