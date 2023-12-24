
<template>
  <el-row>
    <el-col :span="6">
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
    </el-col>
    <el-col :span="18">
      <el-table :data="filteredPapers" style="width: 100%">
        <el-table-column prop="title" label="论文标题"></el-table-column>
        <el-table-column prop="authors" label="作者"></el-table-column>
        <el-table-column prop="journal" label="期刊"></el-table-column>
        <el-table-column prop="year" label="年份"></el-table-column>
        <el-table-column prop="download" label="下载量"></el-table-column>-->
        <el-table-column prop="quote" label="引用"></el-table-column>
      </el-table>
    </el-col>
  </el-row>
</template>

<script setup>
import { onMounted ,defineAsyncComponent, computed, ref, reactive } from 'vue';
import {useStore} from "vuex";
import { ElRow, ElCol, ElContainer, ElHeader, ElMain, ElTabs, ElTabPane } from 'element-plus';
import axios from 'axios';
const store = useStore()
function getAuthorStates(){
  return store.getters.getAuthorState
}

const papers = ref([
  { title: '论文1', authors: '作者1', journal: '期刊1', year: '2023', type: '期刊', download: '100', quote: '20' },
  { title: '论文2', authors: '作者2', journal: '期刊2', year: '2022', type: '学位', download: '200', quote: '10' },
  { title: '论文3', authors: '作者3', journal: '期刊3', year: '2021', type: '会议', download: '300', quote: '30' },
  { title: '论文4', authors: '作者4', journal: '期刊4', year: '2020', type: '成果', download: '150', quote: '25' },
  { title: '论文5', authors: '作者5', journal: '期刊5', year: '2019', type: '专利', download: '350', quote: '15' },
  { title: '论文6', authors: '作者6', journal: '期刊6', year: '2018', type: '报纸', download: '250', quote: '35' },
  { title: '论文7', authors: '作者7', journal: '期刊7', year: '2017', type: '图书', download: '400', quote: '40' },
  { title: '论文8', authors: '作者8', journal: '期刊8', year: '2023', type: '期刊', download: '120', quote: '50' },
  { title: '论文9', authors: '作者9', journal: '期刊9', year: '2022', type: '学位', download: '220', quote: '60' },
  { title: '论文10', authors: '作者10', journal: '期刊10', year: '2021', type: '会议', download: '320', quote: '70' },
  { title: '论文11', authors: '作者1', journal: '期刊1', year: '2023', type: '期刊', download: '100', quote: '20' },
  { title: '论文12', authors: '作者2', journal: '期刊2', year: '2022', type: '学位', download: '200', quote: '10' },
  { title: '论文13', authors: '作者3', journal: '期刊3', year: '2021', type: '会议', download: '300', quote: '30' },
  { title: '论文14', authors: '作者4', journal: '期刊4', year: '2020', type: '成果', download: '150', quote: '25' },
  { title: '论文15', authors: '作者5', journal: '期刊5', year: '2019', type: '专利', download: '350', quote: '15' },
  { title: '论文16', authors: '作者6', journal: '期刊6', year: '2018', type: '报纸', download: '250', quote: '35' },
  { title: '论文17', authors: '作者7', journal: '期刊7', year: '2017', type: '图书', download: '400', quote: '40' },
  { title: '论文18', authors: '作者8', journal: '期刊8', year: '2023', type: '期刊', download: '120', quote: '50' },
  { title: '论文19', authors: '作者9', journal: '期刊9', year: '2022', type: '学位', download: '220', quote: '60' },
  { title: '论文20', authors: '作者10', journal: '期刊10', year: '2021', type: '会议', download: '320', quote: '70' },
  // 更多论文数据...
]);


// 筛选后的论文数据
const filteredPapers = ref([...papers.value]);
const papernum = ref(20)
const paper_list = ref([])
const currentPage = ref(1);
const totalpage = ref(0);
const search_to = ref(20)
const search_from  = ref(1)
// 筛选函数
function filterBy(field, value) {
  if (value === '全部') {
    filteredPapers.value = papers.value;
  } else {
    filteredPapers.value = papers.value.filter(paper => paper[field] === value);
  }
}
function fetchPaperList(){
  axios({
    url: "http://122.9.5.156:8000/api/v1/search_result/search",
    method: "post",
    data: JSON.stringify({
      "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJcdThjMjJcdTc5YzlcdTRlNjZcdTZjYTFcdTcyNWJcdTcyNWIiLCJ0eXBlIjoidXNlciIsImV4cCI6MTcwMjM2OTc3NS40MTAzMjYyfQ.5lNkhg2Wc2F8EBzByb8ATmPD3I2gd-_mr3Hcgo_SJ5U",
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
      "size": 20,
      "from": 0,
      "sort": -1,
      "extend_list": [
      ]
    })
  })
      .then((res) => {
        console.log(res.data)
        paper_list.value = res.data.result
        totalpage.value = data.total;
        search_to.value = Math.min(data.total,papernum.value);
        totalye.value = parseInt(totalpage.value / papernum.value) +1;
      })
      .catch((err) => {
        console.log(err);
      });
}
onMounted(()=>{
  fetchPaperList();
})


</script>

<style>
.filter-menu {
  width: 100%;
  border-right: 1px solid #ebeef5;
}
</style>
