<template>
  <m-popover>
    <!--#reference-->
    <template #reference>
      <div class="p-1 cursor-pointer bg-white rounded-md hover:bg-zinc-100">
        <m-svg-icon class="w-2 h-2" name="theme-light"></m-svg-icon>
      </div>
    </template>
    <!--气泡框内容: 默认插槽-->
    <ul class="w-[140px]">
      <template v-for="item in themeArr" :key="item.id">
        <li class="flex items-center p-1 hover:bg-zinc-100 rounded-md cursor-pointer duration-200" >
          <m-svg-icon class="w-1.5 h-1.5 mr-1" :name="item.icon" />
          <span class="text-sm">{{item.name}}</span>
        </li>
      </template>
    </ul>
  </m-popover>
</template>
<script setup>
import { THEME_LIGHT,THEME_DARK,THEME_SYSTEM } from  '@/constants'
const themeArr = [
  {
    id: 0,
    type: THEME_LIGHT,
    name: '极简白',
    icon: 'theme-light',
  },
  {
    id: 1,
    type: THEME_DARK,
    name: '极夜黑',
    icon: 'theme-dark',
  },
  {
    id: 2,
    type: THEME_SYSTEM,
    name: '跟随系统',
    icon: 'theme-system',
  },
]
</script>
<style lang="scss" scoped></style>
