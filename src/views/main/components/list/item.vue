<template>
  <div class="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800  rounded  pb-1">
    <div 
      class="relative rounded-md border-white dark:border-black"
      :style="{backgroundColor: randomRGB()}"
      >
      <!--图片-->
      <img :src="item.photo" class="rounded"  
        v-lazy
        :style="{
            height: (width / item.photoWidth) * item.photoHeight + 'px'
        }"
        alt="" 
        ref="imgRef"
        @click="onToPinsClick"
      >
      <!--遮罩层-->
      <div class="hidden xl:block opacity-0 hover:opacity-90 duration-300 hover:bg-zinc-800/70
        absolute z-10 left-0 top-0 w-full h-full rounded hover:cursor-zoom-in"
        ref="maskRef"
        >
        <!--一些按钮-->
        <!--分享-->
        <m-button class="absolute top-1.5 left-1.5" type="main">分享</m-button>
        <m-button
          class="absolute top-1.5 right-1.5"
          type="info"
          icon="heart"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
        />
        <!--下载-->
        <m-button
          class="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="download"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onDownload"
        />
        <!--全屏-->
        <m-button
          class="absolute bottom-1.5 right-1.5 bg-zinc-100/70"
          type="info"
          size="small"
          icon="full"
          iconClass="fill-zinc-900 dark:fill-zinc-200"
          @click="onImgFullscreen"
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
import { randomRGB } from '@/utils/color'
import { saveAs } from 'file-saver'
import { message } from '@/libs'
import { useFullscreen } from '@vueuse/core';
import { ref,computed, nextTick } from 'vue'
import { useElementBounding } from '@vueuse/core';
const props = defineProps({
  item: {
    type: Object,
    default: () => ({})
  },
  width: {
    type: Number,
  }
})
// 下载图片
const onDownload = () => {
  message('success', '图片正在下载中...')
  // 延迟一段时间后执行下载, 有更好的体验
  setTimeout(() => {
    saveAs(props.item.photoDownLink)
  }, 1000)
}

// 全屏
const imgRef = ref(null)
const { enter:onImgFullscreen } = useFullscreen(imgRef)

const emits = defineEmits(['click'])
// --------------------------------------------- pins 详情页面 ------------------------------------------
// 点击进入详情页面, 给父组件传 id
const onToPinsClick = () => {
  // console.log('item 中点击了图片详情') 
  // 使用 useElementBounding 拿到图片的位置信息
  const { x, y, width, height } = useElementBounding(imgRef)

  // 图片中心的位置信息
  const imgCenterInfo = computed(() => {
    return {
      x: parseInt(x.value + (width.value / 2)),
      y: parseInt(y.value + (height.value / 2))
    }
  })
  emits('click', {
    id: props.item.id,  // 图片 id
    imgCenterInfo       // 图片中间位置信息 x,y
  })
} 
</script>)
<style lang="scss" scoped>
</style>