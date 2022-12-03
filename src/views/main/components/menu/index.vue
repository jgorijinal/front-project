<template>
  <div class="h-[80vh] py-1 flex flex-col">
    <h1 class="px-1 pb-1 font-bold text-xl">所有分类</h1>
    <ul class="overflow-y-scroll">
      <li v-for="item,index in $store.getters.categorys" :key="index"
        class="px-1 py-1 text-lg active:bg-zinc-200 duration-200"
        :class="{'bg-zinc-100':$store.getters.currentCategoryIndex === index}"
        @click="onItemClick(item)"
      >
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  // categorys: {
  //   type: Array,
  //   required: true
  // },
  // currentCategoryIndex: {
  //   type: Number,
  //   required:true
  // }
})
const emits = defineEmits(['itemClick'])
const onItemClick = (item)=> {
  emits('itemClick', item)
}
</script>
