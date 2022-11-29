<template>
  <div class="relative" @mouseenter="onMouseenter" @mouseleave="onMouseleave">  
    <!--具名插槽: 静态的内容-->
    <div ref="referenceRef">
      <slot name="reference" />
    </div>
    <!--需要展示的气泡框 transition 过度动画 -->
    <transition name="slide">
      <div ref="contentRef" v-if="isVisible" class="absolute z-20 bg-white p-1 border rounded-md" :style="popoverStyle">
        <!--默认插槽-->
        <slot></slot>
      </div>
    </transition>
  </div>
</template>
<script>
// 4种位置
const allPlacements = [
  'top-left',
  'top-right',
  'bottom-left',
  'bottom-right'
]
</script>
<script setup>
import { ref, watch, nextTick } from 'vue'
const props = defineProps({
  placement: {
    type: String,
    default: 'bottom-left',
    validator(value) {
      const result = allPlacements.includes(value)
      if (!result) {
        throw new Error(`placement 的值必须是 ${allPlacements.join(',')}中的一个值`)
      }
      return result
    }
  }
})
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

// reference 的 dom
const referenceRef = ref(null)
// popover 的 dom
const contentRef = ref(null)
// 获取元素的宽高
const useElementSize = (el) => {
  if (!el) return 
  console.log(el)
  return {
    width: el.getBoundingClientRect().width,
    height:el.offsetHeight
  }
}
// popover 的位置样式
const popoverStyle = ref({
  top:0,
  left:0 
})

// 监听 isVisible 的变化, 改变位置样式
watch(isVisible, (newValue) =>{
  if (!newValue) return 
  nextTick(() => {
    console.log(useElementSize(contentRef.value).width)
    console.log(useElementSize(referenceRef.value).width)
    if (props.placement === 'top-left') {
      popoverStyle.value = {
        top: '0px',
        left: `-${useElementSize(contentRef.value).width}px`
      }
    } else if (props.placement === 'top-right') {
      popoverStyle.value = {
        top: '0px',
        left: `${useElementSize(referenceRef.value).width}px`
      }
    } else if (props.placement === 'bottom-left') {
      popoverStyle.value.top = '100%'
      popoverStyle.value.left = `-${useElementSize(contentRef.value).width}px`
    } else if (props.placement === 'bottom-right') {
      popoverStyle.value = {
        top: '100%',
        left: `${useElementSize(referenceRef.value).width}px`
      }
    }
  }
  )
})
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