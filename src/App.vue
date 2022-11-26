<template>
  <div>{{isMobileTerminal}}</div>
  <router-view></router-view>
</template>

<script setup>
import { isMobileTerminal } from './utils/flexible';
</script>
<style scoped>

</style>
