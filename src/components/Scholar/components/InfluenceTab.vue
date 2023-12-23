<template>
  <el-container class="influ-container">
    <el-aside width="200px">
      <el-menu>
        <el-menu-item index="1" @click="currentView = 'sector'">成果概览</el-menu-item>
        <el-menu-item index="3" @click="currentView = 'interests'">研究兴趣</el-menu-item>
        <el-menu-item index="4" @click="currentView = 'distribution'">学术成果</el-menu-item>
        <el-menu-item index="5" @click="currentView = 'citationTrend'">引用趋势</el-menu-item>
        <el-menu-item index="2" @click="currentView = 'academicFocus'">学术关注点</el-menu-item>
<!--        <el-menu-item index="6" @click="currentView = 'overview'">总览</el-menu-item>-->
<!--        <el-menu-item index="7" @click="currentView = 'academicFocus'">基金资助</el-menu-item>-->
      </el-menu>
    </el-aside>

    <el-main>
      <component :is="currentComponent" :authorInformation="authorInformation" :domaindata="domaindata"></component>
    </el-main>
<!--    <el-button @click="PrintInfo">-->
<!--       PrintInfo-->
<!--    </el-button>-->
  </el-container>
</template>

<script setup>
import { ref , reactive, computed , onMounted ,defineProps} from 'vue';
import Overview from './Influence-components/Overview.vue';
import AcademicFocus from './Influence-components/AcademicFocus.vue';
import Interests from './Influence-components/Interests.vue';
import Distribution from './Influence-components/Distribution.vue';
import Sector from './Influence-components/Sector.vue';
import CitationTrend from "./Influence-components/CitationTrend.vue";
// 引入其他子组件

const currentView = ref('sector');

const componentsMap = {
  overview: Overview,
  academicFocus: AcademicFocus,
  interests: Interests,
  distribution: Distribution,
  sector: Sector,
  citationTrend: CitationTrend
};

const props = defineProps({
  authorInformation: Object,
});

const authorInformation = props.authorInformation;
const currentComponent = computed(() => componentsMap[currentView.value]);
let domaindata;
if(authorInformation!=null){
  domaindata = authorInformation.domain
      .slice(0, 10) // 截取前十个元素
      .map(item => ({
        value: parseFloat(item.activity_level) * 10000, // Convert activity_level to a number
        name: item.name
      }));
}

onMounted( () =>{
   console.log("?"+props.authorInformation)
})

const  PrintInfo = () =>{
  console.log(props)
  console.log(authorInformation)
}

</script>
<style scoped>
.influ-container{

}
</style>