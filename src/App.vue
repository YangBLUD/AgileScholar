<template>
  <router-view></router-view>
</template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {watch} from "vue";
const route = useRoute();
const router=useRouter();
</script>

<style scoped>
html,body,#app{
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
