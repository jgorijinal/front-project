<template>
  <div class="fixed left-0 top-0 w-screen h-screen">
    <router-view></router-view>
  </div>
  <message type="success"></message>

</template>

<script setup>
import { isMobileTerminal } from './utils/flexible'
import message from '@/libs/message/index.vue'
</script>
<style scoped>

</style>
