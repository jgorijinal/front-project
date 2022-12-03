import { useIntersectionObserver } from '@vueuse/core'
export default {
  mounted(el) {
    //1.  拿到当前 img 标签的 src 属性
    const imgSrc = el.src
    // 2. 把 img 标签的 src 替换为本地地址，也可以替换为空或者一个透明的图片
    el.src = ''

    const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 到了可见范围内, 就去 src 赋值
        el.src = imgSrc
        // 加载完图片, 就取消监听
        stop()
      }
    })
  },
}