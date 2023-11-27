<template>
  <el-container class="main-container">
    <!-- 上方板块 -->
    <el-header class="main-header">
      <div class="header-content">
        <!-- 作者头像 -->
        <div class="author-avatar">
          <el-avatar :size="100" :src="circleUrl" />
        </div>
        <!-- 姓名与研究机构 -->
        <div class="author-info">
          <h2>{{ authorName }}</h2>
          <p>{{ institution }}</p>
        </div>
      </div>
    </el-header>

    <!-- 下方板块 -->
    <el-main class="main-content">
      <el-tabs v-model="activeTab" @tab-click="handleTabClick" class="tabs">
        <!-- 发表的论文 -->
        <el-tab-pane label="发表的论文" name="papers" class="pane">论文</el-tab-pane>
        <!-- 学术影响力分析 -->
        <el-tab-pane label="学术影响力分析" name="influence"  class="pane">学术影响力</el-tab-pane>
        <!-- 学术关系网络 -->
        <el-tab-pane label="学术关系网络" name="network"  class="pane">学术关系网络</el-tab-pane>
        <!-- 学术成果集 -->
        <el-tab-pane label="学术成果集" name="achievements"  class="pane">学术成果</el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <component :is="currentTabComponent"></component>
      </div>
    </el-main>
  </el-container>
</template>


<script setup>
import { defineAsyncComponent, computed, ref, reactive } from 'vue';



import { ElRow, ElCol, ElContainer, ElHeader, ElMain, ElTabs, ElTabPane } from 'element-plus';

// 作者信息
const authorName = ref('姓名');
const institution = ref('研究机构');

// 标签页状态
const activeTab = ref('papers');


const tabComponents = {
  papers: defineAsyncComponent(() => import('./components/PapersTab.vue')),
  influence: defineAsyncComponent(() => import('./components/InfluenceTab.vue')),
  network: defineAsyncComponent(() => import('./components/NetworkTab.vue')),
  achievements: defineAsyncComponent(() => import('./components/AchievementsTab.vue'))
};

// 计算属性，用于动态渲染组件
const currentTabComponent = computed(() => tabComponents[activeTab.value]);

// 处理标签页点击事件
const handleTabClick = (tab, event) => {
  // 可以在这里进行点击标签页后的逻辑处理，例如数据加载等
};
</script>

<style scoped>
.main-container {
  font-family: 'Source Sans Pro', Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
}

.main-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 25vh;
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  width: 100%;
}

.author-avatar {
  width: 30%;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.author-info h2 {
  margin-bottom: 40px;
  font-size: 24px;
  font-weight: 600;
}

.author-info p {
  margin: 0;
  font-size: 18px;
  color: #666;
}
/* 设置标签页标题的样式 */
::v-deep .tabs .el-tabs__item {
  margin: 5px;
  font-size: 16px; /* 调整字体大小 */
}

::v-deep .tabs .el-tabs__item.is-active {
  color: #409eff; /* 选中标签的文字颜色 */
  font-weight: bold; /* 加粗字体 */
}

/* 继续保持原有的 pane 样式 */
.pane {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,.1);
  margin-top: 20px;
  border-radius: 4px;
}


.main-content .tab-content {
  margin-top: 1rem;
}

</style>


