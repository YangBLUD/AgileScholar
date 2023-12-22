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
          style="--el-color-primary: black"
          size="large"
          @change="clearAndChange"
        >
          <el-radio-button :label="0">Articles</el-radio-button>
          <el-radio-button :label="1">Authors</el-radio-button>
          <el-radio-button :label="2">Institutions</el-radio-button>
          <el-radio-button :label="3">Fields</el-radio-button>
        </el-radio-group>
      </div>
      <div class="keywords-select">
        <h4 style="margin-bottom: 20px">Search Constraint</h4>
        <el-table
          style="--el-color-primary: black; width: 95%"
          :data="list"
          :row-style="{ height: 80 + 'px' }"
        >
          <el-table-column>
            <template #default="props">
              <el-row>
                <el-col :span="3">
                  <el-select
                    style="--el-color-primary: black; width: 100%"
                    v-model="props.row.type"
                    v-show="props.$index !== 0"
                  >
                    <el-option value="AND">AND</el-option>
                    <el-option value="OR">OR</el-option>
                    <el-option value="NOT">NOT</el-option>
                  </el-select>
                </el-col>
                <el-col :span="4">
                  <el-select
                    style="--el-color-primary: black; width: 100%"
                    v-model="props.row.select"
                  >
                    <el-option v-if="searchType === 0" value="Title"
                      >Title</el-option
                    >
                    <el-option v-if="searchType === 0" value="Abstract"
                      >Abstract</el-option
                    >
                    <el-option v-if="searchType === 0" value="Domain"
                      >Domain</el-option
                    >
                    <el-option v-if="searchType === 0" value="Author"
                      >Author</el-option
                    >
                    <el-option v-if="searchType === 0" value="Source"
                      >Source</el-option
                    >
                    <el-option v-if="searchType === 1" value="Name"
                      >Name</el-option
                    >
                    <el-option v-if="searchType === 1" value="Domain"
                      >Domain</el-option
                    >
                    <el-option v-if="searchType === 1" value="Institution"
                      >Institution</el-option
                    >
                    <el-option v-if="searchType === 1" value="Orcid"
                      >Orcid</el-option
                    >
                    <el-option v-if="searchType === 2" value="Name"
                      >Name</el-option
                    >
                    <el-option v-if="searchType === 2" value="Acronyms"
                      >Acronyms</el-option
                    >
                    <el-option v-if="searchType === 2" value="Country Code"
                      >Country Code</el-option
                    >
                    <el-option v-if="searchType === 2" value="Institution Type"
                      >Type</el-option
                    >
                    <el-option v-if="searchType === 2" value="Domain"
                      >Domain</el-option
                    >
                    <el-option v-if="searchType === 2" value="Ror"
                      >Ror</el-option
                    >
                    <el-option v-if="searchType === 3" value="Name"
                      >Name</el-option
                    >
                    <el-option v-if="searchType === 3" value="Description"
                      >Description</el-option
                    >
                    <el-option v-if="searchType === 3" value="Concept Level"
                      >Level</el-option
                    >
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
                    <el-option :value="0" label="Fuzzy">Fuzzy</el-option>
                    <el-option :value="1" label="Accurate">Accurate</el-option>
                  </el-select>
                </el-col>
                <el-col :span="5">
                  <el-button
                    style="--el-color-primary: black"
                    @click="addRow(props.row)"
                    v-if="props.$index === 0"
                    >Add</el-button
                  >
                  <el-button
                    style="--el-color-primary: black"
                    @click="removeRow(props.row)"
                    v-else
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
          <el-radio-group
            style="--el-color-primary: black"
            v-model="timeSelect"
            size="default"
          >
            <el-radio-button label="AllDates">All Dates</el-radio-button>
            <el-radio-button label="CustomRange">Custom Range</el-radio-button>
          </el-radio-group>
        </div>
        <div style="margin: 20px 0">
          <el-date-picker
            style="
              --el-color-primary: black;
              --el-datepicker-active-color: black;
            "
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
          <el-button
            style="--el-color-primary: black"
            size="large"
            @click="clearInf()"
            >Clear</el-button
          >
          <el-button
            style="--el-color-primary: black; --el-button-hover-bg-color: black"
            type="primary"
            @click="search()"
            size="large"
            >Search</el-button
          >
        </div>
      </div>
    </div>
    <div class="right-box">
      <div class="header">
        <h2>Search Tips For Advanced Search</h2>
        <h3 style="margin: 15px 0">Search Type</h3>
        <p class="tips">
          In advanced search, only one type of search is allowed for each search
          session, which includes articles, authors, institutions, and fields.
          After selecting the search type, the corresponding content of the
          search constraint will be changed accordingly.
        </p>
        <h3 style="margin: 15px 0">Search Constraint</h3>
        <p class="tips">
          There must be at least one search constraint and up to seven
          constraints. You can click the "Add" button behind the first
          constraint to add a new one, or click the "Remove" button behind a
          constraint to delete it.
        </p>
        <p class="tips">
          Each search constraint consists of four parts. Firstly, you need to
          select the search relationship (AND, OR, or NOT) to narrow down or
          expand the scope of the search. Then, based on the selected type in
          the search type section, you can choose the corresponding constraint
          label and enter the search content. Finally, you can choose between
          precise search or fuzzy search to match the inputted search content.
        </p>
        <h3 style="margin: 15px 0">Publication Date</h3>
        <p class="tips">
          In the publication date section, you can choose "All Dates" to search
          for articles published at any time, or select "Custom Range" to choose
          a specific time period for publication. The time selector allows you
          to conveniently select articles published in the last month, last six
          months, or last year.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { ref, onMounted } from "vue";
