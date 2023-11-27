<template>
  <el-container class="influ-container">
    <el-aside width="200px">
      <el-menu>
        <el-menu-item index="1" @click="currentView = 'overview'">成果概览</el-menu-item>
        <el-menu-item index="2" @click="currentView = 'academicFocus'">学术关注点</el-menu-item>
        <el-menu-item index="1" @click="currentView = 'overview'">研究兴趣</el-menu-item>
        <el-menu-item index="2" @click="currentView = 'academicFocus'">文献分布</el-menu-item>
        <el-menu-item index="1" @click="currentView = 'overview'">引用趋势</el-menu-item>
        <el-menu-item index="2" @click="currentView = 'academicFocus'">基金资助</el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <component :is="currentComponent"></component>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref , computed} from 'vue';
import Overview from './Influence-components/Overview.vue';
import AcademicFocus from './Influence-components/AcademicFocus.vue';
// 引入其他子组件

const currentView = ref('overview');

const componentsMap = {
  overview: Overview,
  academicFocus: AcademicFocus,

};

const currentComponent = computed(() => componentsMap[currentView.value]);
</script>
<style scoped>
.influ-container{

}

</style>