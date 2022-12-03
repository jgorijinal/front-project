<template >
  <div>
    infinite-list
  </div>
</template>
<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  isFinished: {
    type: Boolean,
    default:false
  }
})
const emits = defineEmits(['update:modelValue', 'onLoad'])
</script>
<style lang="scss" scoped>  
</style>