<template>
  <el-container class="main-container">
    <!-- 上方板块 -->
    <el-header class="main-header">
      <div class="header-content">
        <!-- 作者头像 -->
        <div class="author-avatar">
          <el-avatar :size="130" :src="circleUrl" />
        </div>
        <!-- 姓名与研究机构 -->
        <div class="author-info">
          <template v-if="authorInformation != null">
            <h2>{{ authorInformation.display_name }}</h2>
            <p class="author-attr">{{ authorInformation.institution[0].name }}</p>
            <p class="author-attr">{{ authorInformation.author_email}}</p>
            <p v-if="authorInformation.claimed" class="author-certificate">Scholar certified<el-button class="checkbutton" type="success" :icon="Check" circle /></p>
            <p v-if="!authorInformation.claimed" class="author-certificate">Scholar not certified</p>
          </template>
        </div>
        <div class="author-opt">
        </div>
      </div>
    </el-header>

    <!-- 下方板块 -->
    <el-main class="main-content">
      <el-tabs class="tab-bar" v-model="activeTab" @tab-click="handleTabClick" >
        <!-- 学术影响力分析 -->
        <el-tab-pane label="学术影响力分析" name="influence"  class="pane">学术影响力</el-tab-pane>
        <!-- 发表的论文 -->
        <el-tab-pane label="发表的论文" name="papers" class="pane">论文</el-tab-pane>
        <!-- 学术关系网络 -->
        <el-tab-pane label="学术关系网络" name="network"  class="pane">学术关系网络</el-tab-pane>
        <!-- 学术成果集 -->
        <el-tab-pane label="学术成果集" name="achievements"  class="pane">学术成果</el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <component :is="currentTabComponent" :authorInformation="authorInformation" ></component>
      </div>
    </el-main>
  </el-container>
</template>


<script setup>
import { onMounted ,defineAsyncComponent, computed, ref, reactive, onBeforeMount} from 'vue';
import {useStore} from "vuex";
import { ElRow, ElCol, ElContainer, ElHeader, ElMain, ElTabs, ElTabPane } from 'element-plus';
import axios from 'axios';
import {
  Check,Delete,Edit
} from '@element-plus/icons-vue'

// 标签页状态
const activeTab = ref('influence');
const Message = ref('father-messages')
const authorInformation = ref(null)
const authorId = ref(5053369574)
const store = useStore()
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
// 获取学者信息的函数
const load =
    {"errno": 0, "errmsg": "success", "data": {"display_name": "Huobin Tan", "domain": [{"name": "Computer science", "id": "41008148", "level": "0", "activity_level": "83.5"}, {"name": "Mathematics", "id": "33923547", "level": "0", "activity_level": "54.1"}, {"name": "Engineering", "id": "127413603", "level": "0", "activity_level": "50.6"}, {"name": "Programming language", "id": "199360897", "level": "1", "activity_level": "48.2"}, {"name": "Operating system", "id": "111919701", "level": "1", "activity_level": "47.1"}, {"name": "Artificial intelligence", "id": "154945302", "level": "1", "activity_level": "36.5"}, {"name": "Biology", "id": "86803240", "level": "0", "activity_level": "27.1"}, {"name": "Physics", "id": "121332964", "level": "0", "activity_level": "27.1"}, {"name": "Machine learning", "id": "119857082", "level": "1", "activity_level": "24.7"}, {"name": "Geography", "id": "205649164", "level": "0", "activity_level": "24.7"}, {"name": "Algorithm", "id": "11413529", "level": "1", "activity_level": "23.5"}, {"name": "Computer network", "id": "31258907", "level": "1", "activity_level": "22.4"}], "institution": [{"name": "Beihang University", "id": "82880672"}], "most_cited_work": "CKAN (2020)", "cited_by_count": 387, "summary_stats": {"cited_by_count": 387, "2yr_i10_index": 1, "h_index": 10, "i10_index": 10, "oa_percent": 9.41, "2yr_mean_citedness": 5.6, "works_count": 85, "2yr_works_count": 11, "2yr_h_index": 2, "2yr_cited_by_count": 124}, "id": "5087082349", "orcid": "https://orcid.org/0000-0003-3113-6552", "counts_by_year": [{"cited_by_count": 71, "year": 2023, "works_count": 3, "oa_works_count": 0}, {"cited_by_count": 85, "year": 2022, "works_count": 5, "oa_works_count": 1}, {"cited_by_count": 52, "year": 2021, "works_count": 6, "oa_works_count": 1}, {"cited_by_count": 25, "year": 2020, "works_count": 4, "oa_works_count": 0}, {"cited_by_count": 32, "year": 2019, "works_count": 4, "oa_works_count": 2}, {"cited_by_count": 15, "year": 2018, "works_count": 6, "oa_works_count": 0}, {"cited_by_count": 21, "year": 2017, "works_count": 2, "oa_works_count": 0}, {"cited_by_count": 16, "year": 2016, "works_count": 13, "oa_works_count": 2}, {"cited_by_count": 14, "year": 2015, "works_count": 2, "oa_works_count": 0}, {"cited_by_count": 12, "year": 2014, "works_count": 4, "oa_works_count": 1}, {"cited_by_count": 11, "year": 2013, "works_count": 2, "oa_works_count": 0}, {"cited_by_count": 7, "year": 2012, "works_count": 3, "oa_works_count": 0}], "claimed": true, "undisplayed_works": [], "is_star": false, "self": true, "author_email": "21371102@cdcdcd.buaa.edu.cn"}}
const fetchAuthorInformation = () =>{
  axios({
    url: "http://122.9.5.156:8000/api/v1/author/get_author_information",
    method: "post",
    data: JSON.stringify({
      author_id: 5053369574
    }),
  })
      .then((res) => {
        console.log(res.data.data)
        store.commit('setAuthorInformation', res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
}
const fetchAuthorNetwork = () =>{
  axios({
    url: "http://122.9.5.156:8000/api/v1/author/author_network",
    method: "post",
    data: JSON.stringify({
      author_id: 5053369573
    }),
  })
      .then((res) => {
        console.log(res.data.data)
        store.commit('setAuthorNetwork', res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
}
function getAuthorStates(){
  return store.getters.getAuthorState
}
onBeforeMount(async ()=>{
  authorId.value = 5053369573;
  authorInformation.value = getAuthorStates().authorInformation
  fetchAuthorNetwork();
  fetchAuthorInformation();
})
// 在页面加载时触发请求
onMounted( () => {
  authorInformation.value = getAuthorStates().authorInformation
});
authorId.value = 5053369573;
authorInformation.value = getAuthorStates().authorInformation
fetchAuthorNetwork();
fetchAuthorInformation();
console.log(authorInformation.value.claimed)
console.log(authorInformation.value)
console.log(authorInformation.value.display_name)
</script>

<style scoped>

.checkbutton{
  font-size: 16px;
  margin-left: 5px;
  width: 10px; /* 设置按钮宽度 */
  height: 10px; /* 设置按钮高度 */
}

.certified-text{
  color: 'red';
  font-size: 24px;
}

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
  margin-right: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.author-certificate .el-icon {
  margin-left: 10px; /* 调整图标与文字之间的间距 */
  /* 其他样式设置 */
}

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.author-info h2 {
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: 600;
}

.author-info .author-attr {
  margin-bottom: 15px;
  font-size: 15px;
  color: #666;
}
.author-info .author-certificate {
  margin-bottom: 15px;
  font-size: 17px;
  color: #0773df;
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


.main-content{
  margin-top: 1rem;
}

.tab-content{

}
.tab-bar{

}

</style>


