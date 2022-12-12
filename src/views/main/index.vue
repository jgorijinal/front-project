<template>
  <div
    ref="containerRef" 
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 
      scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent" >
    <!--导航栏 pc/移动端-->
    <navigation-vue></navigation-vue>
    <!--图片列表-->
    <div class="max-w-screen-xl mx-auto m1 xl:mt-4">
        <list-vue></list-vue>
    </div>

    <!--移动端: 下面导航栏-->
    <m-trigger-menu v-if="isMobileTerminal" class="fixed bottom-2 left-[50%] translate-x-[-50%]">
      <m-trigger-menu-item 
        icon="home"  
        iconClass="fill-zinc-900 dark:fill-zinc-200"
        to="/"
      >
        首页
      </m-trigger-menu-item>
      <m-trigger-menu-item
        v-if="$store.getters.token"
        icon="vip"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onVipClick"
      >
      VIP
    </m-trigger-menu-item>
    <m-trigger-menu-item
        icon="profile"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="onProfileClick"
    >
    {{$store.getters.token ? '我的' : '未登录'}}
    </m-trigger-menu-item>
    <m-trigger-menu-item
        icon="fold"
        iconClass="fill-zinc-400 dark:fill-zinc-500"
        textClass="text-zinc-400 dark:text-zinc-500"
        @click="changePopupVisible"
    >
      主题
    </m-trigger-menu-item>
  </m-trigger-menu>
  <!--主题替换-->
  <m-popup v-model="isPopupVisible" class="h-[30%] dark:bg-zinc-700">
    <div>
      <h1 class="text-base p-1 font-bold  dark:text-zinc-300">更换主题</h1>
      <div class="flex items-center p-1">
        <span class="text-sm pr-1 dark:text-zinc-300">极简白</span>
        <m-switch v-model="switchValue" 
          active-value="dark"
          inactive-value="light"
          active-color="#ababb0"
          @change="changeTheme"
          ></m-switch>
        <span class="text-sm pl-1 dark:text-zinc-300">深夜黑</span>
      </div>
    </div>
  </m-popup>
  </div>
</template>
<script>
export default {
  name:'home'
}
</script>
<script setup>
import navigationVue from './components/navigation/index.vue'
import listVue from './components/list/index.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useScroll } from '@vueuse/core';
import { onActivated, ref } from 'vue';
import { THEME_LIGHT,THEME_DARK } from '@/constants'
const router = useRouter()
const store = useStore()
const onVipClick = () => {
  store.commit('app/setRouterType', 'push')
  router.push('/member')
}
const onProfileClick = () => {
  if (store.getters.token) {
    store.commit('app/setRouterType', 'push')
    router.push('/profile') 
  } else {
    store.commit('app/setRouterType', 'none')
    router.push('/login') 
  }
}


// 记录滚动位置
const containerRef = ref(null)
// 拿到滚动的距离
const { y } = useScroll(containerRef)
// 被激活时
onActivated(() => {
  if (!containerRef.value) {
    return
  }
  // 赋值给 scrollTop
  containerRef.value.scrollTop = y.value
})


// popup 显示/隐藏
const isPopupVisible = ref(false)
const changePopupVisible = () => {
  isPopupVisible.value = !isPopupVisible.value 
}


// switch 值 : light / dark
const switchValue = ref('light')

const changeTheme = (val) => {
  if (val === 'light') {
    store.commit('theme/setThemeType', THEME_LIGHT)
  } else if (val === 'dark') {
    store.commit('theme/setThemeType', THEME_DARK) 
  }
}
</script>
<style lang="scss" scoped>
  
</style>