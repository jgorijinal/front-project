<template>
  <div class="sticky left-0 top-0 right-0">
    <ul class="relative flex overflow-x-auto overflow-hidden p-1 text-sm text-zinc-600">
      <li class="fixed top-0 right-[-1px] h-[46.8px] pr-1 flex items-center bg-white shadow-l-white"  >
        <m-svg-icon name="hamburger" class="w-1.5 h-1.5"/>
      </li>
      <li v-for="item in data" :key="item.id" class="shrink-0 px-1.5 py-0.5 duration-200 last:mr-4">
        {{item.name}}
      </li>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  data: {
    type: Array,
    default:()=>([])
  }
})
</script>
<style lang="scss" scoped>
  
</style>