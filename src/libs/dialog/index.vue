<template>
  <div >
    <!--蒙版-->
    <transition name="fade">
      <div 
        v-if="modelValue" 
        class="fixed z-40  left-0 top-0 w-screen h-screen bg-zinc-900/80"
        @click="close"
        ></div>
    </transition>
    <!--内容区-->
    <transition name="up">
      <div
        v-if="modelValue"
        class="max-w-[80%] max-h-[80%] overflow-auto fixed top-[10%] left-[50%] translate-x-[-50%] z-50 
        px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:min-w-[35%]"
      >
        <!-- 标题 -->
        <div
          class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2"
          v-if="title"
        >
          {{ title }}
        </div>
        <!-- 内容 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          <slot />
        </div>
        <!-- footer 插槽-->
        <div class="flex justify-end" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default:false
  },
  close: {
    type:Function
  },
  title: {
    type:String
  }
})

const emits = defineEmits(['update:modelValue'])

// 关闭 dialog
const close = () => {
  emits('update:modelValue', false)
  if (props.close) {
    props.close()
  }
}

</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all 0.3s;
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>