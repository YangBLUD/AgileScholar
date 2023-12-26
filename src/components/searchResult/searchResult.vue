<template>
  <div>
    <TopNav />
  </div>
  <div style="padding-top: 65px">
    <div class="main">
      <div class="second">
        <div class="second-search-results">
          <span>Search Results</span>
        </div>
        <div class="second-search-form">
          <div class="content-search">
            <input type="" name="" placeholder="Search" class="content-search-input" v-model="searchcontent" />
            <el-icon :size="22" color="#808080" @click="keysearch()">
              <search />
            </el-icon>
          </div>
          <div style="
              float: right;
              cursor: pointer;
              margin-right: 5px;
              margin-top: 10px;
              color: aliceblue;
            " @click="$router.push({ path: '/advanced' })" class="Advance">
            <h5 style="font-size: 16px">Advanced Search</h5>
          </div>
        </div>
      </div>
      <div class="middle">
        <div class="middle-left">
          <div style="
              font-size: 25px;
              font-weight: bold;
              margin-left: 90px;
              margin-bottom: 10px;
              color: rgb(84, 84, 84);
            ">
            Filters
          </div>
          <div v-if="search_type === 0" class="middle-left-people">
            <Droplist :agginfo="timeagg" class="drop1" @click="getaggagain(0)" />
            <Droplist :agginfo="writeragg" class="drop1" @click="getaggagain(1)" />
            <Droplist :agginfo="sourceagg" class="drop1" @click="getaggagain(2)" />
            <Droplist :agginfo="domainagg" class="drop1" @click="getaggagain(3)" />
            <Droplist :agginfo="typeagg" class="drop1" @click="getaggagain(4)" />
          </div>
          <div v-if="search_type === 1" class="middle-left-people">
            <Droplist :agginfo="nameAgg" class="drop1" @click="getaggagain(0)" />
            <Droplist :agginfo="institutionAgg" class="drop1" @click="getaggagain(0)" />
          </div>
          <div v-if="search_type === 2" class="middle-left-people">
            <Droplist :agginfo="countryAgg" class="drop1" @click="getaggagain(0)" />
            <Droplist :agginfo="type_institution_Agg" class="drop1" @click="getaggagain(0)" />
            <Droplist :agginfo="domain_institution_Agg" class="drop1" @click="getaggagain(0)" />
          </div>
          <div v-if="search_type === 3" class="middle-left-people">
            <Droplist :agginfo="levelAgg" class="drop1" @click="getaggagain(0)" />
          </div>
        </div>
        <div class="middle-right">
          <!-- 右侧列表 -->
          <div class="middle-right-sum">
            <div class="first-line">
              <div class="search-num">
                <div style="
                    font-family: Merriweather Sans, sans-serif;
                    font-weight: normal;
                    font-style: italic;
                    font-size: 18px;
                  " v-if="totalpage == 10000">
                  {{ totalpage }}+&nbsp;
                </div>
                <div style="
                    font-family: Merriweather Sans, sans-serif;
                    font-weight: normal;
                    font-style: italic;
                    font-size: 18px;
                  " v-else>
                  {{ totalpage }}&nbsp;
                </div>
                <div style="
                    font-family: Merriweather Sans, sans-serif;
                    font-weight: 300;
                    font-style: italic;
                    font-size: 18px;
                  ">
                  Results for:
                </div>
                <div style="
                    position: relative;
                    top: -2px;
                    font-family: Merriweather Sans, sans-serif;
                    font-weight: bold;
                    font-style: italic;
                    font-size: 20px;
                  ">
                  &nbsp;All: {{ search_title }}
                </div>
              </div>
            </div>
            <div class="sum-text">
              <span class="text-first">
                Searched The Full-Text Collection (<span style="font-weight: normal">{{ totalpage }}</span>
                records) &nbsp;
              </span>
              <!-- <div class="text-second">
                Expand to The ACM Guide to Computing Literature (<span style="font-weight: normal">3,605,660</span>
                records)
              </div> -->
            </div>
          </div>
          <div class="search-result-tabs">
            <div class="nav-container">
              <el-tabs v-if="!isadvance" v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="RESULTS" name="RESULTS"></el-tab-pane>
                <el-tab-pane label="SCHOLARS" name="SCHOLARS"></el-tab-pane>
                <el-tab-pane label="INSTITUTIONS" name="INSTITUTIONS"></el-tab-pane>
                <el-tab-pane label="SUBJECTS" name="SUBJECTS"></el-tab-pane>
              </el-tabs>
            </div>
            <div class="nav-result">
              Showing
              <span style="font-style: italic; font-weight: bold">{{
                search_from
              }}</span>
              -
              <span style="font-style: italic; font-weight: bold">{{
                search_to
              }}</span>
              of
              <span style="font-style: italic; font-weight: bold">{{
                totalpage
              }}</span>&nbsp;Results
            </div>
          </div>
          <div class="search-result-checkbox">
            <div class="shai-checkbox">
              <!-- <el-checkbox /> -->
            </div>
            <div class="select-all" @click="withoutagg()" v-if="search_work_clustering !== -1">
              &lt; Return Normal
            </div>
            <div class="select-all" v-if="search_work_clustering === -1">
            </div>
            <div class="per-page">
              per page&nbsp;&nbsp;:&nbsp;&nbsp;
              <div v-if="papernum == 10" class="page-num-active">10</div>
              <div v-else class="page-num-com" @click="changeSize(10)">10</div>

              <div v-if="papernum == 20" class="page-num-active">20</div>
              <div v-else class="page-num-com" @click="changeSize(20)">20</div>

              <div v-if="papernum == 30" class="page-num-active">30</div>
              <div v-else class="page-num-com" @click="changeSize(30)">30</div>
            </div>
            <div class="drop-choice">
              <el-col :span="12">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" @click="dropsort()">{{
                    search_text
                  }}</span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item :key="index" v-for="(item, index) in sortlist" @click="changesort(item)">{{
                        item.text }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-col>
            </div>
          </div>
          <div class="middle-right-list">
            <div v-if="search_type == 0" class="paper-list" :key="index" v-for="(item, index) in paper_list">
              <div class="list-item">
                <div class="checkbox">
                  <el-checkbox />
                </div>
                <div class="context">
                  <Content :info="item" :token="token" />
                </div>
              </div>
            </div>
            <div v-if="search_type == 1" class="people-list">
              <div class="people-item" :key="index" v-for="(item, index) in paper_list">
                <Scholars :info="item" :token="token"></Scholars>
              </div>
            </div>
            <div v-if="search_type == 2" class="people-list">
              <div class="people-item" :key="index" v-for="(item, index) in paper_list">
                <Institutions :info="item" :token="token"></Institutions>
              </div>
            </div>
            <div v-if="search_type == 3" class="people-list">
              <div class="people-item" :key="index" v-for="(item, index) in paper_list">
                <Subjects :info="item" :token="token"></Subjects>
              </div>
            </div>
            <div class="bottom-page">
              <div class="example-pagination-block">
                <el-pagination layout="prev, pager, next" :page-count="totalye" v-model:current-page="currentPage"
                  @current-change="currentChange" @prev-click="prevClick" @next-click="nextClick" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-dialog id="important_progress" v-model="importantProgress" style="
      width: 20%;
      right: 0%;
      height: 0;
      opacity: 100%;
      top: 10%;
      background-color: #7e7e7f !important;
      border: 0px solid #7e7e7f !important;
    " :close-on-click-modal="false" :show-close="false">
    <div class="spinner-box">
      <div class="blue-orbit leo"></div>

      <div class="green-orbit leo"></div>

      <div class="red-orbit leo"></div>

      <div class="white-orbit w1 leo"></div>
      <div class="white-orbit w2 leo"></div>
      <div class="white-orbit w3 leo"></div>
    </div>
  </el-dialog>
</template>
<script setup>
import { reactive, ref, onMounted, onBeforeMount, watch } from "vue";
import TopNav from "../../components/HomePage/TopNav.vue";
import axios from "axios";
import Content from "./paperContent.vue";
import Droplist from "./droplist.vue";
import Scholars from "./scholars.vue";
import Institutions from "./institution.vue";
import Subjects from "./subject.vue";
import { Search, ArrowLeft } from "@element-plus/icons-vue";
import { useStore } from "vuex";
const Store = useStore();
import { useRouter } from "vue-router";
const router = useRouter();

const token = ref("");
const isadvance = ref(false);
//额外的请求参数
const search_type = ref(0);
const search_first_search = ref(0);
const search_work_clustering = ref(-1);
const search_author_clustering = ref(0);
const search_sort = ref(0);
const search_text = ref("Cited down");
const search_extend_list = ref([]);
//用于论文列表的渲染
const paper_list = ref([]);
const search_title = ref("");
//搜索框
const searchcontent = ref("AI");
const importantProgress = ref(false);
function start() {
  isadvance.value = Store.getters.getSearch.isAdvancedSearch;
  if (!isadvance.value) {
    Store.commit("settype", search_type);
  }
  search_type.value = Store.getters.getSearch.searchType;
  searchcontent.value = Store.getters.getSearch.and_list[0].content;
  search_title.value = Store.getters.getSearch.and_list[0].content;
  token.value = Store.getters.getUserinfo.token;
}

//初始化函数
onBeforeMount(() => {
  start();
  getpaperlist();
  dropsort();
});

//核心函数
function getpaperlist() {
  console.log("iiiiiiiiiiii");
  console.log({
    token: Store.getters.getUserinfo.token,
    search_type: Store.getters.getSearch.searchType,
    and_list: Store.getters.getSearch.and_list,
    or_list: Store.getters.getSearch.or_list,
    not_list: Store.getters.getSearch.not_list,
    start_time: Store.getters.getSearch.start_time,
    end_time: Store.getters.getSearch.end_time,
    first_search: search_first_search.value,
    work_clustering: search_work_clustering.value,
    author_clustering: search_author_clustering.value,
    size: papernum.value,
    from: search_from.value - 1,
    sort: search_sort.value,
    extend_list: search_extend_list.value,
  });
  importantProgress.value = true;
  axios({
    url: "http://122.9.5.156:8000/api/v1/search_result/search",
    method: "post",
    data: JSON.stringify({
      token: Store.getters.getUserinfo.token,
      search_type: Store.getters.getSearch.searchType,
      and_list: Store.getters.getSearch.and_list,
      or_list: Store.getters.getSearch.or_list,
      not_list: Store.getters.getSearch.not_list,
      start_time: Store.getters.getSearch.start_time,
      end_time: Store.getters.getSearch.end_time,
      first_search: search_first_search.value,
      work_clustering: search_work_clustering.value,
      author_clustering: search_author_clustering.value,
      size: papernum.value,
      from: search_from.value - 1,
      sort: search_sort.value,
      extend_list: search_extend_list.value,
    }),
  })
    .then((res) => {
      let data = res.data.data;
      console.log(search_first_search.value);
      importantProgress.value = false;
      paper_list.value = data.result;
      totalpage.value = data.total;
      // search_from.value = Math.max(1,papernum.value);
      search_to.value = Math.min(data.total, papernum.value);
      totalye.value = parseInt(totalpage.value / papernum.value) + 1;
      if (search_type.value == 0) {
        if (search_work_clustering.value == 0) {
          timeagg.value.data = dealagg(data.agg[0].data, "Publication Date");
          writeragg.value.data = [];
          sourceagg.value.data = [];
          domainagg.value.data = [];
          typeagg.value.data = [];
        } else if (search_work_clustering.value == 1) {
          writeragg.value.data = dealagg(data.agg[0].data, "Main Author");
          timeagg.value.data = [];
          sourceagg.value.data = [];
          domainagg.value.data = [];
          typeagg.value.data = [];
        } else if (search_work_clustering.value == 2) {
          sourceagg.value.data = dealagg(data.agg[0].data, "Source");
          timeagg.value.data = [];
          writeragg.value.data = [];
          domainagg.value.data = [];
          typeagg.value.data = [];
        } else if (search_work_clustering.value == 3) {
          domainagg.value.data = dealagg(data.agg[0].data, "Main Domain");
          timeagg.value.data = [];
          writeragg.value.data = [];
          sourceagg.value.data = [];
          typeagg.value.data = [];
        } else if (search_work_clustering.value == 4) {
          typeagg.value.data = dealagg(data.agg[0].data, "Type");
          timeagg.value.data = [];
          writeragg.value.data = [];
          sourceagg.value.data = [];
          domainagg.value.data = [];
        }
        search_extend_list.value = [];
      } else if (search_type.value === 1) {
        console.log(data);
        nameAgg.value.data = dealagg(data.agg[0].data, "Name");
        institutionAgg.value.data = dealagg(
          data.agg[1].data,
          "Institution"
        );
        search_extend_list.value = [];
      } else if (search_type.value === 2) {
        countryAgg.value.data = dealagg(data.agg[0].data, "Country Code");
        type_institution_Agg.value.data = dealagg(
          data.agg[1].data,
          "Institution Type"
        );
        domain_institution_Agg.value.data = dealagg(
          data.agg[2].data,
          "Main Domain"
        );
        search_extend_list.value = [];
      } else if (search_type.value === 3) {
        levelAgg.value.data = dealagg(data.agg[0].data, "Level");
        search_extend_list.value = [];
      } else {
        agg.value = [];
        for (let i = 0; i < data.agg.length; i++) {
          agg.value.push({
            name: data.agg[i].name,
            text: data.agg[i].text,
            data: dealagg(data.agg[i].data, data.agg[i].name),
          });
        }
        search_extend_list.value = [];
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
//搜索函数
function keysearch() {
  if (isadvance.value) {
    router.push({ path: "home" });
  }
  const data1 = {
    searchType: search_type.value,
    keyword: searchcontent.value,
  };
  Store.commit("setGeneralSearch", data1);
  search_title.value = searchcontent.value;
  search_sort.value = 0;
  timeagg.value.data = [];
  writeragg.value.data = [];
  sourceagg.value.data = [];
  domainagg.value.data = [];
  typeagg.value.data = [];
  nameAgg.value.data = [];
  institutionAgg.value.data = [];
  countryAgg.value.data = [];
  domain_institution_Agg.value.data = [];
  type_institution_Agg.value.data = [];
  levelAgg.value.data = [];
  search_text.value = "Cited down";
  search_work_clustering.value = -1;
  getpaperlist();
}

//下一行的滑动
const activeName = ref("RESULTS");
const handleClick = (tab, event) => {
  if (tab.props.name == "RESULTS") {
    search_type.value = 0;
  } else if (tab.props.name == "SCHOLARS") {
    search_type.value = 1;
  } else if (tab.props.name == "INSTITUTIONS") {
    search_type.value = 2;
  } else if (tab.props.name == "SUBJECTS") {
    search_type.value = 3;
  }
  Store.commit("setGeneralSearch", {
    searchType: search_type.value,
    keyword: searchcontent.value,
  });
  search_first_search.value = 0;
  search_extend_list.value = [];
  timeagg.value.data = [];
  writeragg.value.data = [];
  sourceagg.value.data = [];
  domainagg.value.data = [];
  typeagg.value.data = [];
  nameAgg.value.data = [];
  institutionAgg.value.data = [];
  countryAgg.value.data = [];
  domain_institution_Agg.value.data = [];
  type_institution_Agg.value.data = [];
  levelAgg.value.data = [];
  search_work_clustering.value = -1;
  getpaperlist();
  resetpage();
};
const totalye = ref(0);

//选择显示论文的条数
const papernum = ref(20);
const search_to = ref(20);
const search_from = ref(1);

function changeSize(size) {
  papernum.value = size;
  resetpage();
  getpaperlist();
  search_to.value = search_from.value + (papernum.value - 1);
}
function resetpage() {
  search_from.value = 1;
  search_to.value = search_from.value + papernum.value;
}
//翻页功能的实现
const currentPage = ref(1);
const totalpage = ref(0);
const currentChange = () => {
  search_from.value = (currentPage.value - 1) * papernum.value + 1;
  search_to.value = currentPage.value * papernum.value;
  getpaperlist();
};

//点击左边一页, 切换呈现<新的页码-1>号子数组
const prevClick = () => {
  currentPage.value - 1;
  search_from.value = (currentPage.value - 1) * papernum.value + 1;
  search_to.value = currentPage.value * papernum.value;
  getpaperlist();
};

//点击向右一页, 切换呈现<新的页码+1>号子数组
const nextClick = () => {
  currentPage.value + 1;
  search_from.value = (currentPage.value - 1) * papernum.value + 1;
  search_to.value = currentPage.value * papernum.value;
  getpaperlist();
};

//左侧的聚类
const agg = ref([]);
function getCluster() {
  return Store.getters.getCluster;
}
watch(
  getCluster,
  (newVal, oldVal) => {
    console.log("newVal, oldVal", newVal, oldVal);
    if (newVal.agg_text === "" && newVal.agg_raw === "") {
      return;
    }
    getnewagg();
  },
  { deep: true }
);
function getnewagg() {
  let pp = getCluster();
  search_extend_list.value = [];
  search_extend_list.value.push({
    text: pp.agg_text,
    value: pp.agg_raw,
  });
  search_first_search.value = 0;
  getpaperlist();
  search_first_search.value = 0;
  resetpage();
}
//取消聚类的搜索
function withoutagg() {
  search_extend_list.value = [];
  Store.commit("setaggtext", "");
  Store.commit("setaggraw", "");
  timeagg.value.data = [];
  writeragg.value.data = [];
  sourceagg.value.data = [];
  domainagg.value.data = [];
  typeagg.value.data = [];
  nameAgg.value.data = [];
  institutionAgg.value.data = [];
  countryAgg.value.data = [];
  domain_institution_Agg.value.data = [];
  type_institution_Agg.value.data = [];
  levelAgg.value.data = [];
  search_work_clustering.value = -1;
  getpaperlist();
  search_first_search.value = 0;
  resetpage();
}

//关于聚类的更改
const timeagg = ref({
  name: "Publication Date",
  text: "publication_date",
  data: [],
});
const writeragg = ref({ name: "Main Author", text: "author_main", data: [] });
const sourceagg = ref({ name: "Source", text: "source", data: [] });
const domainagg = ref({ name: "Main Domain", text: "domain_main", data: [] });
const typeagg = ref({ name: "Type", text: "type_num", data: [] });
// scholar
const nameAgg = ref({ name: "Name", text: "display_name", data: [] });
const institutionAgg = ref({
  name: "Institution",
  text: "institution",
  data: [],
});
const countryAgg = ref({ name: "Country", text: "country_code", data: [] });
const type_institution_Agg = ref({ name: "Type", text: "type", data: [] });
const domain_institution_Agg = ref({
  name: "Main Domain",
  text: "domain_main",
  data: [],
});
const levelAgg = ref({ name: "Level", text: "level", data: [] });
function getaggagain(type) {
  if (Store.getters.getOutConditon === false) {
    Store.commit("setOutCondition", true);
    return;
  }
  if (type === search_work_clustering.value) {
    return;
  }
  search_extend_list.value = [];
  search_first_search.value = 1;
  // if(type == 0 && timeagg.value.data.length != 0){
  //     timeagg.value.data = [];
  //     return;
  // }
  // else if(type == 1 && writeragg.value.data.length != 0){
  //     writeragg.value.data = [];
  //     return;
  // }
  // else if(type == 2 && sourceagg.value.data.length != 0){
  //     sourceagg.value.data = [];
  //     return;
  // }
  // else if(type == 3 && domainagg.value.data.length != 0){
  //     domainagg.value.data = [];
  //     return;
  // }
  // else if(type == 4 && typeagg.value.data.length != 0){
  //     typeagg.value.data = [];
  //     return;
  // }

  search_work_clustering.value = type;
  getpaperlist();
  search_first_search.value = 0;
  Store.commit("setaggtext", "");
  Store.commit("setaggraw", ""); Store.commit("setaggtext", "");
  Store.commit("setaggraw", "");
}
function dealagg(datalist, type) {
  let results = [];
  if (
    type == "Main Author" ||
    type == "Source" ||
    type == "Main Domain" ||
    type == "Institution"
  ) {
    for (let i = 0; i < datalist.length; i++) {
      let pp = datalist[i].raw.indexOf("&");
      let tmp = datalist[i].raw.substring(0, pp);
      results.push({
        show: tmp,
        raw: datalist[i].raw,
        value: datalist[i].value,
      });
    }
  } else if (
    type == "Publication Date" ||
    type == "Name" ||
    type == "Country Code" ||
    type == "Institution Type"
  ) {
    for (let i = 0; i < datalist.length; i++) {
      results.push({
        show: datalist[i].raw,
        raw: datalist[i].raw,
        value: datalist[i].value,
      });
    }
  } else if (type == "Type") {
    for (let i = 0; i < datalist.length; i++) {
      let pp = parseInt(datalist[i].raw);
      let abs,
        sou,
        land,
        pdf,
        tmp = "";
      abs = parseInt(pp / 1000);
      pp %= 1000;
      sou = parseInt(pp / 100);
      pp %= 100;
      land = parseInt(pp / 10);
      pp %= 10;
      pdf = pp;
      if (abs == 1) tmp += "abstract ";
      if (sou == 1) tmp += "source ";
      if (land == 1) tmp += "landing_page_url ";
      if (pdf == 1) tmp += "pdf_url ";
      results.push({
        show: tmp,
        raw: datalist[i].raw,
        value: datalist[i].value,
      });
    }
  } else if (type == "Level") {
    for (let i = 0; i < datalist.length; i++) {
      results.push({
        show: "level " + datalist[i].raw,
        raw: datalist[i].raw,
        value: datalist[i].value,
      });
    }
  }
  return results;
}
//下拉框排序
const sortlist = ref([]);
function dropsort() {
  sortlist.value = [];
  if (search_type.value == 0) {
    sortlist.value.push({ id: -1, text: "Correlation" });
    sortlist.value.push({ id: 0, text: "Cited down" });
    sortlist.value.push({ id: 1, text: "Cited up" });
    sortlist.value.push({ id: 2, text: "Time down" });
    sortlist.value.push({ id: 3, text: "Time up" });
    sortlist.value.push({ id: 4, text: "Title down" });
    sortlist.value.push({ id: 5, text: "Title up" });
  } else if (search_type.value == 1 || search_type.value == 2) {
    sortlist.value.push({ id: -1, text: "Correlation" });
    sortlist.value.push({ id: 0, text: "Cited down" });
    sortlist.value.push({ id: 1, text: "Cited up" });
    sortlist.value.push({ id: 2, text: "Index down" });
    sortlist.value.push({ id: 3, text: "Index up" });
    sortlist.value.push({ id: 4, text: "More than 10 in 2" });
    sortlist.value.push({ id: 5, text: "More than 10 in 5" });
    sortlist.value.push({ id: 6, text: "Results down" });
    sortlist.value.push({ id: 7, text: "Results up" });
    sortlist.value.push({ id: 8, text: "Name down" });
    sortlist.value.push({ id: 9, text: "Name up" });
  } else if (search_type.value == 3) {
    sortlist.value.push({ id: -1, text: "Correlation" });
    sortlist.value.push({ id: 0, text: "Index down" });
    sortlist.value.push({ id: 1, text: "Index up" });
    sortlist.value.push({ id: 2, text: "Results down" });
    sortlist.value.push({ id: 3, text: "Results up" });
    sortlist.value.push({ id: 4, text: "Level down" });
    sortlist.value.push({ id: 5, text: "Level up" });
    sortlist.value.push({ id: 6, text: "Name down" });
    sortlist.value.push({ id: 7, text: "Name up" });
  }
}
function changesort(item) {
  search_sort.value = item.id;
  search_text.value = item.text;
  getpaperlist();
}
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(359deg);
  }
}

@keyframes spin3D {
  from {
    transform: rotate3d(0.5, 0.5, 0.5, 360deg);
  }

  to {
    transform: rotate3d(0deg);
  }
}

@keyframes configure-clockwise {
  0% {
    transform: rotate(0);
  }

  25% {
    transform: rotate(90deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(270deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes configure-xclockwise {
  0% {
    transform: rotate(45deg);
  }

  25% {
    transform: rotate(-45deg);
  }

  50% {
    transform: rotate(-135deg);
  }

  75% {
    transform: rotate(-225deg);
  }

  100% {
    transform: rotate(-315deg);
  }
}

@keyframes pulse {
  from {
    opacity: 1;
    transform: scale(1);
  }

  to {
    opacity: 0.25;
    transform: scale(0.75);
  }
}

.spinner-box {
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}

/* SPINNING CIRCLE */

.leo-border-1 {
  position: absolute;
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(63, 249, 220);
  background: linear-gradient(0deg,
      rgba(63, 249, 220, 0.1) 33%,
      rgba(63, 249, 220, 1) 100%);
  animation: spin3D 1.8s linear 0s infinite;
}

.leo-core-1 {
  width: 100%;
  height: 100%;
  background-color: #37474faa;
  border-radius: 50%;
}

.leo-border-2 {
  position: absolute;
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(251, 91, 83);
  background: linear-gradient(0deg,
      rgba(251, 91, 83, 0.1) 33%,
      rgba(251, 91, 83, 1) 100%);
  animation: spin3D 2.2s linear 0s infinite;
}

.leo-core-2 {
  width: 100%;
  height: 100%;
  background-color: #1d2630aa;
  border-radius: 50%;
}

/* ALTERNATING ORBITS */

.circle-border {
  width: 150px;
  height: 150px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(63, 249, 220);
  background: linear-gradient(0deg,
      rgba(63, 249, 220, 0.1) 33%,
      rgba(63, 249, 220, 1) 100%);
  animation: spin 0.8s linear 0s infinite;
}

.circle-core {
  width: 100%;
  height: 100%;
  background-color: #1d2630;
  border-radius: 50%;
}

/* X-ROTATING BOXES */

.configure-border-1 {
  width: 115px;
  height: 115px;
  padding: 3px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fb5b53;
  animation: configure-clockwise 3s ease-in-out 0s infinite alternate;
}

.configure-border-2 {
  width: 115px;
  height: 115px;
  padding: 3px;
  left: -115px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(63, 249, 220);
  transform: rotate(45deg);
  animation: configure-xclockwise 3s ease-in-out 0s infinite alternate;
}

.configure-core {
  width: 100%;
  height: 100%;
  background-color: #1d2630;
}

/* PULSE BUBBLES */

.pulse-container {
  width: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pulse-bubble {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #3ff9dc;
}

.pulse-bubble-1 {
  animation: pulse 0.4s ease 0s infinite alternate;
}

.pulse-bubble-2 {
  animation: pulse 0.4s ease 0.2s infinite alternate;
}

.pulse-bubble-3 {
  animation: pulse 0.4s ease 0.4s infinite alternate;
}

/* SOLAR SYSTEM */

.solar-system {
  width: 250px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.orbit {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #fafbfc;
  border-radius: 50%;
}

.earth-orbit {
  width: 165px;
  height: 165px;
  -webkit-animation: spin 12s linear 0s infinite;
}

.venus-orbit {
  width: 120px;
  height: 120px;
  -webkit-animation: spin 7.4s linear 0s infinite;
}

.mercury-orbit {
  width: 90px;
  height: 90px;
  -webkit-animation: spin 3s linear 0s infinite;
}

.planet {
  position: absolute;
  top: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3ff9dc;
}

.sun {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #ffab91;
}

.leo {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}

.blue-orbit {
  width: 165px;
  height: 165px;
  border: 1px solid #91daffa5;
  -webkit-animation: spin3D 3s linear 0.2s infinite;
}

.green-orbit {
  width: 120px;
  height: 120px;
  border: 1px solid #91ffbfa5;
  -webkit-animation: spin3D 2s linear 0s infinite;
}

.red-orbit {
  width: 90px;
  height: 90px;
  border: 1px solid #ffca91a5;
  -webkit-animation: spin3D 1s linear 0s infinite;
}

.white-orbit {
  width: 60px;
  height: 60px;
  border: 2px solid #ffffff;
  -webkit-animation: spin3D 10s linear 0s infinite;
}

.w1 {
  transform: rotate3D(1, 1, 1, 90deg);
}

.w2 {
  transform: rotate3D(1, 2, 0.5, 90deg);
}

.w3 {
  transform: rotate3D(0.5, 1, 2, 90deg);
}

.three-quarter-spinner {
  width: 50px;
  height: 50px;
  border: 3px solid #fb5b53;
  border-top: 3px solid transparent;
  border-radius: 50%;
  animation: spin 0.5s linear 0s infinite;
}

ul {
  list-style: none;
}

.main {
  list-style-type: none;
}

.second {
  top: 0px;
  height: 150px;
  background-image: url("../../assets/border.jpg");
  display: flex;
  padding: 0px 100px;
  margin-bottom: 50px;

  .second-search-results {
    padding: 40px 80px;
    font-size: 50px;
    font-weight: 600;
    color: white;
  }

  .second-search-form {
    position: relative;
    top: 10px;
    padding: 40px 80px;
    font-size: 50px;
    font-weight: 600;
    color: white;
    display: flex;

    .content-search {
      position: relative;
      left: 180px;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      width: 450px;
      height: 45px;
      background: #f0f2f4;
      border-radius: 8px;

      .content-search-input {
        font-size: 20px;
        padding: 0 10px;
        width: 530px;
        height: 50px;
        border: 0;
        border-radius: 8px;
        background: #f0f2f4;
        color: #808080;
        font-size: 16px;
        outline: none;
      }
    }
  }
}

.middle {
  width: 1200px;
  height: 100px;
  margin: 0 auto;
  display: flex;

  .middle-left {
    width: 25%;

    .drop1 {
      margin-bottom: 5px;
    }
  }

  .middle-right {
    width: 75%;
    /* display: flex; */

    .middle-right-sum {
      height: 70px;

      display: inline;

      .first-line {
        display: flex;
        margin-bottom: 10px;

        .search-num {
          font-size: 20px;
          font-weight: 400;
          display: flex;
        }

        .sum-button {
          position: relative;
          left: 20px;
          display: flex;
          width: 70%;
        }
      }

      .sum-text {
        font-size: 15px;
        font-weight: 100;
        height: 50px;
        width: 100%;
        border-bottom: 1px solid #e6e6e6;
        display: flex;

        .text-first {
          font-family: Merriweather Sans, sans-serif;
          font-style: italic;
          width: 43%;
        }

        .text-second {
          position: relative;
          font-family: Merriweather Sans, sans-serif;
          font-style: italic;
          color: #0077c2;
          left: -26px;
          top: 1px;
          width: 55%;
        }
      }
    }

    .search-result-tabs {
      height: 50px;
      width: 100%;
      display: flex;
      margin: auto 0;
      background-color: #fafafa;

      .nav-container {
        left: 20%;
        width: 50%;
        margin: auto 0;

        .demo-tabs {
          padding-left: 10px;
        }
      }

      .nav-result {
        font-family: Merriweather Sans, sans-serif;
        position: relative;
        top: -3px;
        left: 20%;
        width: 30%;
        margin: auto 0;
      }
    }

    .search-result-checkbox {
      height: 70px;
      display: flex;
      border-bottom: 1px solid #fdfdfd;

      .shai-checkbox {
        margin-top: 20px;
        position: relative;
        left: 5px;
      }

      .select-all {
        margin: 18px 20px;
        font-size: 15px;
        color: rgb(51, 117, 188);
        font-weight: 500;
        width: 160px;
        cursor: pointer;
        transition: ease 0.3s;
      }

      .select-all:hover {
        transform: scale(1.1);
        transition: ease 0.3s;
      }

      .per-page {
        margin-top: 25px;
        position: relative;
        padding-right: 10px;
        left: 46%;
        height: 30px;
        font-size: 15px;
        font-weight: 400;
        color: black;
        border-right: 2px solid #e6e6e6;
        display: flex;
        font-family: Merriweather Sans, sans-serif;

        .page-num-com {
          margin-right: 15px;
          cursor: pointer;
        }

        .page-num-active {
          margin-right: 15px;
          font-weight: 600;
          cursor: pointer;
        }
      }

      .drop-choice {
        position: relative;
        left: 48%;
        width: 20%;
        margin-top: 28px;

        .el-dropdown-link {
          font-weight: bold;
          cursor: pointer;
        }
      }
    }

    .middle-right-list {
      height: 180px;

      .people-list {
        margin-left: 30px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;

        .people-item {
          width: 250px;
          height: 250px;
          margin-right: 10px;
          margin-bottom: 10px;
          box-shadow: 0 0.3125rem 0.5rem rgba(0, 0, 0, 0.1);
        }
      }

      .paper-list {
        .list-item {
          margin: 20px 0px;
          width: 100%;
          height: 300px;
          display: flex;

          .checkbox {
            position: relative;
            left: 5px;
            width: 20px;
          }

          .context {
            position: relative;
            top: 0px;
            left: 20px;
            height: 100%;
            width: 95%;
            background-color: white;
            box-shadow: 0 0.3125rem 0.5rem rgba(0, 0, 0, 0.1);
          }
        }
      }

      .bottom-page {
        margin-left: 300px;
        padding-bottom: 20px;

        .example-pagination-block+.example-pagination-block {
          margin-top: 10px;
        }
      }
    }
  }
}

::v-deep .el-tabs__item {
  font-weight: bold;
  /* 你想要的字重，比如 bold 或者 normal */
}

.Advance {
  position: relative;
  left: 200px;
  top: 7px;
  cursor: pointer;
  color: aliceblue;
  transition: ease 0.3s;

  &:hover {
    transform: scale(1.1);
    transition: ease 0.3s;
  }
}
</style>
