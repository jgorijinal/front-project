<template>
  <button 
    class="text-sm text-center rounded duration-150 flex justify-center items-center"
    :class="[
    typeEnum[type],
    sizeEnum[sizeKey].button,
    { 'active:scale-105': isActiveAnim }]"
    @click.stop="onClickButton"
  >
    <!--展示 loading 动画-->
    <m-svg-icon name="loading" v-if="loading" class="w-2 h-2 animate-spin mr-1"></m-svg-icon>
    <!--icon 按钮-->
    <m-svg-icon 
      v-if="icon"
      :name="icon"
      :fillClass="iconClass"
      :color="iconColor"
      :class="sizeEnum[sizeKey].icon"
      class="m-auto"
    />
    <!-- 或者 text 按钮-->
    <slot v-else></slot>
  </button>
</template>
<script>
// type 可选项: 按钮风格 primary main info
const typeEnum = { // primary , main , info
  primary: 'text-white  bg-zinc-800 hover:bg-zinc-900 active:bg-zinc-800 dark:bg-zinc-600 dark:hover:bg-zinc-700', // 字体颜色,背景颜色, 点击时北京颜色
  main: 'text-white  bg-main hover:bg-hover-main active:bg-main dark:bg-zinc-900 dark:hover:bg-zinc-800',
  info: 'text-zinc-800 bg-zinc-200 hover:bg-zinc-300 active:bg-zinc-200 dark:bg-zinc-600 dark:hover:bg-zinc-700'
}
// size 可选项: 按钮大小可选项 default small , 还要区分 文字按钮和图标按钮
const sizeEnum = { // default small,  (icon-default , icon-small)
  default: { 
    button: 'w-8 h-4 text-base', // 按钮尺寸, 字体尺寸
    icon: ''
  },
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
</script>
<script setup>
import { computed } from 'vue';
import mSvgIcon from '../svg-icon/index.vue'
const props = defineProps({
  // icon图标名称
  icon: {
    type:String
  },
  // icon 图标颜色
  iconColor: {
    type:String
  },
  // icon 图标类名 (匹配tailwind )
  iconClass: {
    type:String
  },
  // 按钮风格 type
  type: {
    type: String,
    default: 'primary',
    validator(value) {
      const keys = Object.keys(typeEnum)
      const result = keys.includes(value)
      if (!result) {
        throw new Error(`你的 type 必须是 ${keys.join(',')} 中的的一个值`)
      }
      return result
    }
  },
  // size 按钮大小可选项
  size: {
    type: String,
    default: 'default',
    validator(value) {
      const keys = Object.keys(sizeEnum).filter(key => !key.includes('icon-'))
      const result = keys.includes(value)
      if (!result) {
        throw new Error(`你的 size 必须是 ${keys.join(',')} 中的的一个值`)
      }
      return result
    }
  },
  // 按钮点击时是否需要动画
  isActiveAnim: {
    type: Boolean,
    default:true
  },
  // 加载状态
  loading: {
    type: Boolean,
    default:false
  }
})

// 如果props 传了 icon 图标, 说明是 icon 按钮
// 所以它的 大小 必须要加上 'icon-'
// 处理大小的 key
const sizeKey = computed(() => {
  return props.icon ? 'icon-'+ props.size : props.size
}) 

const emits = defineEmits(['click'])
// 点击按钮 
const onClickButton = () => {
  if (props.loading) {
    return 
  }  
  emits('click')
}
</script>
<style lang="scss" scoped>
  
</style>