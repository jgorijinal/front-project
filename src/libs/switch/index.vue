<template>
  <button @click="toggle" :class="{activated: currentValue === activeValue}">
    <span></span>
  </button>
</template>
<script>
// switch 值改变 @change 事件
const EMITS_CHANGE = 'change'
const EMITS_UPDATE_MODEL_VALUE = 'update:modelValue'
</script>
<script setup>
import { ref, watch} from 'vue'
const props = defineProps({
  modelValue: {
    type: [String, Number, Boolean]
  },
  // 	switch 状态为 on 时的值
  activeValue: {
    type: [String, Number, Boolean],
    default:true
  },
  // switch 状态为 off 时的值
  inactiveValue: {
    type: [String, Number, Boolean],
    default:false
  },
   // 	switch 状态为 on 时北京颜色
  activeColor: {
    type: String,
    default:'#2d8df0'
  },
  // 	switch 状态为 off 时背景颜色
  inactiveColor: {
    type: String,
    default:'#cccccc'
  }
})

const emits = defineEmits([EMITS_CHANGE, EMITS_UPDATE_MODEL_VALUE])
// 当前的值
const currentValue = ref(null)
watch(() => props.modelValue, (val) => {
  currentValue.value = val
}, {immediate:true})
// 点击切换
const toggle = () => {
  if (currentValue.value === props.activeValue) {
    emits(EMITS_UPDATE_MODEL_VALUE, props.inactiveValue)
    emits(EMITS_CHANGE, props.inactiveValue)
  }
  if (currentValue.value === props.inactiveValue) {
    emits(EMITS_UPDATE_MODEL_VALUE, props.activeValue)
    emits(EMITS_CHANGE, props.activeValue)
  }
} 
</script>
<style lang="scss" scoped>
$h-button: 22px;
$w-button: 44px;
$h-circle: 18px;
button {
  transition: all 0.25s;
  width: $w-button;
  height: $h-button;
  background: v-bind(inactiveColor);
  position: relative;
  outline: none;
  border: none;
  border-radius: $h-button/2;
  span {
    display: inline-block;    // !!
    width: $h-circle;
    height: $h-circle;
    background: white;
    position: absolute;
    left: 2px;
    top: 2px;
    border-radius: $h-circle/2;
    transition: all 0.25s ease;
  }
  &:hover {
    cursor: pointer;
  }
  &:active {
    span {
      width: $h-circle + 6px;
    }
  }
  &.activated {
    background: v-bind(activeColor);
    span {
      left: calc(100% - #{$h-circle} - 2px); // 技巧 calc()
    }
    &:active {
      span {
        transform: translateX(-6px)
      }
    }
  }
}
</style>