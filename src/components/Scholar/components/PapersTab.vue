<template>
  <div>
    <el-table :data="papers" style="width: 100%">
      <el-table-column prop="title" label="论文标题"></el-table-column>
      <el-table-column prop="authors" label="作者"></el-table-column>
      <el-table-column prop="journal" label="期刊"></el-table-column>
      <el-table-column prop="year" label="年份"></el-table-column>
      <el-table-column prop="download" label="下载量"></el-table-column>
      <el-table-column prop="quote" label="引用"></el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 假设的论文数据
const papers = ref([
  { title: '论文1', authors: '作者1', journal: '期刊1', year: '2023',download: 1000,quote: 200},
  { title: '论文1', authors: '作者1', journal: '期刊1', year: '2023',download: 1000,quote: 200},
  { title: '论文1', authors: '作者1', journal: '期刊1', year: '2023',download: 1000,quote: 200},
  // 更多论文数据...
]);
</script>
