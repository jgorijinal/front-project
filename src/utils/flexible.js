import { computed } from 'vue'
import { PC_DEVICE_WIDTH } from '../constants'

// 判断当前是否为移动设备, 判断依据为 屏幕的宽度是否小于指定值(1280)
export const isMobileTerminal = computed(() => {
  return document.documentElement.clientWidth < PC_DEVICE_WIDTH
})


/**
 * 实际开发用这个代码
 * 判断当前是否为移动设备
 */
//  export const isMobileTerminal = computed(() => {
//   return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
//      navigator.userAgent
//   )
// })
