<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">  
    <!--具名插槽: 静态的内容-->
    <div>
      <slot name="reference" />
    </div>
    <!--需要展示的气泡框 transition 过度动画 -->
    <transition name="slide">
      <div v-if="isVisible" class="absolute z-20 bg-white p-1 border rounded-md">
        <!--默认插槽-->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script setup>
import { ref } from 'vue'
// 气泡框的显示/隐藏
const isVisible = ref(false)
// 鼠标进入事件
const onMouseenter = () => {
  isVisible.value = true
}
// 鼠标离开事件
const onMouseleave = () => { 
  isVisible.value = false
}
</script>
<style lang="scss" scoped>
.slide-enter-active,.slide-leave-active {
  transition:all 0.25s ease
}
.slide-enter-from,.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>