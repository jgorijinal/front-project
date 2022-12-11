<template>
  <div class="fixed left-0 top-0 w-screen h-screen">
    <!-- <router-view></router-view> -->
    <m-transition-router-view 
      :routerType="($store.getters.routerType)"
      mainComponentName="home"
      ></m-transition-router-view>
  </div>
</template>

<script setup>
import { isMobileTerminal } from './utils/flexible'
</script>
<style scoped>

</style>
