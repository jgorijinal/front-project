<template>
  <div
    class="relative h-screen bg-white dark:bg-zinc-700 text-center xl:bg-zinc-200"
  >
    <header-vue></header-vue>
    <!--表单区-->
    <div
      class="block px-3 mt-4 dark:bg-zinc-800 xl:bg-white xl:w-[388px] xl:dark:bg-zinc-900 xl:m-auto xl:mt-8 xl:py-4 xl:rounded-sm xl:shadow-lg"
    >
      <h3
        class="mb-2 font-semibold text-base text-main dark:text-zinc-300 hidden xl:block"
      >
        注册账号
      </h3>
      <!-- 表单 -->
      <vee-form @submit="onRegister">
        <!-- 用户名 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="username"
          type="text"
          placeholder="用户名"
          autocomplete="on"
          :rules="validateUsername"
          v-model="registerForm.username"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="username"
        >
        </vee-error-message>
        <!-- 密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="password"
          type="password"
          placeholder="密码"
          autocomplete="on"
          :rules="validatePassword"
          v-model="registerForm.password"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="password"
        >
        </vee-error-message>
        <!-- 确认密码 -->
        <vee-field
          class="dark:bg-zinc-800 dark:text-zinc-400 border-b-zinc-400 border-b-[1px] w-full outline-0 pb-1 px-1 text-base focus:border-b-main dark:focus:border-b-zinc-200 xl:dark:bg-zinc-900"
          name="confirmPassword"
          type="password"
          placeholder="确认密码"
          autocomplete="on"
          rules="validateConfirmPassword:@password"
          v-model="registerForm.confirmPassword"
        />
        <vee-error-message
          class="text-sm text-red-600 block mt-0.5 text-left"
          name="confirmPassword"
        >
        </vee-error-message>

        <div class="pt-1 pb-3 leading-[0px] text-right">
          <div class="mb-2">
            <a
              class="inline-block p-1 text-zinc-400 text-right dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400 cursor-pointer"
              @click.stop="clickLogin"
            >
              去登录
          </a>
          </div>
          <!-- <div class="text-center">
            <a
              class="text-zinc-400 dark:text-zinc-600 hover:text-zinc-600 dark:hover:text-zinc-400 text-sm duration-400"
              href="https://m.imooc.com/newfaq?id=89"
              target="__black"
            >
              注册即同意《慕课网注册协议》
            </a>
          </div> -->
        </div>

        <m-button
          type="main"
          class="w-full dark:bg-zinc-900 xl:dark:bg-zinc-800"
        >
          立即注册
        </m-button>
      </vee-form>
    </div>
  </div>
</template>
<script setup>
import headerVue from '../header.vue'
import {
  Form as VeeForm,
  Field as VeeField,
  ErrorMessage as VeeErrorMessage,
  defineRule
} from 'vee-validate'
import {validatePassword,validateUsername , validateConfirmPassword } from '../validate'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { LOGIN_TYPE_USERNAME } from '@/constants' 
import { useRouter } from 'vue-router'
// 注册新的校验规则
defineRule('validateConfirmPassword', validateConfirmPassword)

// 注册表单
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const loading = ref(false) 
const store = useStore()
const router = useRouter()
// 点击注册
const onRegister = async () => {
  loading.value = true

  const payload = {
    username: registerForm.value.username,
    password: registerForm.value.password,
  }

  // await store.dispatch('user/registerAction', payload)
  try {
    await store.dispatch('user/registerAction', payload)

    // 注册成功 , 那么久直接登录
    await store.dispatch('user/loginAction', {
      ...payload,
      loginType: LOGIN_TYPE_USERNAME
    })
    router.push('/')
  }  finally {
    loading.value = false
  }
}
// 去登录
const clickLogin = () => {
  store.commit('app/setRouterType', 'push')
  router.push('/login')
}
</script>
<style lang="scss" scoped></style>
