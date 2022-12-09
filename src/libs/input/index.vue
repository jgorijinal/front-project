<template>
  <div class="relative">
    <input type="text" 
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100
        dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      v-if="(type === TYPE_TEXT)" :maxlength="max" :value="modelValue" @input="onInput($event)">
    <textarea 
      class="border-gray-200 dark:border-zinc-600 dark:bg-zinc-800 duration-100 
      dark:text-zinc-400 border-[1px] outline-0 py-0.5 px-1 text-sm rounded-sm focus:border-blue-400 w-full"
      v-else-if="(type === TYPE_TEXTAREA)" cols="30" rows="10" :maxlength="max" :value="modelValue"  @input="onInput($event)"></textarea>
    <!--最大字符提示-->
    <span v-if="max" class="absolute right-1 bottom-0.5 text-zinc-400 text-xs">{{currentLength}}/{{max}}</span>
  </div>
</template>
<script>
const TYPE_TEXT = 'text'
const TYPE_TEXTAREA = 'textarea'
</script>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  modelValue: {
    type:String
  },
  // 风格 : text / textarea
  type: {
    type: String,
    default: TYPE_TEXT,
    validator(value) {
      const arr = [TYPE_TEXT, TYPE_TEXTAREA]
      const result = arr.includes(value)
      if (!result) {
        throw new Error(`input 组件的 type 必须传如 ${arr.join(',')} 中的一个值`)
      }
      return result
    }
  },
  // 最大字符数
  max: {
    type:[String , Number]
  }
})

const emits = defineEmits(['update:modelValue'])
// 目前输入框的字符数(计算属性)
const currentLength = computed(() => {
  return props.modelValue.length
})

const onInput = ($event) => {
  emits('update:modelValue', $event.target.value)
}
</script>
