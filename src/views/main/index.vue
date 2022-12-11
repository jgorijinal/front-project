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
  </m-trigger-menu>
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
import { onActivated,ref } from 'vue';
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
</script>
<style lang="scss" scoped>
  
</style>