import TopNav from "../../components/HomePage/TopNav.vue";
import { ElDialog, ElForm, ElInput, ElButton, ElMessage } from "element-plus";
import { el } from "element-plus/es/locale";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
const Store = useStore();
const searchType = ref(0);
//搜索类型选择
function clearAndChange() {
  //实际上操作的是同一个list
  if (searchType.value === 0) {
    list.value = articleList.value;
  } else if (searchType.value === 1) {
    list.value = authorList.value;
  } else if (searchType.value === 2) {
    list.value = institutionList.value;
  } else if (searchType.value === 3) {
    list.value = subjectList.value;
  }
}
//过滤器选择
const list = ref([{ content: "", select: "Title", type: "AND", clear: 0 }]);
const articleList = ref([
  { content: "", select: "Title", type: "AND", clear: 0 },
  { content: "", select: "Abstract", type: "AND", clear: 0 },
]);
const authorList = ref([
  { content: "", select: "Name", type: "AND", clear: 0 },
  { content: "", select: "Domain", type: "AND", clear: 0 },
]);
const institutionList = ref([
  { content: "", select: "Name", type: "AND", clear: 0 },
  { content: "", select: "Acronyms", type: "AND", clear: 0 },
]);
const subjectList = ref([
  { content: "", select: "Name", type: "AND", clear: 0 },
  { content: "", select: "Description", type: "AND", clear: 0 },
]);
list.value = articleList.value;
function addRow(row) {
  if (list.value.length >= 7) {
    return;
  }
  if (searchType.value === 0) {
    list.value.push({ content: "", select: "Title", type: "AND", clear: 0 });
  } else if (searchType.value === 1) {
    list.value.push({ content: "", select: "Name", type: "AND", clear: 0 });
  } else if (searchType.value === 2) {
    list.value.push({ content: "", select: "Name", type: "AND", clear: 0 });
  } else if (searchType.value === 3) {
    list.value.push({ content: "", select: "Name", type: "AND", clear: 0 });
  }
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
const router = useRouter();
function search() {
  // 先删除掉空的搜索条件
  list.value = list.value.filter((item) => item.content !== "");
  if (list.value.length == 0) {
    ElMessage.error("Please enter at least one search constraint!");
    return;
  }
  var begin;
  var end;
  // 根据 type 字段进行分类整合
  const and_list = list.value
    .filter((item) => item.type === "AND")
    .map((item) => {
      const { type, ...rest } = item;
      return rest;
    });

  const or_list = list.value
    .filter((item) => item.type === "OR")
    .map((item) => {
      const { type, ...rest } = item;
      return rest;
    });

  const not_list = list.value
    .filter((item) => item.type === "NOT")
    .map((item) => {
      const { type, ...rest } = item;
      return rest;
    });
  if (timeSelect.value == "AllDates") {
    begin = "";
    end = "";
  } else {
    begin = timePick.value[0];
    end = timePick.value[1];
  }
  const data = {
    searchType: searchType.value,
    and_list: and_list,
    or_list: or_list,
    not_list: not_list,
    start_time: begin,
    end_time: end,
  };
  Store.commit("setAdvancedSearch", data);
  router.push({
    path: "/searchResult",
  });
}
function clearInf() {
  searchType.value = 0;
  //还原成开始的列表
  articleList.value = [
    { content: "", select: "Title", type: "AND", clear: 0 },
    { content: "", select: "Abstract", type: "AND", clear: 0 },
  ];
  authorList.value = [
    { content: "", select: "Name", type: "AND", clear: 0 },
    { content: "", select: "Domain", type: "AND", clear: 0 },
  ];
  institutionList.value = [
    { content: "", select: "Name", type: "AND", clear: 0 },
    { content: "", select: "Acronyms", type: "AND", clear: 0 },
  ];
  subjectList.value = [
    { content: "", select: "Name", type: "AND", clear: 0 },
    { content: "", select: "Description", type: "AND", clear: 0 },
  ];
  list.value = articleList.value;
  timeSelect.value = "AllDates";
  timePick.value = "";
}
</script>
<style scoped>
.main-box {
  padding-top: 65px;
}
.left-box {
  width: 64%;
  min-height: 500px;
  height: 100%;
  float: left;
}
.right-box {
  width: 33%;
  margin-left: 2%;
  margin-right: 1%;
  min-height: 500px;
  height: 100%;
  float: right;
}
.header {
  margin: 30px 0;
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
.tips {
  line-height: 30px;
  margin-bottom: 15px;
}
</style>
