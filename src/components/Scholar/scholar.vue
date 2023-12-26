<template>
  <div>
    <TopNav />
  </div>
  <div style="height: 65px"></div>
  <el-container class="main-container">
    <!-- 上方板块 -->
    <el-header class="main-header">
      <div class="header-content-scholar">
        <!-- 作者头像 -->
        <div class="author-avatar">
          <el-avatar :size="200" :src="circleUrl" />
        </div>
        <!-- 姓名与研究机构 -->
        <div class="author-info">
          <template v-if="authorInformation != null">
            <h2>{{ authorInformation.display_name }}</h2>
            <p class="author-attr" style="color: rgb(64, 96, 123)">
              {{ authorInformation.institution[0].name }}
            </p>
            <p class="author-attr">
              {{ authorInformation.author_email }}
            </p>
            <div style="display: flex; align-items: center; width: 500px;">
              <p v-if="!authorInformation.claimed" class="author-certificate"
                style="margin-top: 15px;margin-right: 20px; color:black">
                Scholar not certified
              </p>
              <p v-if="authorInformation.claimed" class="author-certificate">
                Scholar certified<el-button class="checkbutton" type="success" :icon="Check" circle />
              </p>
              <el-button v-if="authorInformation.claimed" @click="showAppeal" type="primary"
                class="AttrButton">Appeal</el-button>
              <el-button v-else @click="showClaim" class="AttrButton"><span
                  style="font-weight: bold;">Claim</span></el-button>
            </div>

          </template>
        </div>
        <!--        <div class="author-opt">-->
        <!--          <el-button v-if="authorInformation.claimed" @click="showAppeal" type="primary" class="AttrButton">Appeal</el-button>-->
        <!--          <el-button v-else @click="showClaim" class="AttrButton">Claim</el-button>-->
        <!--        </div>-->
      </div>
    </el-header>
    <el-dialog v-model="showAppealDialog" :lock-scroll="false">
      <template #header>
        <span class="dialog-header" style="font-weight: 600">
          Appeal against the scholar
        </span>
      </template>
      <el-form :model="appealForm">
        <el-form-item label="Reason" label-width="140px">
          <el-input v-model="appealForm.reason" type="textarea" />
        </el-form-item>
        <el-form-item label="E-mail" label-width="140px">
          <el-input v-model="appealForm.email" />
        </el-form-item>
        <el-form-item label="Captcha" label-width="140px">
          <div style="display: flex; align-items: center">
            <el-input v-model="appealForm.captcha" />
            <span style="width: 150px"></span>
            <el-button type="primary" @click="getAppealCaptcha" style="float: right">{{ appeal_captcha_time }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Appeal Material" label-width="140px">
          <el-upload class="upload-demo" drag action="" multiple :on-remove="handleAppealRemove" :file-list="fileList"
            :limit="1" :on-change="handleAppealFile" :auto-upload="false">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleAppealSubmit">Submit</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="showClaimDialog" :lock-scroll="false"><template #header>
        <span class="dialog-header" style="font-weight: 600">
          Claim to be this scholar
        </span>
      </template>
      <el-form :model="claimForm">
        <el-form-item label="Reason" label-width="140px">
          <el-input v-model="claimForm.reason" type="textarea" />
        </el-form-item>
        <el-form-item label="E-mail" label-width="140px">
          <el-input v-model="claimForm.email" />
        </el-form-item>
        <el-form-item label="Captcha" label-width="140px">
          <div style="display: flex; align-items: center">
            <el-input v-model="claimForm.captcha" />
            <span style="width: 150px"></span>
            <el-button type="primary" @click="getClaimCaptcha" style="float: right">{{ claim_captcha_time }}</el-button>
          </div>
        </el-form-item>
        <el-form-item label="Application Material" label-width="140px">
          <el-upload class="upload-demo" drag action="" multiple :on-remove="handleClaimRemove" :file-list="fileList"
            :limit="1" :on-change="handleClaimFile" :auto-upload="false">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
              Drop file here or <em>click to upload</em>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClaimSubmit">Submit</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 下方板块 -->
    <el-main class="main-content">
      <el-tabs class="tab-bar" v-model="activeTab" @tab-click="handleTabClick">
        <!-- 学术影响力分析 -->
        <el-tab-pane label="Academic Influence" name="influence" class="pane">Show the scholar's influence through charts
          and graphs</el-tab-pane>
        <!-- 发表的论文 -->
        <el-tab-pane label="Published Papers" name="papers" class="pane">Display all papers published by scholars,
          supporting retrieval and sorting</el-tab-pane>
        <!-- 学术关系网络 -->
        <el-tab-pane label="Academic Relations Network" name="network" class="pane">Show the relationship network of this
          scholar</el-tab-pane>
      </el-tabs>
      <div class="tab-content">
        <component :is="currentTabComponent" :authorInformation="authorInformation"></component>
      </div>
    </el-main>
  </el-container>
</template>

<script setup>
import {
  onMounted,
  defineAsyncComponent,
  computed,
  ref,
  reactive,
  onBeforeMount,
  watch,
} from "vue";
import { Base64 } from "js-base64";
import { encodeUtf8 } from "node-forge/lib/util.js";
import { Store, useStore } from "vuex";
import { UploadFilled } from "@element-plus/icons-vue";
import { useRoute } from "vue-router"
import {
  ElRow,
  ElCol,
  ElContainer,
  ElHeader,
  ElMain,
  ElTabs,
  ElTabPane,
  ElDialog,
  ElMessage,
  ElUpload,
} from "element-plus";
import axios from "axios";
import TopNav from "../HomePage/TopNav.vue";
import { Check, Delete, Edit } from "@element-plus/icons-vue";
import yourImage from './assets/touxiang.png';
const circleUrl = yourImage
// 标签页状态
const is_Login = ref(false);
const activeTab = ref("influence");
const Message = ref("father-messages");
const authorInformation = ref(null);
const authorId = ref();
const store = useStore();
const route = useRoute();
const tabComponents = {
  papers: defineAsyncComponent(() => import("./components/PapersTab.vue")),
  influence: defineAsyncComponent(() =>
    import("./components/InfluenceTab.vue")
  ),
  network: defineAsyncComponent(() => import("./components/NetworkTab.vue")),
  achievements: defineAsyncComponent(() =>
    import("./components/AchievementsTab.vue")
  ),
};

// 计算属性，用于动态渲染组件
const currentTabComponent = computed(() => tabComponents[activeTab.value]);

// 处理标签页点击事件
const handleTabClick = (tab, event) => {
  // 可以在这里进行点击标签页后的逻辑处理，例如数据加载等
};
// 获取学者信息的函数
const load = {
  errno: 0,
  errmsg: "success",
  data: {
    display_name: "Huobin Tan",
    domain: [
      {
        name: "Computer science",
        id: "41008148",
        level: "0",
        activity_level: "83.5",
      },
      {
        name: "Mathematics",
        id: "33923547",
        level: "0",
        activity_level: "54.1",
      },
      {
        name: "Engineering",
        id: "127413603",
        level: "0",
        activity_level: "50.6",
      },
      {
        name: "Programming language",
        id: "199360897",
        level: "1",
        activity_level: "48.2",
      },
      {
        name: "Operating system",
        id: "111919701",
        level: "1",
        activity_level: "47.1",
      },
      {
        name: "Artificial intelligence",
        id: "154945302",
        level: "1",
        activity_level: "36.5",
      },
      { name: "Biology", id: "86803240", level: "0", activity_level: "27.1" },
      { name: "Physics", id: "121332964", level: "0", activity_level: "27.1" },
      {
        name: "Machine learning",
        id: "119857082",
        level: "1",
        activity_level: "24.7",
      },
      {
        name: "Geography",
        id: "205649164",
        level: "0",
        activity_level: "24.7",
      },
      { name: "Algorithm", id: "11413529", level: "1", activity_level: "23.5" },
      {
        name: "Computer network",
        id: "31258907",
        level: "1",
        activity_level: "22.4",
      },
    ],
    institution: [{ name: "Beihang University", id: "82880672" }],
    most_cited_work: "CKAN (2020)",
    cited_by_count: 387,
    summary_stats: {
      cited_by_count: 387,
      "2yr_i10_index": 1,
      h_index: 10,
      i10_index: 10,
      oa_percent: 9.41,
      "2yr_mean_citedness": 5.6,
      works_count: 85,
      "2yr_works_count": 11,
      "2yr_h_index": 2,
      "2yr_cited_by_count": 124,
    },
    id: "5087082349",
    orcid: "https://orcid.org/0000-0003-3113-6552",
    counts_by_year: [
      { cited_by_count: 71, year: 2023, works_count: 3, oa_works_count: 0 },
      { cited_by_count: 85, year: 2022, works_count: 5, oa_works_count: 1 },
      { cited_by_count: 52, year: 2021, works_count: 6, oa_works_count: 1 },
      { cited_by_count: 25, year: 2020, works_count: 4, oa_works_count: 0 },
      { cited_by_count: 32, year: 2019, works_count: 4, oa_works_count: 2 },
      { cited_by_count: 15, year: 2018, works_count: 6, oa_works_count: 0 },
      { cited_by_count: 21, year: 2017, works_count: 2, oa_works_count: 0 },
      { cited_by_count: 16, year: 2016, works_count: 13, oa_works_count: 2 },
      { cited_by_count: 14, year: 2015, works_count: 2, oa_works_count: 0 },
      { cited_by_count: 12, year: 2014, works_count: 4, oa_works_count: 1 },
      { cited_by_count: 11, year: 2013, works_count: 2, oa_works_count: 0 },
      { cited_by_count: 7, year: 2012, works_count: 3, oa_works_count: 0 },
    ],
    claimed: true,
    undisplayed_works: [],
    is_star: false,
    self: true,
    author_email: "21371102@cdcdcd.buaa.edu.cn",
  },
};
const fetchAuthorInformation = () => {
  console.log(route.params.id)
  axios({
    url: "http://122.9.5.156:8000/api/v1/author/get_author_information",
    method: "post",
    data: JSON.stringify({
      token: store.getters.getUserinfo.token,
      author_id: route.params.id,
    }),
  })
    .then((res) => {
      console.log(res.data.data);
      store.commit("setAuthorInformation", res.data.data);
      authorInformation.value = getAuthorStates().authorInformation;
    })
    .catch((err) => {
      console.log(err);
    });
};
const fetchAuthorNetwork = () => {
  console.log(route.params.id)
  axios({
    url: "http://122.9.5.156:8000/api/v1/author/author_network",
    method: "post",
    data: JSON.stringify({
      author_id: route.params.id,
    }),
  })
    .then((res) => {
      console.log(res.data.data);
      store.commit("setAuthorNetwork", res.data.data);
      authorInformation.value = getAuthorStates().authorInformation;
    })
    .catch((err) => {
      console.log(err);
    });
};
function AddBrowsingHistory() {
  if (store.getters.getLoginState) {
    axios({
      // 接口网址：包含协议名，域名，端口和路由
      url: 'http://122.9.5.156:8000/api/v1/home/add_history',
      // 请求方式，默认为get，可以不写
      method: 'post',
      // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
      data: JSON.stringify({
        token: store.getters.getUserinfo.token,
        paper_id: route.params.id,
        type: 1,
      }),
      // 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
      if (res.data.errno === 0) {
        // console.log(res.data.data)
      }
      else {
        //ElMessage.error('出错啦，找周霄')
      }
    }).catch(err => {
      console.log(err)
    })
  }
}

function getAuthorStates() {
  return store.getters.getAuthorState;
}
onBeforeMount(async () => {
  is_Login.value = store.getters.getLoginState;
  authorId.value = route.params.id;
  fetchAuthorNetwork();
  fetchAuthorInformation();
  authorInformation.value = getAuthorStates().authorInformation;
  console.log(authorId)
});
// 在页面加载时触发请求
onMounted(async () => {
  is_Login.value = store.getters.getLoginState;
  authorId.value = route.params.id;
  console.log(route.params.id)
  fetchAuthorNetwork();
  fetchAuthorInformation();
  console.log(authorId)
});

authorId.value = route.params.id;
fetchAuthorNetwork();
fetchAuthorInformation();
authorInformation.value = getAuthorStates().authorInformation;
AddBrowsingHistory()

//申诉和认领
const showAppealDialog = ref(false);
const showClaimDialog = ref(false);
const claimHasFile = ref(false);
const appealHasFile = ref(false);
const appeal_captcha_time = ref("Get Captcha");
const claim_captcha_time = ref("Get Captcha");
const showAppeal = () => {
  showAppealDialog.value = true;
};
const showClaim = () => {
  showClaimDialog.value = true;
};
const appealForm = reactive({
  email: "",
  reason: "",
  captcha: "",
  captcha_get: "",
  email_change: false,
  file: "",
});
const claimForm = reactive({
  email: "",
  reason: "",
  captcha: "",
  captcha_get: "",
  email_change: false,
  file: "",
});
function getClaimCaptcha() {
  if (claimForm.email === "") {
    ElMessage.error("Please enter your email");
    return;
  }
  if (claim_captcha_time.value === "Get Captcha") {
    let timer;
    let mount = 60;
    timer = setInterval(() => {
      claim_captcha_time.value = mount + "s";
      mount--;
      if (mount <= 0) {
        claim_captcha_time.value = "Get Captcha";
        clearInterval(timer);
      }
    }, 1000);
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/user/captcha",
      method: "post",
      data: JSON.stringify({
        email: claimForm.email,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.data.errno == 1002) {
          ElMessage.error("Invalid Email");
          return;
        } else {
          claimForm.email_change = false;
          claimForm.captcha_get = Base64.decode(
            encodeUtf8(res.data.data.verification)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function handleClaimFile(file, fileList) {
  if (fileList.length >= 2) {
    return;
  }
  if (fileList.length === 1) {
    claimHasFile.value = true;
  }
  claimForm.file = file;
}
function handleClaimRemove(file, fileList) {
  if (!fileList.length) {
    claimHasFile.value = false;
  }
  claimForm.file = null;
}
function handleAppealFile(file, fileList) {
  if (fileList.length >= 2) {
    return;
  }
  if (fileList.length === 1) {
    appealHasFile.value = true;
  }
  appealForm.file = file;
}
function handleAppealRemove(file, fileList) {
  if (!fileList.length) {
    appealHasFile.value = false;
  }
  appealForm.file = null;
}
function handleClaimSubmit() {
  if (store.getters.getLoginState != true) {
    ElMessage.error("Please Login");
    return;
  }
  if (claimForm.email_change === true) {
    ElMessage.error("Please obtain a new captcha");
    return;
  }
  if (claimForm.captcha === "") {
    ElMessage.error("Please enter captcha");
    return;
  }
  if (claimForm.captcha_get === "") {
    ElMessage.error("Please obtain the captcha");
    return;
  }
  if (claimForm.captcha != claimForm.captcha_get) {
    ElMessage.error("Incorrect captcha");
    return;
  }
  if (claimForm.reason === "") {
    ElMessage.error("Please state the reasons and evidence for your claim");
    return;
  }
  if (!claimHasFile.value) {
    ElMessage.error("Please upload the Appeal material");
    return;
  }
  if (
    claimForm.captcha == claimForm.captcha_get &&
    claimForm.captcha_get != ""
  ) {
    let formData = new FormData();
    formData.append("token", store.getters.getUserinfo.token);
    formData.append("claim_email", claimForm.email);
    formData.append("claim_text", claimForm.reason);
    formData.append("claim_file", claimForm.file.raw);
    formData.append("author_id", authorInformation.value.id);
    axios({
      url: "http://122.9.5.156:8000/api/v1/author/other_claim",
      method: "post",
      data: formData,
    })
      .then((res) => {
        console.log(res);
        if (res.data.errno === 1005) {
          ElMessage.warning("You have claimed to be another Scholar")
        }
        else {
          ElMessage.success("Application has been submitted");
        }
        handleClaimClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function handleClaimClose() {
  showClaimDialog.value = false;
  claimForm.email = "";
  claimForm.captcha_get = "";
  claimForm.email_change = false;
  claimForm.reason = "";
  claimForm.captcha = "";
  claimForm.file = "";
}
watch(() => route.path, (newPath, oldPath) => {
  is_Login.value = store.getters.getLoginState;
  authorId.value = route.params.id;
  console.log(route.params.id)
  fetchAuthorNetwork();
  fetchAuthorInformation();
});
function getAppealCaptcha() {
  if (appealForm.email === "") {
    ElMessage.error("Please enter your email");
    return;
  }
  if (appeal_captcha_time.value === "Get Captcha") {
    let timer;
    let mount = 60;
    timer = setInterval(() => {
      appeal_captcha_time.value = mount + "s";
      mount--;
      if (mount <= 0) {
        appeal_captcha_time.value = "Get Captcha";
        clearInterval(timer);
      }
    }, 1000);
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/user/captcha",
      method: "post",
      data: JSON.stringify({
        email: appealForm.email,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.data.errno == 1002) {
          ElMessage.error("Invalid Email");
          return;
        } else {
          appealForm.email_change = false;
          appealForm.captcha_get = Base64.decode(
            encodeUtf8(res.data.data.verification)
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function handleAppealSubmit() {
  if (store.getters.getLoginState != true) {
    ElMessage.error("Please Login");
    return;
  }
  if (appealForm.email_change === true) {
    ElMessage.error("Please obtain a new captcha");
    return;
  }
  if (appealForm.captcha === "") {
    ElMessage.error("Please enter captcha");
    return;
  }
  if (appealForm.captcha_get === "") {
    ElMessage.error("Please obtain the captcha");
    return;
  }
  if (appealForm.captcha != appealForm.captcha_get) {
    ElMessage.error("Incorrect captcha");
    return;
  }
  if (appealForm.reason === "") {
    ElMessage.error("Please state the reasons and evidence for your appeal");
    return;
  }
  if (!appealHasFile.value) {
    ElMessage.error("Please upload the application material");
    return;
  }
  if (
    appealForm.captcha == appealForm.captcha_get &&
    appealForm.captcha_get != ""
  ) {
    let formData = new FormData();
    formData.append("token", store.getters.getUserinfo.token);
    formData.append("appeal_email", appealForm.email);
    formData.append("appeal_text", appealForm.reason);
    formData.append("author_id", authorInformation.value.id);
    formData.append("appeal_file", appealForm.file.raw);
    formData.append("appeal_type", 0);
    axios({
      url: "http://122.9.5.156:8000/api/v1/author/appeal_author",
      method: "post",
      data: formData,
    })
      .then((res) => {
        console.log(res);
        ElMessage.success("Complaint has been filed");
        handleAppealClose();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function handleAppealClose() {
  showAppealDialog.value = false;
  appealForm.email = "";
  appealForm.captcha_get = "";
  appealForm.email_change = false;
  appealForm.reason = "";
  appealForm.captcha = "";
  appealForm.file = "";
}
watch(
  () => appealForm.email,
  (newVal, oldVal) => {
    if (appealForm.captcha_get != "") {
      appealForm.email_change = true;
      appealForm.captcha_get = "";
    }
  },
  { deep: true }
);
</script>

<style scoped>
.checkbutton {
  font-size: 16px;
  margin-left: 5px;
  width: 10px;
  /* 设置按钮宽度 */
  height: 10px;
  /* 设置按钮高度 */
}

.certified-text {
  color: "red";
  font-size: 24px;
}

.main-container {
  font-family: "Source Sans Pro", Arial, sans-serif;
  color: #333;
  background-color: #f9f9f9;
}

.main-header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 25vh;
  width: 100%;
}

.header-content-scholar {
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
  margin-left: 10px;
  /* 调整图标与文字之间的间距 */
  /* 其他样式设置 */
}

.tab-bar>>>.el-tabs__item {
  font-weight: bold;
  font-size: 18px;
}

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.author-opt {
  margin-left: 150px;
  height: 160px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.author-info h2 {
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.AttrButton {
  margin-left: 30px;
  height: auto;
  width: 70px;
}

.author-info .author-attr {
  margin-bottom: 15px;
  font-size: 15px;
  color: #0773df;
}

.author-certificate {
  margin-bottom: 15px;
  font-size: 17px;
  color: rgb(126, 192, 80);
}

/* 设置标签页标题的样式 */
::v-deep .tabs .el-tabs__item {
  margin: 5px;
  font-size: 16px;
  /* 调整字体大小 */
}

::v-deep .tabs .el-tabs__item.is-active {
  color: #409eff;
  /* 选中标签的文字颜色 */
  font-weight: bold;
  /* 加粗字体 */
}

/* 继续保持原有的 pane 样式 */
.pane {
  font-style: italic;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  border-radius: 4px;
}

.main-content {
  margin-top: 1rem;
}

.tab-content {}

.tab-bar {}
</style>
