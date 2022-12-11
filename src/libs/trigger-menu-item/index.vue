<template>
  <div class="flex flex-col items-center py-2 px-2" @click="clickItem">
    <m-svg-icon :name="icon" :fillClass="iconClass" class="w-2 h-2"></m-svg-icon>
    <span :class="textClass" class="text-sm mt-[4px] whitespace-nowrap"> 
      <slot />
    </span>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({
  // 图标
  icon: {
    type: String,
    required: true
  },
  // icon 的类
  iconClass: {
    type: String
  },
  // 字体 类
  textClass: {
    type: String,
    default:'text-zinc-900 dark:text-zinc-200'
  },
  // 跳转到哪里
  to: {
    type:String
  }
})
const router = useRouter()
const clickItem = () => {
  if (!props.to) {
    return
  }
  // 跳转
  router.push(props.to)
}
</script>
