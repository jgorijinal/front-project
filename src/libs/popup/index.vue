<template>
  <div>
    <teleport to='body'>
      <!--蒙版-->
      <transition name="fade">
        <div v-if="modelValue" class="w-screen h-screen fixed z-40 left-0 top-0 bg-zinc-900/80"
          @click="emits('update:modelValue', false)"
        ></div>
      </transition>
      <!--弹出框-->
      <transition name="downToUp">
        <div v-if="modelValue" class="w-screen fixed  bottom-0 z-50 bg-white" v-bind="$attrs">
          <slot></slot>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<script setup>
import { watch } from 'vue'
import { useScrollLock } from '@vueuse/core'
const props = defineProps({
  modelValue: {
    type: Boolean,
  }
})
const emits = defineEmits(['update:modelValue'])

// 当popup 显示时 , 页面禁止滚动
const isLocked = useScrollLock(document.body)
watch(() => props.modelValue, (val) => {
  if (val) {
    isLocked.value = val
  } else {
    isLocked.value = false
  }
}, {
  immediate: true
})
</script>
<style lang="scss" scoped>
  .fade-enter-active,.fade-leave-active {
    transition: all 0.25s ease;
  }
  .fade-enter-from,.fade-leave-to {
    opacity: 0;
  }
  .downToUp-enter-active,.downToUp-leave-active {
    transition: all 0.25s ease;
  }
  .downToUp-enter-from,.downToUp-leave-to {
    transform: translateY(100%);
  }
</style>