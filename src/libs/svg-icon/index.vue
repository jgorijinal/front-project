<template>
  <svg aria-hidden="true">
    <use :xlink:href="symbolId" :class="fillClass" :fill="color"></use>
  </svg>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  // 显示的 svg 图标名称 (不包含 #icon-)
  name: {
    type: String,
    required: true,
  },
  // 直接指定 svg 图标的颜色
  color: {
    type:String
  },
  // 通过 tailwind 指定 svg 颜色的类名
  fillClass: {
    type:String
  }
})

const symbolId = computed(() => {
  return `#icon-${props.name}`
})
</script>
<style lang="scss" scoped>
</style>