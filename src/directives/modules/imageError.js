export default {
  mounted(el, binding) {
    el.onerror = () => {
      console.log('图片出错了')
      el.src = binding.value
    }
  }
}