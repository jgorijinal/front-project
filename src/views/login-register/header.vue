<template>
  <div>
<!-- 头部图标：PC端 -->
<div class="hidden pt-5 h-8 xl:block">
      <img src="@/assets/vue.svg" class="m-auto w-7 h-7" alt="" @click="clickLogo">
    </div>
    <!-- 头部图标：移动端 -->
    <div class="h-[111px] xl:hidden">
      <img
        v-lazy
        class="dark:hidden"
        src="https://res.lgdsunday.club/login-bg.png"
        alt=""
        @click="clickLogo"
      />
      <img
        v-lazy
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        src="@/assets/vue.svg"
        alt=""
        srcset=""
        @click="clickLogo"
      />
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
const router = useRouter()
const store = useStore()
const clickLogo = () => {
  store.commit('app/setRouterType', 'none')
  router.push('/')
}
</script>