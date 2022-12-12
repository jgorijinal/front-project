export default {
  mounted(el, binding) {
    el.onerror = () => {
      console.log('出错了')
      el.src = binding.value
    }
  }
}