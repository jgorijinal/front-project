<template>
  <div class="fixed left-0 top-0 w-screen h-screen">
    <router-view></router-view>
    <m-confirm></m-confirm>
  </div>
</template>

<script setup>
import { isMobileTerminal } from './utils/flexible';
import mConfirm from '@/libs/confirm/index.vue'
</script>
<style scoped>

</style>
