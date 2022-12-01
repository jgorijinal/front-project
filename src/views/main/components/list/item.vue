<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 h-[400px] rounded  pb-1 w-[230px]">
    <div class="relative rounded-md">
      <!--图片-->
      <img :src="item.photo" class="rounded" alt="">
      <!--遮罩层-->
      <div class="hidden xl:block opacity-0 hover:opacity-90 duration-300 hover:bg-zinc-800/70
        absolute z-10 left-0 top-0 w-full h-full rounded">
        <!--一些按钮-->
        <m-button class="absolute top-1.5 left-1.5" type="main">分享</m-button>
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
      </div>
    </div>
    <!--作者信息-->
    <div class="flex items-center mt-1 px-1">
      <img class="h-2 w-2 rounded-full" :src="item.avatar" alt="" />
      <span class="text-sm text-zinc-500 ml-1">{{ item.author }}</span>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  }    
})
</script>
<style lang="scss" scoped>
</style>