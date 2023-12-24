<template>
  <router-view></router-view>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router=useRouter();

</script>

<style scoped>
html,body,#app{
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
