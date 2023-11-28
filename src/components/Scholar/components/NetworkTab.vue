<template>
  <el-container class="network-container">
    <el-aside width="200px">
      <el-menu>
        <el-menu-item index="1" @click="currentView = 'cited'">被引关系</el-menu-item>
        <el-menu-item index="1" @click="currentView = 'partnership'">合作关系</el-menu-item>
        <el-menu-item index="2" @click="currentView = 'reference'">引用关系</el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <component :is="currentComponent"></component>
    </el-main>
  </el-container>
</template>

<script setup>
import {computed, ref} from "vue";
import Cited from "./Network-components/Cited.vue"
import Partnership from "./Network-components/Partnership.vue"
import Reference from "./Network-components/Reference.vue"
const componentsMap = {
  partnership: Partnership,
  cited:Cited,
  reference:Reference
};
const currentView = ref('cited');
const currentComponent = computed(() => componentsMap[currentView.value]);

</script>
