<template>
  <div class="h-[80vh] py-1 flex flex-col">
    <h1 class="px-1 pb-1 font-bold text-xl">所有分类</h1>
    <ul class="overflow-y-scroll">
      <li v-for="item,index in categorys" :key="index"
        class="px-1 py-1 text-lg active:bg-zinc-200 duration-200"
        @click="onItemClick(index)"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  categorys: {
    type: Array,
    required: true
  }
})
const emits = defineEmits(['itemClick'])
const onItemClick = (index)=> {
  emits('itemClick', index)
}
</script>
