<template>
  <el-container class="influ-container">
    <el-aside width="300px">
      <!-- 搜索框 -->

      <el-input v-model="searchText" placeholder="Search" class="inputselect" @keyup.enter="performSearch(currentPage.value)"
                size="large" width="400px" id="search">
        <template #append>
          <el-button :icon="Search" @click="performSearch" />
        </template>
      </el-input>

      <!-- 筛选栏 -->
      <el-menu default-active="1" class="filter-menu" accordion>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click="filterBy('type', '全部')">全部</el-menu-item>
          <el-menu-item index="1-1" @click="filterBy('type', '期刊')">期刊</el-menu-item>
          <el-menu-item index="1-2" @click="filterBy('type', '学位')">学位</el-menu-item>
          <el-menu-item index="1-3" @click="filterBy('type', '会议')">会议</el-menu-item>
          <el-menu-item index="1-4" @click="filterBy('type', '成果')">成果</el-menu-item>
          <el-menu-item index="1-5" @click="filterBy('type', '专利')">专利</el-menu-item>
          <el-menu-item index="1-6" @click="filterBy('type', '报纸')">报纸</el-menu-item>
          <el-menu-item index="1-6" @click="filterBy('type', '图书')">图书</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-main>
      <el-col :span="24" v-for="paper in paper_list.slice(startnum,endnum)" :key="paper.id">
        <el-card class="paper-card">
          <h3 class="paper-title">{{ paper.title }}</h3>
          <div class="paper-info">
            <p class="paper-field">领域：{{ paper.domain.slice(0,3).map(d => d.name).join(', ') }}</p>
            <p class="paper-authors">作者：{{ paper.author_all.map(a => a.name).join(', ') }}</p>
            <p class="paper-date">发表时间：{{ paper.publication_date }}</p>
          </div>
        </el-card>
      </el-col>
      <el-pagination
          :current-page="currentPage"
          :page-size="10"
          :total="totalpage"
          :small="false"
          class="custom-pagination"
          style="font-size: 16px; padding: 20px;"
          @current-change="handlePageChange">
      </el-pagination>
    </el-main>
  </el-container>
</template>



<script setup>
import { onMounted ,defineAsyncComponent, computed, ref, reactive } from 'vue';
import {useStore} from "vuex";
import { ElRow, ElCol, ElContainer, ElHeader, ElMain, ElTabs, ElTabPane } from 'element-plus';
import axios from 'axios';
import {Search} from "@element-plus/icons-vue";
const store = useStore()
const searchText = ref("");
function getAuthorStates(){
  return store.getters.getAuthorState
}
function filterBy(field, value) {
  if (value === '全部') {
    filteredPapers.value = papers.value;
  } else {
    filteredPapers.value = papers.value.filter(paper => paper[field] === value);
  }
}


// 筛选后的论文数据
const papernum = ref(10)
const paper_list = ref([])
const currentPage = ref(1);
const totalpage = ref(0);
const search_to = ref(20)
const search_from  = ref(1)
const searchQuery = ref('');
const selectedDomain = ref(null);
const domains = ref([{ value: 'domain1', label: '领域1' }, { value: 'domain2', label: '领域2' }]); // 示例数据


function performSearch(page){
  axios({
    url: "http://122.9.5.156:8000/api/v1/search_result/search",
    method: "post",
    data: JSON.stringify({
      // "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJcdThjMjJcdTc5YzlcdTRlNjZcdTZjYTFcdTcyNWJcdTcyNWIiLCJ0eXBlIjoidXNlciIsImV4cCI6MTcwMjM2OTc3NS40MTAzMjYyfQ.5lNkhg2Wc2F8EBzByb8ATmPD3I2gd-_mr3Hcgo_SJ5U",
      "search_type" : 0,
      "and_list": [
        {
          "content":getAuthorStates().authorInformation.id,
          "select":"Author",
          "clear":1
        },
        {
          "content":searchText.value,
          "select":"",
          "clear":1
        }
      ],
      "or_list": [],
      "not_list": [],
      "start_time": "1990-12",
      "end_time": "2023-10",
      "first_search": 1,
      "work_clustering": 0,
      "author_clustering": 0,
      "size": papernum.value,
      "from": (page - 1) * papernum.value,
      "sort": -1,
      "extend_list": [
      ]
    })
  })
      .then((res) => {
        console.log(res.data)
        paper_list.value = res.data.data.result
        console.log(paper_list)
        totalpage.value = res.data.data.total;
        search_to.value = Math.min(res.data.data.total,papernum.value);
      })
      .catch((err) => {
        console.log(err);
      });
}

// 筛选函数
function fetchPaperList(page){
  axios({
    url: "http://122.9.5.156:8000/api/v1/search_result/search",
    method: "post",
    data: JSON.stringify({
      // "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJcdThjMjJcdTc5YzlcdTRlNjZcdTZjYTFcdTcyNWJcdTcyNWIiLCJ0eXBlIjoidXNlciIsImV4cCI6MTcwMjM2OTc3NS40MTAzMjYyfQ.5lNkhg2Wc2F8EBzByb8ATmPD3I2gd-_mr3Hcgo_SJ5U",
      "search_type" : 0,
      "and_list": [
        {
          "content":getAuthorStates().authorInformation.id,
          "select":"Author",
          "clear":1
        }
      ],
      "or_list": [],
      "not_list": [],
      "start_time": "1990-12",
      "end_time": "2023-10",
      "first_search": 1,
      "work_clustering": 0,
      "author_clustering": 0,
      "size": papernum.value,
      "from": (page - 1) * papernum.value,
      "sort": -1,
      "extend_list": [
      ]
    })
    })
      .then((res) => {
        console.log(res.data)
        paper_list.value = res.data.data.result
        console.log(paper_list)
        totalpage.value = res.data.data.total;
        search_to.value = Math.min(res.data.data.total,papernum.value);
      })
      .catch((err) => {
        console.log(err);
      });
}
function handlePageChange(newPage) {
  currentPage.value = newPage;
  fetchPaperList(newPage);
}
onMounted(()=>{
  fetchPaperList(1);
})


</script>
<style scoped>
.influ-container {
  /* 页面整体布局样式 */
}

.inputselect{
  margin-top: 20px;
  margin-bottom: 20px;
}

.paper-card {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 15px;
  transition: box-shadow 0.3s;
}

.paper-card:hover {
  box-shadow: 0 4px 14px 0 rgba(0,0,0,0.2);
}

.paper-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
}

.paper-field, .paper-date {
  color: #666;
  font-size: 14px;
}

.paper-info {
  background-color: #f9f9f9; /* 浅灰色背景 */
  padding: 10px;
  border-radius: 4px;
  margin-top: 10px;
}

.paper-authors {
  color: #666;
  font-size: 14px;
  margin-top: 5px;
}

.paper-card:hover {
  border: 1px solid #d3dce6; /* 悬停时改变边框颜色 */
}
.filter-aside {
  padding: 20px;
}

.filter-search {
  margin-bottom: 20px;
  font-size: 20px;
}

</style>

