<template>
  <div>
    <template v-for="item,index in hintData" :key="index">
      <div 
        class="p-1 cursor-pointer text-base font-bold hover:bg-zinc-200 text-zinc-400
          rounded-sm duration-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        @click="onItemClick(item)"
        v-html="highlightText(item)"
        >
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
import { watchDebounced } from '@vueuse/core'


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
// 监听 props.searchText的变化 , 获取搜索提示
watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})
// 点击了某一个搜索提示
const onItemClick = (item) => {
  emits(EMITS_ITEM_CLICK, item)
}
// 高亮提示文字
const highlightText = (text) => {
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-400">${props.searchText}</span>`
   // 构建正则表达式，从《显示文本中》找出与《用户输入文本相同的内容》，使用《高亮标签》进行替换
  const reg = new RegExp(props.searchText, 'gi')  
  return text.replace(reg, highlightStr) 
}
</script>
<style lang="scss" scoped>
  
</style>