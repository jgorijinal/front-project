<template>
  <router-view v-slot="{Component}">
    <!--过渡动画-->
    <transition :name="transitionName" mode="out-in">
      <!--缓存-->
      <keep-alive>
          <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>
<script>
// none
const ROUTER_TYPE_NONE = 'none'
// 进入 push
const ROUTER_TYPE_PUSH = 'push'
// 退出 back
const ROUTER_TYPE_BACK = 'back'
</script>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const props = defineProps({
  // 状态: none , push , back 
  routerType: {
    type: String,
    default: ROUTER_TYPE_NONE,
    validator(val) {
      const routerTypeArr = [ROUTER_TYPE_NONE, ROUTER_TYPE_PUSH, ROUTER_TYPE_BACK]
      const result = routerTypeArr.includes(val)
      if (!result) {
        throw new Error(`你必须要传入 ${routerTypeArr.join(',')} 中的一个值`)
      }
      return result
    }
  },
  // 首页的组件名称, 对应任务栈的第一个组件
  // mainComponentName: {
  //   type: String,
  //   required:true
  // }
})

const transitionName = ref('')
const router = useRouter()
router.beforeEach((to,from) => {
  transitionName.value = props.routerType
})
</script>
<style lang="scss" scoped>
// push页面时：新页面的进入动画
.push-enter-active {
  animation-name: push-in;
  animation-duration: 0.2s;
}
// push页面时：老页面的退出动画
.push-leave-active {
  animation-name: push-out;
  animation-duration: 0.2s;
}
// push页面时：新页面的进入动画
@keyframes push-in {
  0% {
    transform: translate(100%, 0);
  }
  100% {
    transform: translate(0, 0);
  }
}
// push页面时：老页面的退出动画
@keyframes push-out {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(-100%, 0);
  }
}

// 后退页面时：即将展示的页面动画
.back-enter-active {
  animation-name: back-in;
  animation-duration: 0.2s;
}
// 后退页面时：后退的页面执行的动画
.back-leave-active {
  animation-name: back-out;
  animation-duration: 0.2s;
}
// 后退页面时：即将展示的页面动画
@keyframes back-in {
  0% {
    width: 100%;
    transform: translate(-100%, 0);
  }
  100% {
    width: 100%;
    transform: translate(0, 0);
  }
}
// 后退页面时：后退的页面执行的动画
@keyframes back-out {
  0% {
    width: 100%;
    transform: translate(0, 0);
  }
  100% {
    width: 100%;
    transform: translate(100%, 0);
  }
}
</style>