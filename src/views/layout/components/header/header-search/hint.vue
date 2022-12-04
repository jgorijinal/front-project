<template>
  <div>
    <template v-for="item,index in hintData" :key="index">
      <div class="p-1 cursor-pointer text-base font-bold hover:bg-zinc-200 rounded-sm duration-100">{{item}}</div>
    </template>
  </div>
</template>
<script setup>
import { getHint } from '@/api/pexels'
import { ref, watch } from 'vue';

const props = defineProps({
  // 搜索内容
  searchText: {
    type: String,
  }
})
const hintData = ref([]) // 搜索提示 
const total = ref(0) // 总提示数

// 获取搜索提示
const getHintData = async () => {
  const res = await getHint(props.searchText)
  hintData.value = res.result
  total.value = res.total
}

watch(() => props.searchText, getHintData, {
  immediate:true
})


</script>
<style lang="scss" scoped>
  
</style>