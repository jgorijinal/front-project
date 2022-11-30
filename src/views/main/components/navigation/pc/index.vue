<template>
  <div class="bg-white sticky top-0 left-0 w-full z-10 dark:bg-zinc-800 duration-300">
    <ul
      class="w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-200 overflow-hidden mx-auto"
      :class="{'h-[56px]':!isOpened,'h-[206px]':isOpened}"
    >
      <!-- lg 下展开箭头 -->
      <div
        class="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-600"
        @click="openHandler"
      >
        <m-svg-icon
          name="unfold"
          class="w-1 h-1"
          fillClass="fill-zinc-900 dark:fill-zinc-200"
        ></m-svg-icon>
      </div>
      <!-- category item -->
      <li
        v-for="item,index in $store.getters.categorys"
        :key="item.id"
        @click="onClickItem(index)"
        :class="{'bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-100':currentCategoryIndex === index}"
        class="shrink-0 px-1.5 py-0 z-10 duration-200 last:mr-4 text-zinc-900  dark:text-zinc-500 text-base 
        font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900 dark:hover:text-zinc-200 rounded mr-1 mb-1"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue' 
// 控制 展开/收缩
const isOpened = ref(false)
// 点击控制展开/伸缩
const openHandler = () => {
  isOpened.value = !isOpened.value
}

// 选中
const currentCategoryIndex = ref(0)
// 点击某一个分类
const onClickItem = (index) => {
  currentCategoryIndex.value = index
}
</script>
<style lang="scss" scoped>
  
</style>