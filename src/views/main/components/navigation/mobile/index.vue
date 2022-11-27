<template>
  <div class="sticky left-0 top-0 right-0">
    <ul ref="ulRef" class="relative flex overflow-x-auto overflow-hidden p-1 text-xs text-zinc-600">
      <!--slider 滑块-->
      <li  ref="sliderRef" class="absolute h-[22px] bg-zinc-700 rounded-lg duration-200" :style="sliderStyle" ></li>
      <!--汉堡-->
      <li class="fixed z-20 top-0 right-[-1px] h-[42.9px] pr-1 flex items-center bg-white shadow-l-white"  >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"/>
      </li>
      <!--分类 item-->
      <li @click="onItemClick(index)" :ref="setItemRef" v-for="item,index in data" :key="item.id" 
        class="shrink-0 px-1.5 py-0.5 duration-200 last:mr-4 z-10"
        :class="{'text-zinc-200': currentCategoryIndex === index}"
        >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, watch,onBeforeUpdate } from 'vue'
import { useScroll } from '@vueuse/core';
const props = defineProps({
  data: {
    type: Array,
    default:()=>([])
  }
})
// slider 的样式:
const sliderStyle = ref({
  width: '60px',
  transform: 'translateX(0px)'
})
// 当前分类的 index
const currentCategoryIndex = ref(0)
// 切换 index
const onItemClick = (index) => {
  currentCategoryIndex.value = index
}
// 所有 category 的 el 数组
let itemRefs = []
const setItemRef = (el) => {
  if (el) {
    itemRefs.push(el)
  }
}
onBeforeUpdate(() => { // 数据变化之后, dom 变化之前
  itemRefs = []
})
const ulRef = ref(null)
const { x: ulScrollLeft } = useScroll(ulRef)

// 监听 currentCategoryIndex 的变化, 把对应元素的 width 和 left 赋值给slider的样式
watch(currentCategoryIndex, (newIndex) => {
  const currentCategoryEl = itemRefs[newIndex]
  const { width, left } = currentCategoryEl.getBoundingClientRect()
  // 改样式
  sliderStyle.value = {
    width: width + 'px',
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`
  }
})
</script>
<style lang="scss" scoped>
  
</style>