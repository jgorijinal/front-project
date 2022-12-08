<template>
  <transition name="down" @after-leave="destroyCallback">
    <div v-if="isVisible"
      :class="styles[props.type].containerClass"
      class="min-w-[420px] fixed top-[20px] left-[50%] translate-x-[-50%] z-50 flex 
        items-center px-3 py-1.5 rounded-sm border cursor-pointer"
    >
      <m-svg-icon 
        :name="styles[props.type].icon"
        class="h-1.5 w-1.5 mr-1.5"
        :fillClass="styles[props.type].fillClass"
      />
      <span class="text-sm" :class="styles[props.type].textClass">{{props.content}}</span>
    </div>
  </transition>
</template>
<script>
// 样式表
const styles = {
  // 成功
  success: {
    icon: 'success',
    fillClass: 'fill-success-300',
    textClass: 'text-success-300',
    containerClass:
      'bg-success-100 border-success-200  hover:shadow-lg hover:shadow-success-100'
  },
  // 警告
  warn: {
    icon: 'warn',
    fillClass: 'fill-warn-300',
    textClass: 'text-warn-300',
    containerClass:
      'bg-warn-100 border-warn-200  hover:shadow-lg hover:shadow-warn-100'
  },
  // 错误
  error: {
    icon: 'error',
    fillClass: 'fill-error-300',
    textClass: 'text-error-300',
    containerClass:
      'bg-error-100 border-error-200  hover:shadow-lg hover:shadow-error-100'
  }
}
</script>
<script setup>
import { onMounted, ref } from 'vue'
import mSvgIcon from '@/libs/svg-icon/index.vue'
const props = defineProps({
  // 风格
  type: {
    type: String,
    default:'success',
    validator(val) {
      const typeArr = Object.keys(styles)
      const result = typeArr.includes(val)
      if (!result) {
        throw new Error(`type 必须是 ${typeArr.join(',')} 中的一个值`)
      }
      return result
    }
  },
  content: {
    type:String
  },
  // 显示时长
  duration: {
    type: Number,
    default:3000
  },
  // 关闭时回调
  destroyCallback: {
    type: Function
  }
})
const isVisible = ref(false)
// 为了保证动画展示, 必须要 mounted 后显示, 因为使用 render 函数渲染的
onMounted(() => {
  isVisible.value = true
  // 几秒后, 关闭
  setTimeout(() => {
    isVisible.value = false
  }, Number(props.duration))
})
</script>
<style lang="scss" scoped>
  .down-enter-active , .down-leave-active {
    transition: all 0.25s ease;
    opacity: 1;
  } 
  .down-enter-from , .down-leave-to {
    opacity: 0;
    transform: translate(-50%, -100px);
  }
</style>