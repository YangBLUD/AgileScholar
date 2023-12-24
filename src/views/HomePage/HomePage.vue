<template>
  <div>
    <TopNav />
  </div>
  <div class="navigation">
    <div @click="jump(1)" class="navigation-item">Search</div>
    <div @click="jump(2)" class="navigation-item">Articles</div>
    <div @click="jump(3)" class="navigation-item">Subjects</div>
    <div @click="jump(4)" class="navigation-item">Institutions</div>
  </div>
  <div class="article-search" id="section1">
    <div style="z-index: 5">
      <div class="headline">
        <h1>What Scholar</h1>
      </div>
      <div class="search_box">
        <el-input
          v-model="searchText"
          placeholder="Search"
          class="input-with-select"
          @keyup.enter="performSearch"
          size="large"
          width="400px"
          id="search"
        >
          <template #append>
            <el-button :icon="Search" @click="performSearch" />
          </template>
        </el-input>
        <div
          style="
            float: right;
            cursor: pointer;
            margin-right: 5px;
            margin-top: 10px;
            color: aliceblue;
          "
          @click="$router.push({ path: '/advanced' })"
        >
          <h5>Advanced Search</h5>
        </div>
      </div>
      <div class="carousel">
        <el-carousel :interval="4000" height="130px" arrow="always">
          <el-carousel-item
            class="carousel-item"
            v-for="(message, index) in messages"
            :key="index"
          >
            <p
              v-for="(item, index) in message.list"
              :key="index"
              style="font-size: 14px; margin: 5px; font-style: italic"
            >
              {{ item }}
            </p>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
  <div class="article-rank" id="section2">
    <div class="section-title">Popular Articles</div>
    <div class="rank-content">
      <div
        class="rank-article-item"
        v-for="(item, index) in rankArticles"
        :key="index"
        @click="goArticle(item.id)"
      >
        <div class="rank-article-index">{{ index + 1 }}</div>
        <div class="rank-article-content">
          <div class="rank-article-title">
            {{ item.title }}
          </div>
          <div style="height: 60px">
            <div class="rank-article-author">
              <span>{{ item.author_all[0].name }}</span>
              <span v-if="item.author_all.length == 2">,</span>
              <span v-if="item.author_all.length > 2"> et al.</span>
            </div>
            <div class="rank-article-author" v-if="item.author_all.length == 2">
              <span>{{ item.author_all[1].name }}</span>
            </div>
          </div>
          <div style="height: 80px">
            <div class="rank-article-date">{{ item.publication_date }}</div>
            <div class="rank-article-cite">
              Cited {{ item.cited_count }} times
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="classification" id="section3">
    <div class="section-title">Search by Subject</div>
    <div style="margin: auto; width: 90%">
      <div class="nav-list">
        <div
          v-for="(item, index) in classifications"
          :key="index"
          class="nav-item"
          @click="goClassification(item.value)"
        >
          <div class="nav-item-left">
            <div style="float: left; width: 70%">{{ item.text }}</div>
            <div
              class="arrow"
              style="float: right; width: 30%; font-size: 20px"
            >
              <el-icon><Right /></el-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="organization-rank" id="section4">
    <div class="section-title">Top Academic Institutions</div>
    <div class="section-main-dev">
      <!-- 领奖台排名 -->
      <div class="podium">
        <div
          v-for="(institution, index) in podiumList"
          :key="institution.id"
          class="podium-item"
          :class="getPodiumClass(index)"
          @click="goInstitution(institution.id)"
        >
          <div class="ins-rank">{{ index + 1 }}</div>
          <div class="ins-name">{{ institution.display_name }}</div>
          <div class="ins-views">
            H index : {{ institution.summary_stats.h_index }}
          </div>
        </div>
      </div>

      <!-- 列表排名 -->
      <div class="normal-list">
        <div
          v-for="(institution, index) in normalList"
          :key="institution.id"
          class="normal-item"
          @click="goInstitution(institution.id)"
        >
          <div class="rank">{{ index + 4 }}</div>
          <div class="name">{{ institution.display_name }}</div>
          <div class="views">
            H index : {{ institution.summary_stats.h_index }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div><Footer /></div> -->
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import TopNav from "../../components/HomePage/TopNav.vue";
import { Search, Right } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
function getUserInfo() {
  return Store.getters.getUserInfo;
}
function test() {
  console.log(Store.getters.getUserinfo);
}
const Store = useStore();
//窗口计算
const router = useRouter();
const route = useRoute();
const height = ref(0);
onMounted(() => {
  calcHeight();
  initArticles();
  initInstitutions();
});
function calcHeight() {
  const windowHeight = window.innerHeight;
  height.value = windowHeight - 65;
  let searchA = document.getElementById("section1");
  if (searchA) {
    searchA.style.height = height.value + "px";
  }
}
//导航栏
function jump(targetId) {
  let sectionEl = document.querySelector(`#section${targetId}`);
  if (!sectionEl) return;
  let sectionOffsetTop = sectionEl.offsetTop;
  window.scrollTo({
    top: sectionOffsetTop - 65,
    behavior: "smooth",
  });
}
//轮播图数据
const messages = [
  {
    list: [
      "Welcome to What Scholar!",
      "Here you will find a wealth of resources to support",
      "your research and learning endeavors.",
      "",
    ],
  },
  {
    list: [
      "Whether you are a student, researcher,",
      "or simply interested in expanding your knowledge,",
      "we hope you'll find our site both useful and informative.",
      "",
    ],
  },
  {
    list: [
      "Thank you for visiting us,",
      "and please don't hesitate to contact us if you have any questions.",
      "Happy exploring!",
      "",
    ],
  },
];
const searchText = ref("");

const performSearch = () => {
  if (searchText.value === "") return;
  const data = {
    searchType: 0,
    keyword: searchText.value,
  };
  Store.commit("setGeneralSearch", data);
  console.log("lllll");
  router.push("/searchResult");
};

const clearSearch = () => {
  searchText.value = "";
};
//论文推荐
const rankArticles = ref([
  {
    title: "Wireless mesh networks: a survey",
    id: "2150825860",
    cited_count: 3708,
    author_all: [
      {
        name: "Ian F. Akyildiz",
        id: "5044396726",
      },
      {
        name: "Xudong Wang",
        id: "5019290469",
      },
      {
        name: "Weilin Wang",
        id: "5024421837",
      },
    ],
    publication_date: "2005-03-01",
  },
  {
    title: "Multiuser OFDM with adaptive subcarrier, bit, and power allocation",
    id: "2106749358",
    cited_count: 2550,
    author_all: [
      {
        name: "Cheong Yui Wong",
        id: "5054683990",
      },
      {
        name: "R.S. Cheng",
        id: "5049524680",
      },
      {
        name: "K.B. Lataief",
        id: "5036836941",
      },
      {
        name: "R.D. Murch",
        id: "5004541948",
      },
    ],
    publication_date: "1999-01-01",
  },
  {
    title:
      "Activation of p53 Sequence-Specific DNA Binding by Acetylation of the p53 C-Terminal Domain",
    id: "2092722802",
    cited_count: 2378,
    author_all: [
      {
        name: "Wei Gu",
        id: "5040245597",
      },
      {
        name: "Robert G Roeder",
        id: "5007755251",
      },
    ],
    publication_date: "1997-08-01",
  },
  {
    title: "Quantitative Synthesis in Systematic Reviews",
    id: "1982228885",
    cited_count: 2267,
    author_all: [
      {
        name: "Joseph Lau",
        id: "5053201045",
      },
      {
        name: "John P.A. Ioannidis",
        id: "5070446713",
      },
      {
        name: "Christopher H. Schmid",
        id: "5030287616",
      },
    ],
    publication_date: "1997-11-01",
  },
  {
    title:
      "Priority inheritance protocols: an approach to real-time synchronization",
    id: "2160293203",
    cited_count: 2046,
    author_all: [
      {
        name: "L. Sha",
        id: "5067032971",
      },
      {
        name: "R. Rajkumar",
        id: "5036289856",
      },
      {
        name: "J.P. Lehoczky",
        id: "5054006216",
      },
    ],
    publication_date: "1990-01-01",
  },
  {
    title:
      "The Lifting Scheme: A Custom-Design Construction of Biorthogonal Wavelets",
    id: "2117188745",
    cited_count: 2035,
    author_all: [
      {
        name: "Wim Sweldens",
        id: "5035336231",
      },
    ],
    publication_date: "1996-04-01",
  },
  {
    title:
      "KEGG for representation and analysis of molecular networks involving diseases and drugs",
    id: "2171437346",
    cited_count: 1997,
    author_all: [
      {
        name: "Minoru Kanehisa",
        id: "5058022821",
      },
      {
        name: "Susumu Goto",
        id: "5026586100",
      },
      {
        name: "Miho Furumichi",
        id: "5042021831",
      },
      {
        name: "Mao Tanabe",
        id: "5019400181",
      },
      {
        name: "Mika Hirakawa",
        id: "5085506771",
      },
    ],
    publication_date: "2009-10-30",
  },
  {
    title: "Predicting chaotic time series",
    id: "2034099719",
    cited_count: 1770,
    author_all: [
      {
        name: "J. Doyne Farmer",
        id: "5019087210",
      },
      {
        name: "John J. Sidorowich",
        id: "5068740539",
      },
    ],
    publication_date: "1987-08-24",
  },
]);
function initArticles() {
  axios({
    url: "http://122.9.5.156:8000/api/v1/home/hot_paper",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({}),
  })
    .then((res) => {
      rankArticles.value = res.data.data.slice(0, 8);
    })
    .catch((err) => {
      console.log(err);
    });
}
//导航栏
const classifications = [
  {
    text: "Biology, Ecology, Genetics, Botany",
    value: "Biology",
  },
  {
    text: "Medicine, Pediatrics, Neuroscience, Surgery",
    value: " Medicine",
  },
  {
    text: "Chemistry, Biochemisrty",
    value: "Chemisrty",
  },
  {
    text: "Computer science, Database, Artificial Intelligence",
    value: "Computer science",
  },
  {
    text: "Mathematics, Algebra, Geometry, Number Theory, Probability and Mathematical Statistics",
    value: "Mathematics",
  },
  {
    text: "Physics, Classical Mechanics, Optics,Electromagnetism, Quantum Mechanics",
    value: "Physics",
  },
  {
    text: "Materials science, Metallurgy, Composite Materials",
    value: "Materials science",
  },
  {
    text: "Engineering, Electrical Engineering, Aerospace Engineering",
    value: "Engineering",
  },
  {
    text: "Psychology, Psychometrics",
    value: "Psychology",
  },
  {
    text: "Economics, Macroeconomics, Microeconomics",
    value: "Economics",
  },
  {
    text: "Philosophy, Ethics, Logic, History of Philosophy",
    value: "Philosophy",
  },
  {
    text: "Political science, International Relations, Political Theory",
    value: "Political science",
  },
  {
    text: "Sociology, Social Structure, Social Psychology",
    value: "Sociology",
  },
  {
    text: "Geography, Cartography",
    value: "Geography",
  },
  {
    text: "Geology, Petrology, Sedimentology, Seismology",
    value: "Geology",
  },
  {
    text: "Environmental science, Environmental Ecology, Ecotoxicology",
    value: "Environmental science",
  },
  {
    text: "Business, Human Resource Management, Marketing",
    value: "Business",
  },
  {
    text: "Art, Sculpture, Painting, Photography",
    value: "Art",
  },
  {
    text: "History, Literary History, Military History",
    value: "History",
  },
];

//机构排名
const institutions = ref([
  {
    display_name: "Omega Piezo Technologies (United States)",
    id: "4210092899",
    summary_stats: {
      cited_by_count: 1018,
      h_index: 16,
    },
  },
  {
    display_name: "Sorbonne Paris Cité",
    id: "220871436",
    summary_stats: {
      cited_by_count: 1018,
      h_index: 16,
    },
  },
  {
    display_name: "Sorbonne University",
    id: "184646667",
    summary_stats: {
      cited_by_count: 1018,
      h_index: 15,
    },
  },
  {
    display_name: "O’Donnell Associates",
    id: "4210147204",
    summary_stats: {
      cited_by_count: 494,
      h_index: 14,
    },
  },
  {
    display_name: "Institute for the Blind and Partially Sighted",
    id: "4210121375",
    summary_stats: {
      cited_by_count: 409,
      h_index: 13,
    },
  },
  {
    display_name: "Ebro Foods (Canada)",
    id: "4210121503",
    summary_stats: {
      cited_by_count: 560,
      h_index: 13,
    },
  },
  {
    display_name: "Gratings Incorporated (United States)",
    id: "4210098469",
    summary_stats: {
      cited_by_count: 505,
      h_index: 13,
    },
  },
  {
    display_name: "Forbairt",
    id: "4210167278",
    summary_stats: {
      cited_by_count: 398,
      h_index: 12,
    },
  },
  {
    display_name: "Exocell (United States)",
    id: "4210133279",
    summary_stats: {
      cited_by_count: 546,
      h_index: 12,
    },
  },
  {
    display_name: "Human Factors International (India)",
    id: "4210136352",
    summary_stats: {
      cited_by_count: 655,
      h_index: 12,
    },
  },
]);
function initInstitutions() {
  axios({
    url: "http://122.9.5.156:8000/api/v1/home/hot_institution",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({}),
  })
    .then((res) => {
      institutions.value = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
}
const podiumList = institutions.value.slice(0, 3);
const normalList = institutions.value.slice(3);
const getPodiumClass = (index) => {
  if (index === 0) {
    return "first-place";
  } else if (index === 1) {
    return "second-place";
  } else if (index === 2) {
    return "third-place";
  }
};
function goArticle(id) {
  router.push({
    path: "",
  });
}
function goClassification(value) {
  const data = {
    keyword: value,
    searchType: 3,
  };
  Store.commit("setGeneralSearch", data);
  router.push({
    path: "",
  });
}
function goInstitution(id) {
  router.push({
    path: "",
  });
}

//测试新背景
</script>
<style scoped lang="scss">
.navigation {
  margin-left: 30px;
  margin-top: 10px;
  display: flex;
  width: 35%;
  justify-content: space-between;
  color: white;
  position: absolute;
  top: 65px;
}
.navigation-item {
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  text-align: center;
}
.navigation-item:hover {
  border-bottom: white 3px solid;
}
.headline {
  margin: auto;
  width: fit-content;
  font-size: 25px;
  color: rgb(232, 239, 247);
  margin-top: 120px;
  z-index: 10;
}
.search_box {
  margin: auto;
  height: fit-content;
  width: 60%;
  margin-top: 60px;
}
:deep(.el-input-group__append) {
  background-color: white;
  box-shadow: none;
  font-size: large;
  font-weight: 900;
  color: black;
}
:deep(#search) {
  background-color: #ffffffe8;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
  color: #000000;
}
.article-search {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/homepage/T.png);
  background-size: 100% 100%;
  padding-top: 65px;
  overflow: hidden;
  z-index: 8;
}
.carousel {
  margin: auto;
  margin-top: 70px;
  width: 60%;
  background-color: #65656566;
  border-radius: 10px;
}
.carousel-item {
  color: white;
  background-color: transparent;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
}
.article-rank {
  padding-top: 20px;
  padding-bottom: 60px;
  background-image: url(../../assets/homepage/A.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.section-title {
  font-size: 20px;
  font-weight: bold;
  font-style: italic;
  margin: 20px 10px 40px 20px;
}
.rank-content {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border: 1px solid #ccd0d8;
  border-radius: 4px;
  background-color: #fff;
  padding: 20px;
  padding-bottom: 0px;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
}
.rank-article-item {
  width: 25%;
  margin-bottom: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid #ccd0d8;
  cursor: pointer;
}
.rank-article-index {
  margin-left: 5%;
  width: 15%;
  font-size: 30px;
  font-style: italic;
  font-weight: bold;
  color: rgb(255, 240, 103);
  float: left;
}
.rank-article-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 80%;
  height: 100%;
  float: right;
}
.rank-article-title {
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  min-height: 150px;
  padding: 0 10px;
  text-overflow: ellipsis;
  overflow-wrap: break-word;
}
.rank-article-author {
  margin-top: 20px;
  font-size: 14px;
  color: #999;
}
.rank-article-date {
  margin-top: 30px;
  font-size: 14px;
  font-style: italic;
}
.rank-article-cite {
  margin-top: 10px;
  font-size: 14px;
  font-style: italic;
}
.classification {
  padding-top: 20px;
  padding-bottom: 40px;
  color: #fff;
  background-image: url(https://dl.acm.org/products/acm/releasedAssets/images/green-dl-bg-19ae13a3f4a3026f6e92d199a91c3dda.jpg);
}
.nav-list {
  margin-top: 20px;
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.nav-item {
  width: 33.33%;
  align-self: stretch;
  height: auto;
  padding-top: 10px;
  min-height: 50px;
  cursor: pointer;
}
.nav-item-left {
  color: black;
  font-size: 14px;
  margin: auto;
  width: 85%;
  height: calc(100% - 10px);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: #ccd0d8 1px solid;
}
.nav-item:hover {
  transform: translate(5px, 3px);
  box-shadow: 0 0 10px rgba(159, 174, 157, 0.521);
  .nav-item-left {
    border-bottom: transparent 1px solid;
  }
}
.arrow {
  color: #ccd0d8;
}
.nav-item:hover .arrow {
  color: #000000;
}
.organization-rank {
  padding-top: 20px;
  padding-bottom: 40px;
  color: rgb(0, 0, 0);
  background-image: url(../../assets/homepage/R-C.jpg);
  background-size: cover;
  background-repeat: no-repeat;
}
.section-main-dev {
  margin: auto;
  width: 70%;
  padding: 15px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.658);
  margin-top: 20px;
}
.podium {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  color: black;
}

.podium-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 5px;
  cursor: pointer;
  .views {
    margin-top: 8px;
  }
}

.ins-rank {
  font-size: 20px;
  font-weight: 600;
  text-align: center;
}
.ins-name {
  font-style: italic;
  margin: 10px 0;
}
.ins-views {
  font-size: 14px;
}
.normal-item .rank {
  width: 15%;
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.normal-item .name {
  width: 60%;
  overflow-x: auto;
  font-style: italic;
}
.normal-item .views {
  width: 20%;
}

.first-place {
  background-color: rgba(255, 217, 0, 0.6);
  width: 30%;
  text-align: center;
}

.second-place {
  background-color: rgba(192, 192, 192, 0.6);
  width: 30%;
  text-align: center;
}

.third-place {
  background-color: rgba(209, 73, 14, 0.459);
  width: 30%;
  text-align: center;
}

.normal-list {
  display: flex;
  flex-direction: column;
  color: black;
}

.normal-item {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #f2f2f2da;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
