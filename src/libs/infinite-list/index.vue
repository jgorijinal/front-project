<template >
  <div>
    <!--列表内容-->
    <slot></slot>
    <!--加载图标-->
    <m-svg-icon
      v-if="!isFinished"
      name="infinite-load"
      class="mx-auto w-4 h-4 animate-spin"
    >
    </m-svg-icon>
    <!--没有更多数据了-->
    <p v-if="isFinished" class="text-center text-base text-zinc-400 pb-1">数据已经全部加载完成</p>
  </div>
</template>
<script setup>
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

</script>
<style lang="scss" scoped>  
</style>