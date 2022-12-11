<template>
  <div>
    <slot :duration="showTime"> 
      <!--就默认展示, 倒计时直接通过作用域插槽给外面了-->
      <p>{{showTime}}</p>
    </slot>
  </div>
</template>
<script>
const EMITS_CHANGE = 'change'
const EMITS_FINISH = 'finish'
// 间隔: 1秒钟
const INTERVAL_COUNT = 1000
</script>
<script setup>
import { ref, onUnmounted, watch, computed } from 'vue'
import dayjs from './utils'
const props = defineProps({
  // 倒计时 毫秒
  time: {
    type: Number,
    required: true
  },
  // 遵循 dayjs format 标准：https://day.js.org/docs/zh-CN/parse/string-format
  format: {
    type: String,
    default:'HH:mm:ss'
  }
})
const emits = defineEmits([EMITS_CHANGE,EMITS_FINISH])

let intervalId = null 
// 清除计时器
const close = () => {
  if(intervalId) {
    clearInterval(intervalId)
  }
}
// 总时长: 一开始被 watch 赋值到 props.time
const duration = ref(0)
// 开始计时
const start = () => {
  // 开始之前,先把之前的删掉
  close()
  intervalId = setInterval(() => {
    duration.value -= INTERVAL_COUNT
    emits(EMITS_CHANGE)
    if (duration.value <= 0) {
      // 倒计时结束
      emits(EMITS_FINISH)
      close()
    }
  }, INTERVAL_COUNT)
}
// 一开始 !
watch(() => props.time, (val) => {
  duration.value = val
  start()
}, {immediate: true})

/**
 * 组件销毁时，清理倒计时
 */
onUnmounted(() => {
  close()
})

// 格式化之后的时间
const showTime = computed(() => {
  return dayjs.duration(duration.value).format(props.format)
}) 
</script>
<style lang="scss" scoped>
  
</style>