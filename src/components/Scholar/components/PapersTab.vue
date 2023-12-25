<template>
  <el-container class="influ-container">
    <el-aside width="400px">
      <!-- 搜索框 -->

      <el-input v-model="searchText" placeholder="Search" class="inputselect" @keyup.enter="performSearch()" size="large"
        id="search">
        <template #append>
          <el-button :icon="Search" @click="performSearch" />
        </template>
      </el-input>

      <!-- 筛选栏 -->
      <el-menu default-active="1" class="filter-menu" accordion>
        <el-menu-item-group>
          <el-menu-item index="1-2" @click="filterSearch(0)" class="filter-menu-iten">Descending by
            references</el-menu-item>
          <el-menu-item index="1-3" @click="filterSearch(1)" class="filter-menu-iten">Ascending by
            references</el-menu-item>
          <el-menu-item index="1-4" @click="filterSearch(2)" class="filter-menu-iten">Descending by publication
            time</el-menu-item>
          <el-menu-item index="1-5" @click="filterSearch(3)" class="filter-menu-iten">Ascending by publication
            time</el-menu-item>
          <el-menu-item index="1-6" @click="filterSearch(4)" class="filter-menu-iten">Descending by title</el-menu-item>
          <el-menu-item index="1-7" @click="filterSearch(5)" class="filter-menu-iten">Ascending by title</el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <el-main>
      <el-col :span="24" v-for="paper in paper_list" :key="paper.id">
        <el-card class="paper-card">
          <div class="paper-authors-share">
            <router-link class="link" :to="{ name: 'article-display', params: { id: paper.id } }">
              <span v-html="paper.title" class="paper-title"></span>
            </router-link>
            <div>
              <el-icon style="font-size: 20px; vertical-align: middle">
                <Share />
              </el-icon>
              <div class="citedcount">{{ paper.cited_count }}</div>
            </div>
          </div>
          <div class="paper-info">
            <p class="paper-field"><span style="font-weight: bold; font-style: italic; margin-right: 10px;">Area:</span>{{
              paper.domain.slice(0, 3).map(d =>
                d.name).join(', ') }}</p>
            <span style="font-weight: bold; font-style: italic; margin-right: 10px;">Author:</span>
            <span class="paper-authors">{{ paper.author_all.map(a => a.name).join(', ') }}</span>
            <p class="paper-date"><span style="font-weight: bold; font-style: italic; margin-right: 10px;">Publication
                time:</span>{{ paper.publication_date }}</p>
          </div>
        </el-card>
      </el-col>
      <el-pagination :current-page="currentPage" :page-size="10" :total="totalpage" :small="false"
        class="custom-pagination" style="font-size: 16px; padding: 20px;" @current-change="handlePageChange">
      </el-pagination>
    </el-main>
  </el-container>
</template>



<script setup>
import { onMounted, defineAsyncComponent, computed, ref, reactive } from 'vue';
import { useStore } from "vuex";
import { ElRow, ElCol, ElContainer, ElHeader, ElMain, ElTabs, ElTabPane } from 'element-plus';
import axios from 'axios';
import { Search } from "@element-plus/icons-vue";
const store = useStore()
const searchText = ref("");
function getAuthorStates() {
  return store.getters.getAuthorState
}

// 筛选后的论文数据
const papernum = ref(5)
const paper_list = ref([])
const currentPage = ref(1);
const totalpage = ref(0);
const search_to = ref(20)
const sortType = ref(-1);
const addList = ref([
  {
    "content": getAuthorStates().authorInformation.id,
    "select": "Author",
    "clear": 1
  }
])
function filterSearch(type) {
  sortType.value = type;
  fetchPaperList();
}
function performSearch() {
  if (searchText.value == "") {
    addList.value = [
      {
        "content": getAuthorStates().authorInformation.id,
        "select": "Author",
        "clear": 1
      },
    ]
    currentPage.value = 0;
  } else {
    addList.value = [
      {
        "content": getAuthorStates().authorInformation.id,
        "select": "Author",
        "clear": 1
      },
      {
        "content": searchText.value,
        "select": "",
        "clear": 1
      }
    ]
    currentPage.value = 0;
  }
  fetchPaperList()
}
// 筛选函数
function fetchPaperList() {
  axios({
    url: "http://122.9.5.156:8000/api/v1/search_result/search",
    method: "post",
    data: JSON.stringify({
      // "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJcdThjMjJcdTc5YzlcdTRlNjZcdTZjYTFcdTcyNWJcdTcyNWIiLCJ0eXBlIjoidXNlciIsImV4cCI6MTcwMjM2OTc3NS40MTAzMjYyfQ.5lNkhg2Wc2F8EBzByb8ATmPD3I2gd-_mr3Hcgo_SJ5U",
      "search_type": 0,
      "and_list": addList.value,
      "or_list": [],
      "not_list": [],
      "start_time": "1990-12",
      "end_time": "2023-10",
      "first_search": 1,
      "work_clustering": 0,
      "author_clustering": 0,
      "size": papernum.value,
      "from": currentPage.value * papernum.value,
      "sort": sortType.value,
      "extend_list": [
      ]
    })
  })
    .then((res) => {
      console.log(res.data)
      paper_list.value = res.data.data.result
      console.log(paper_list)
      totalpage.value = res.data.data.total;
      search_to.value = Math.min(res.data.data.total, papernum.value);
    })
    .catch((err) => {
      console.log(err);
    });
}
function handlePageChange(newPage) {
  currentPage.value = newPage;
  fetchPaperList();
}
onMounted(() => {
  fetchPaperList(1);
})


</script>
<style scoped>
.influ-container {
  /* 页面整体布局样式 */
}

.inputselect {
  margin-top: 20px;
  margin-bottom: 20px;
}

.paper-card {
  padding-left: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #eaecef;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.paper-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  border-color: #d3dce6;
}

.paper-title {
  color: #0077c2;
  font-size: 20px;
  height: 35px;
  line-height: 35px;
  font-weight: bold;
  margin-bottom: 15px;
}


.paper-field,
.paper-authors,
.paper-date {
  height: 30px;
  line-height: 30px;
  color: #555;
  font-size: 16px;
}

.paper-info {
  background-color: #fcfcfd;
  /* 浅灰色背景 */
  padding: 10px;
  border-radius: 4px;
}


.paper-card:hover {
  border: 1px solid #d3dce6;
  /* 悬停时改变边框颜色 */
}

.paper-authors-share {
  display: flex;
  justify-content: space-between;
  align-items: center;

  >>>em {
    background-color: yellow;
  }
}

.citedcount {
  margin-left: 20px;
  margin-right: 20px;
  font-size: 14px;
  display: inline-block;
}

.filter-menu-iten {
  font-size: 17px;
}

.link {
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

::v-deep .tab-bar .el-tabs__item {
  font-weight: bold;
}
</style>

