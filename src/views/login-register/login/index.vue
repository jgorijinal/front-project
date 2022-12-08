<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-700 text-center xl:bg-zinc-200"
  >
    <!-- 头部图标：PC端 -->
    <div class="hidden pt-5 h-8 xl:block">
      <img src="@/assets/vue.svg" class="m-auto w-7 h-7" alt="">
    </div>
    <!-- 头部图标：移动端 -->
    <div class="h-[111px] xl:hidden">
      <img
        v-lazy
        class="dark:hidden"
        src="https://res.lgdsunday.club/login-bg.png"
        alt=""
      />
      <img
        v-lazy
        class="h-5 absolute top-[5%] left-[50%] translate-x-[-50%]"
        src="@/assets/vue.svg"
        alt=""
        srcset=""
      />
    </div>
    <!-- 表单区 -->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        账号登录
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onLoginHandler">
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
        />
        <vee-error-message name="username"  class="text-sm text-red-600 block mt-0.5 text-left"></vee-error-message>
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          type="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
        />
        <vee-error-message name="password"  class="text-sm text-red-600 block mt-0.5 text-left"></vee-error-message>
        <div class="pt-1 pb-3 leading-[0px] text-right">
          <a
            class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
          >
            去注册
          </a>
        </div>

        <m-button class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800">
          登录
        </m-button>
      </vee-form>

      <div class="flex justify-around mt-4">
        <!-- QQ -->
        <m-svg-icon class="w-4 cursor-pointer" name="qq"></m-svg-icon>
        <!-- 微信 -->
        <m-svg-icon class="w-4 cursor-pointer" name="wexin"></m-svg-icon>
      </div>
    </div>
    <!-- 人类行为验证模块 -->
    <slider-captcha-vue v-if="isCaptchaVisible" @success="onSuccess" @close="onClose"></slider-captcha-vue>
  </div>
</template>
<script setup>
import { Form as VeeForm, Field as VeeField, ErrorMessage as VeeErrorMessage } from 'vee-validate'
import { validateUsername, validatePassword } from '../validate'
import sliderCaptchaVue from './slider-captcha.vue'
import { ref } from 'vue' 

// // 控制 sliderCaptcha 显示/隐藏
const isCaptchaVisible = ref(false)
// 点击登录按钮
const onLoginHandler = (val) => {
  isCaptchaVisible.value = true
}

// 行为验证成功
const onSuccess = () => {
  isCaptchaVisible.value = false
  // TODO: 登录请求
}
// //  sliderCaptcha 关闭
const onClose = () => {
  isCaptchaVisible.value = false
}
</script>
<style lang="scss" scoped>
  
</style>