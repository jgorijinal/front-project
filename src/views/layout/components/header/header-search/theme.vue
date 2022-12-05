<template>
  <div>
    <div class="text-xs mb-1 text-zinc-400">热门精选</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { getThemes } from '@/api/pexels'

const themeData = ref([])

const getThemeData = async () => {
  const res = await getThemes()
  themeData.value = res.themes
  console.log(themeData.value)
}
getThemeData()
</script>
<style lang="scss" scoped>
  
</style>