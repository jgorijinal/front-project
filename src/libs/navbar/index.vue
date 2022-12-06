<template>
  <div 
    class="flex items-center h-5 w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky left-0 top-0' : 'relative']"
    >
    <!--左-->
    <div class="absolute left-0 top-0 h-full w-5 flex items-center justify-center text-base"
      @click="onClickLeft"  
    >
      <slot name="left">
        <m-svg-icon
          name="back"
          class="w-2 h-2"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        />
      </slot>
    </div>
    <!--中-->
    <div class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200">
      <slot name="center"></slot>
    </div>
    <!--右-->
    <div class="absolute right-0 top-0 h-full flex items-center w-5 justify-center text-base"
      @click="onClickRight"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  // 是否吸顶
  sticky: {
    type:Boolean
  }
})
const emits = defineEmits(['clickLeft', 'clickRight'])
const router = useRouter()
const onClickLeft = () => {
  console.log('点击了 左测区域')
  emits('clickLeft')
  // 后退
  router.back()
}

const onClickRight = () => {
  console.log('点击了 右测区域')
  emits('clickRight')
}
</script>
<style lang="scss" scoped>
  
</style>