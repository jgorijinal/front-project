<template>
  <div class="fixed left-0 top-0 w-screen h-screen bg-slate-500 z-20">
    <m-navbar @clickLeft="onClickLeft" @clickRight="onClickRight">
      <template #center>
        center
      </template>
      <template #right>
        right
      </template>
    </m-navbar>
  </div>
</template>
<script setup>
const props = defineProps({
  // 图片的 id
  id: {
    type: String,
  }
})

const onClickLeft = () => {
  console.log('点击left')
}
const onClickRight = () => {
  console.log('点击right')
}
</script>
<style lang="scss" scoped>
  
</style>