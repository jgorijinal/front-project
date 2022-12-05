<template>
  <div id="containerId">
    <m-infinite-list v-model="isLoading" :isFinished="isFinished" @onLoad="getPexelsData">
      <m-waterfull :data="pexelsData" :column="isMobileTerminal ? 2 : 5" nodeKey="id" class="w-full px-1" :picturePreReading="false">
        <template v-slot="{item, width}">
          <item-vue :item="item" :width="width"></item-vue>
        </template>
      </m-waterfull>
    </m-infinite-list>
  </div>
</template>
<script setup>
import itemVue from './item.vue';
import { getPexelsList } from '@/api/pexels'
import { isMobileTerminal } from '@/utils/flexible';
import { ref, watch } from 'vue'
import { useStore } from 'vuex' 

const store = useStore()
// 图片列表
const pexelsData = ref([])

// 请求参数
const query = ref({
  page: 1,
  size: 20,
  categoryId: 'all'
})

// 当前页码
// const page = ref(1)
// 一页数量
// const size = ref(20)

// 总数据数
const total = ref(0)

// infinite-list 长列表组件相关逻辑
const isLoading = ref(false)
const isFinished = ref(false)

const getPexelsData = async () => {
  // 如果 isFinished 为 true , 则 return
  if (isFinished.value) {
    return 
  }

  isLoading.value = true

  const res = await getPexelsList(query.value)
  console.log(res.list)
  // 注意 : 要追加数据!
  pexelsData.value = [...pexelsData.value, ...res.list]
  total.value = res.total

  isLoading.value = false
  // 让 page 页码自增
  if (res.list.length) {
    query.value.page++
  }
  // 如果数据全部加载完, isFinished 设为 true
  if (total.value === pexelsData.value.length) {
    isFinished.value = true
  }
}
getPexelsData()

/**
 * 重置请求参数
*/
const resetQuery = (newQueryObj) => {
  pexelsData.value = []
  total.value = 0
  isLoading.value = false
  isFinished.value = false

  query.value = {...query.value, ...newQueryObj}
}

watch(() => store.getters.currentCategory, (currentCategory) => {
  // 重置参数
  resetQuery({
    page: 1,
    categoryId:currentCategory.id
  })
})

/**
 * 监听搜索内容项的变化
 */
watch(
  () => store.getters.searchText,
  (val) => {
    // 重置请求参数
    resetQuery({
      page: 1,
      searchText: val
    })
  }
)

</script>
<style lang="scss" scoped>
  
</style>