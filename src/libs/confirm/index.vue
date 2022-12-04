<template>
  <div>
    <!--蒙版-->
    <transition name="fade">
      <div
        v-if="isVisible" 
        class="fixed z-40 left-0 top-0 w-screen h-screen bg-zinc-900/80"
        @click="close"></div>
    </transition>
    <!--对话框-->
    <transition name="up">
      <div
        v-if="isVisible" 
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50
        px-2 py-1.5 rounded-sm border dark:border-zinc-600 bg-white dark:bg-zinc-800 xl:w-[35%]"
        >
        <!--标题-->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}标题
        </div>
        <!--内容-->
        <div  class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{content}}内容
        </div>
        <!--按钮-->
        <div class="flex justify-end">
          <m-button type="info" class="mr-2" @click="onCancelClick">{{cancelText}}</m-button>
          <m-button type="primary" @click="onConfirmClick">{{confirmText}}</m-button>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
import mButton from '@/libs/button/index.vue'
import { ref,onMounted } from 'vue'
const props = defineProps({
  // 标题
  title: {
    type:String
  },
  // 描述
  content: {
    type: String,
    required:true
  },
  //取消按钮的文本
  cancelText: {
    type: String,
    default: '取消'
  },
  confirmText: {
    type: String,
    default:'确定'
  },
  // 取消按钮事件
  cancelHandler: {
    type: Function
  },
  // 确定按钮事件
  confirmHandler: {
    type:Function
  },
  // 关闭 confirm 的回调
  close: {
    type:Function
  }
})
// confirm 组件显示/隐藏
const isVisible = ref(false)

// ????? 为啥这样做 ? 
onMounted(() => {
  isVisible.value = true
})
// 点击取消按钮
const onCancelClick = () => {
  console.log('取消')
  if (props.cancelHandler) {
    props.cancelHandler()
  }
  close()
}
// 点击确定按钮
const onConfirmClick = () => {
  if (props.confirmHandler) {
    props.confirmHandler()
  }
  close()
}
// 过渡动画时长
const duration = '0.5s'
// confirm 关闭, 需保留动画执行时长
const close = () => {
  isVisible.value = false
  // ????? 为啥这样做 ???????????????
  // 延迟一段时间进行关闭回调 , 因为要等待动画完全关闭之后, 在去触发 props.close()
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseInt(duration.replace('0.','').replace('s','')) * 100 )
}
</script>
<style lang="scss" scoped>
.fade-enter-active , .fade-leave-active {
  transition: all v-bind(duration);
}
.fade-enter-from , .fade-leave-to {
  opacity: 0;
}

.up-enter-active , .up-leave-active {
  transition: all v-bind(duration);
}
.up-enter-from , .up-leave-to {
  opacity: 0;
  // transform: translate3d(-50%, 100px, 0);
  transform: translate(-50%,100px);
}


</style>