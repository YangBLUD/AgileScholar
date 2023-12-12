<template>
  <div>
    <TopNav />
  </div>
  <div class="main-box">
    <div class="left-box">
      <div class="header">
        <h2>Advanced Search</h2>
      </div>
      <div class="keywords-select">
        <h4 style="margin-bottom: 20px">Search Type</h4>
        <el-radio-group
          v-model="searchType"
          size="large"
          change="clearAndChange"
        >
          <el-radio-button label="Articles" value="0" />
          <el-radio-button label="Authors" value="1" />
          <el-radio-button label="Institutions" value="2" />
          <el-radio-button label="Subjects" value="3" />
        </el-radio-group>
      </div>
      <div class="keywords-select">
        <h4 style="margin-bottom: 20px">Search Constraint</h4>
        <el-table :data="list" style="width: 95%">
          <el-table-column>
            <template #default="props">
              <el-row>
                <el-col :span="3">
                  <el-select
                    v-model="props.row.type"
                    style="width: 100%"
                    v-show="props.$index !== 0"
                  >
                    <el-option value="AND">AND</el-option>
                    <el-option value="OR">OR</el-option>
                    <el-option value="NOT">NOT</el-option>
                  </el-select>
                </el-col>
                <el-col :span="3">
                  <el-select v-model="props.row.select" style="width: 100%">
                    <el-option value="Theme">Theme</el-option>
                    <el-option value="Author">Author</el-option>
                  </el-select>
                </el-col>
                <el-col :span="9">
                  <el-input
                    v-model="props.row.content"
                    style="width: 100%"
                    maxlength="20"
                  ></el-input>
                </el-col>
                <el-col :span="3">
                  <el-select v-model="props.row.clear" style="width: 100%">
                    <el-option value="0" label="Fuzzy">Fuzzy</el-option>
                    <el-option value="1" label="Accurate">Accurate</el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-button
                    @click="addRow(props.row)"
                    v-if="props.$index === 0"
                    >Add</el-button
                  >
                  <el-button @click="removeRow(props.row)" v-else
                    >Remove</el-button
                  >
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="time-select">
        <h4 style="margin-bottom: 20px">Publication Date</h4>
        <div>
          <el-radio-group v-model="timeSelect" size="default">
            <el-radio-button label="AllDates">All Dates</el-radio-button>
            <el-radio-button label="CustomRange">Custom Range</el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin: 20px 0">
          <el-date-picker
            v-model="timePick"
            type="monthrange"
            unlink-panels
            range-separator="to"
            :disabled="timeSelect !== 'CustomRange'"
            start-placeholder="begin"
            end-placeholder="end"
            :shortcuts="shortcuts"
            format="YYYY/MM"
            value-format="YYYY-MM"
          />
        </div>
      </div>
      <div class="submit">
        <div style="margin-right: 20px">
          <el-button size="large" @click="clearInf()">Clear</el-button>
          <el-button type="primary" @click="search()" size="large"
            >Search</el-button
          >
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="header">
        <h2>高级检索的使用方法</h2>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ref, onMounted } from "vue";
import TopNav from "../../components/HomePage/TopNav.vue";
import { el } from "element-plus/es/locale";
const searchType = ref(1);
//搜索类型选择
function clearAndChange() {}
//过滤器选择
const list = ref([
  { content: "", select: "Theme", type: "AND", clear: "0" },
  { content: "", select: "Author", type: "AND", clear: "0" },
]);

function addRow(row) {
  if (list.value.length >= 5) {
    return;
  }
  list.value.push({ content: "", select: "Theme", type: "AND", clear: "0" });
}

function removeRow(row) {
  const index = list.value.indexOf(row);
  list.value.splice(index, 1);
}

//时间选择
const timeSelect = ref("AllDates");
const timePick = ref("");
const shortcuts = [
  {
    text: "This month",
    value: [new Date(), new Date()],
  },
  {
    text: "This year",
    value: () => {
      const end = new Date();
      const start = new Date(new Date().getFullYear(), 0);
      return [start, end];
    },
  },
  {
    text: "Last 6 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setMonth(start.getMonth() - 6);
      return [start, end];
    },
  },
];
function search() {
  if (timeSelect.value == "AllDates") {
    var begin = "";
    var end = "";
  } else {
    var begin = timePick.value[0];
    var end = timePick.value[1];
  }
}
function clearInf() {
  list.value = [
    { content: "", select: "Theme", type: "AND", clear: "0" },
    { content: "", select: "Author", type: "AND", clear: "0" },
  ];
  timeSelect.value = "AllDates";
  timePick.value = "";
}
</script>
<style scoped>
.main-box {
  padding-top: 65px;
}
.left-box {
  width: 65%;
  min-height: 500px;
  height: 100%;
  float: left;
}
.right-box {
  width: 35%;
  min-height: 500px;
  height: 100%;
  background-color: #e3e3ff;
  float: right;
}
.header {
  margin: 20px 0;
  padding-left: 10px;
}
.type-select {
  margin-top: 30px;
  padding: 20px 0 20px 30px;
  border: #b2b2b2 1px solid;
  border-bottom: none;
}
.keywords-select {
  padding: 20px 0 20px 30px;
  border: #b2b2b2 1px solid;
  border-bottom: none;
}
.time-select {
  margin: 0;
  padding: 20px 0 20px 30px;
  border: #b2b2b2 1px solid;
  border-bottom: none;
}
.submit {
  padding: 20px 0 20px 30px;
  border: #b2b2b2 1px solid;
  display: flex;
  justify-content: flex-end;
}
</style>
