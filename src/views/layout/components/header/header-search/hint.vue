<template>
  <div>
    <template v-for="item,index in hintData" :key="index">
      <div 
        class="p-1 cursor-pointer text-base font-bold hover:bg-zinc-200 rounded-sm duration-100"
        @click="onItemClick(item)"
        >
        {{item}}
      </div>
    </template>
  </div>
</template>
<script>
const EMITS_ITEM_CLICK = 'itemClick'
</script>
<script setup>
import { getHint } from '@/api/pexels'
import { ref, watch } from 'vue';

const props = defineProps({
  // 搜索内容
  searchText: {
    type: String,
  }
})
const emits = defineEmits([EMITS_ITEM_CLICK])

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

// 点击了某一个搜索提示
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}

</script>
<style lang="scss" scoped>
  
</style>