<template >
  <div>
    <!--列表内容-->
    <slot></slot>
    <div ref="loadingRef">
      <!--加载图标-->
      <m-svg-icon
        v-if="!isFinished"
        name="infinite-load"
        class="mx-auto w-4 h-4 animate-spin mb-1"/>
      <!--没有更多数据了-->
      <p v-if="isFinished" class="text-center text-base text-zinc-400 pb-1">数据已经全部加载完成</p>
    </div>
  </div>
</template>
<script setup>
import { ref} from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
const props = defineProps({
  // 是否处于加载状态
  modelValue: {
    type: Boolean,
    required: true
  },
  // 数据是否全部加载完成 
  isFinished: {
    type: Boolean,
    default:false
  }
})
const emits = defineEmits(['update:modelValue', 'onLoad'])

const loadingRef = ref(null)
useIntersectionObserver(
    loadingRef,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting && !props.modelValue && !props.isFinished) {
        // 加载状态设为 true
        emits('update:modelValue', true)
        // 说明已经到达了底部, 触发 onLoad 事件
        emits('onLoad')
      }
    },
)
</script>
<style lang="scss" scoped>  
</style>