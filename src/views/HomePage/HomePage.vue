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
      <el-carousel
        interval="1000000"
        type="card"
        height="600px"
        indicator-position="outside"
      >
        <el-carousel-item v-for="(item, index) in classifications" :key="index">
          <el-button
            :icon="More"
            size="large"
            circle
            @click="showInfo(item.id)"
            style="position: absolute; right: 40px; top: 20px"
            v-show="item.show"
          />
          <div v-show="item.show">
            <div class="image-block" @click="goSubject(item.value)">
              <img :src="item.image" class="image" />
            </div>
            <div class="subject-name">
              <span @click="goSubject(item.value)">{{ item.value }}</span>
              <el-button
                :icon="Search"
                size="large"
                circle
                style="
                  float: right;
                  position: absolute;
                  top: 520px;
                  right: 40px;
                "
                @click="change(item)"
              />
            </div>
          </div>
          <div v-show="!item.show">
            <div class="nav-list">
              <div
                v-for="(item1, index1) in item.text"
                :key="index1"
                class="nav-item"
              >
                <div class="nav-item-left">
                  <el-button
                    :icon="More"
                    size="large"
                    circle
                    @click="showInfo(item1.id)"
                  />
                  <div
                    style="float: left; width: 70%; cursor: auto"
                    @click="goSubject(item1.name)"
                  >
                    {{ item1.name }}
                  </div>
                  <div
                    class="arrow"
                    style="float: right; width: 30%; font-size: 20px"
                    @click="goSubject(item1.name)"
                  >
                    <el-icon>
                      <Right />
                    </el-icon>
                  </div>
                </div>
              </div>
              <el-button
                :icon="ArrowLeft"
                size="large"
                circle
                style="
                  float: right;
                  position: absolute;
                  top: 520px;
                  right: 40px;
                "
                @click="change(item)"
              />
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
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
  <!-- 学科详细信息dialog -->
  <el-dialog
    v-model="dialogVisible"
    width="70%"
    :show-close="false"
    open-delay="500"
  >
    <div style="max-height: 700px; overflow-y: auto">
      <div class="subject-name">{{ subjectInfo.name }}</div>
      <img
        :src="subjectInfo.img_url"
        alt="cnm加载得出来"
        :onerror="display_vacant"
        class="image"
        style="margin-left: 325px; margin-bottom: 40px; margin-top: 40px"
      />
      <div class="subject-description">{{ subjectInfo.description }}</div>
      <div class="summary">Summary Statistics</div>
      <el-descriptions direction="vertical" :column="4" border>
        <el-descriptions-item label="Number of Citations">{{
          subjectInfo.summary_stats.cited_by_count
        }}</el-descriptions-item>
        <el-descriptions-item label="2-Year i10 Index">{{
          subjectInfo.summary_stats.yr2_i10_index
        }}</el-descriptions-item>
        <el-descriptions-item label="H-Index">{{
          subjectInfo.summary_stats.h_index
        }}</el-descriptions-item>
        <el-descriptions-item label="i10 Index" :span="2">{{
          subjectInfo.summary_stats.i10_index
        }}</el-descriptions-item>
        <el-descriptions-item label="Open Access Percentage"
          >{{ subjectInfo.summary_stats.oa_percent }}
        </el-descriptions-item>
        <el-descriptions-item label="2-Year Mean Citedness"
          >{{ subjectInfo.summary_stats.yr2_mean_citedness }}
        </el-descriptions-item>
        <el-descriptions-item label="Number of Works">{{
          subjectInfo.summary_stats.works_count
        }}</el-descriptions-item>
        <el-descriptions-item label="2-Year Works Count">{{
          subjectInfo.summary_stats.yr2_works_count
        }}</el-descriptions-item>
        <el-descriptions-item label="2-Year H-Index">{{
          subjectInfo.summary_stats.yr2_h_index
        }}</el-descriptions-item>
        <el-descriptions-item label="2-Year Number of Citations">{{
          subjectInfo.summary_stats.yr2_cited_by_count
        }}</el-descriptions-item>
      </el-descriptions>
      <el-button-group style="margin-top: 50px; margin-bottom: 50px">
        <el-button
          type="primary"
          @click="showChart1()"
          text
          style="font-size: 20px; font-weight: bold; font-style: italic"
          >Total cited by count</el-button
        >
        <el-button
          type="primary"
          @click="showChart2()"
          text
          style="font-size: 20px; font-weight: bold; font-style: italic"
          >Total works count</el-button
        >
        <el-button
          type="primary"
          @click="showChart3()"
          text
          style="font-size: 20px; font-weight: bold; font-style: italic"
          >Total open access works count</el-button
        >
      </el-button-group>
      <Echart v-if="flag === 1" :xData="xData" :yData="yData1"></Echart>
      <Echart v-if="flag === 2" :xData="xData" :yData="yData2"></Echart>
      <Echart v-if="flag === 3" :xData="xData" :yData="yData3"></Echart>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">
          Close
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue";
import axios from "axios";
import Echart from "../HomePage/Echats.vue";
import AI from "../../components/Chat/chat.vue";
import TopNav from "../../components/HomePage/TopNav.vue";
import Footer from "../../components/HomePage/Footer.vue";
import { ElMessageBox } from "element-plus";
import { Search, Right, ArrowLeft, More } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
const dialogVisible = ref(false);
function test() {
  console.log(Store.getters.getUserinfo);
}
const Store = useStore();
//窗口计算
const router = useRouter();
const route = useRoute();
const height = ref(0);
var id = ref("");
const subjectInfo = reactive({
  name: "",
  description: "",
  summary_stats: "",
  img_url: "",
});
function display_vacant() {
  subjectInfo.img_url = "src/assets/homepage/vacant.jpg";
}
var flag = ref(0);
var xData = ref("");
var yData1 = ref("");
var yData2 = ref("");
var yData3 = ref("");

function showChart1() {
  flag.value = 1;
}
function showChart2() {
  flag.value = 2;
}
function showChart3() {
  flag.value = 3;
}
onMounted(() => {
  calcHeight();
  initArticles();
  initInstitutions();
});
function getUserInfo() {
  return Store.getters.getUserinfo;
}
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
  if (targetId == 1) {
    router.push("/advanced");
    return;
  }
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
const classifications = ref([
  {
    text: [
      { name: "Biochemistry", id: 55493867 },
      { name: "Genetics", id: 54355233 },
      { name: "Cell biology", id: 95444343 },
      { name: "Ecology", id: 18903297 },
      { name: "Endocrinology", id: 134018914 },
      { name: "Immunology", id: 203014093 },
      { name: "Neuroscience", id: 169760540 },
      { name: "Paleontology", id: 151730666 },
      { name: "Botany", id: 59822182 },
      { name: "Molecular biology", id: 153911025 },
      { name: "Cancer research", id: 502942594 },
      { name: "Anatomy", id: 105702510 },
      { name: "Pharmacology", id: 98274493 },
      { name: "Microbiology", id: 89423630 },
      { name: "Computational biology", id: 70721500 },
      { name: "Virology", id: 159047783 },
      { name: "Biophysics", id: 12554922 },
      { name: "Food science", id: 31903555 },
      { name: "Evolutionary biology", id: 78458016 },
      { name: "Agronomy", id: 6557445 },
      { name: "Zoology", id: 90856448 },
      { name: "Biotechnology", id: 150903083 },
      { name: "Bioinformatics", id: 60644358 },
      { name: "Fishery", id: 505870484 },
      { name: "Animal science", id: 140793950 },
      { name: "Horticulture", id: 144027150 },
      { name: "Physiology", id: 42407357 },
      { name: "Astrobiology", id: 87355193 },
      { name: "Toxicology", id: 33070731 },
      { name: "Agroforestry", id: 54286561 },
      { name: "Biological system", id: 186060115 },
      { name: "Agricultural science", id: 37621935 },
    ],
    value: "Biology",
    image: "/src/assets/homepage/Biology.jpg",
    show: true,
    id: 86803240,
  },
  {
    text: [
      { name: "Internal medicine", id: 126322002 },
      { name: "Pathology", id: 142724271 },
      { name: "Endocrinology", id: 134018914 },
      { name: "Immunology", id: 203014093 },
      { name: "Surgery", id: 141071460 },
      { name: "Psychiatry", id: 118552586 },
      { name: "Environmental health", id: 99454951 },
      { name: "Cancer research", id: 502942594 },
      { name: "Anatomy", id: 105702510 },
      { name: "Pharmacology", id: 98274493 },
      { name: "Radiology", id: 126838900 },
      { name: "Virology", id: 159047783 },
      { name: "Cardiology", id: 164705383 },
      { name: "Clinical psychology", id: 70410870 },
      { name: "Nursing", id: 159110408 },
      { name: "Anesthesia", id: 42219234 },
      { name: "Gastroenterology", id: 90924648 },
      { name: "Physical therapy", id: 1862650 },
      { name: "Intensive care medicine", id: 177713679 },
      { name: "Pediatrics", id: 187212893 },
      { name: "Oncology", id: 143998085 },
      { name: "Family medicine", id: 512399662 },
      { name: "Gerontology", id: 74909509 },
      { name: "Dentistry", id: 199343813 },
      { name: "Audiology", id: 548259974 },
      { name: "Physical medicine and rehabilitation", id: 99508421 },
      { name: "Nuclear medicine", id: 2989005 },
      { name: "Dermatology", id: 16005928 },
      { name: "Gynecology", id: 29456083 },
      { name: "Biomedical engineering", id: 136229726 },
      { name: "Physiology", id: 42407357 },
      { name: "Medical education", id: 509550671 },
      { name: "Obstetrics", id: 131872663 },
      { name: "Medical emergency", id: 545542383 },
      { name: "Ophthalmology", id: 118487528 },
      { name: "Emergency medicine", id: 194828623 },
      { name: "Urology", id: 126894567 },
      { name: "Andrology", id: 16685009 },
      { name: "Risk analysis (engineering)", id: 112930515 },
      { name: "Traditional medicine", id: 556039675 },
      { name: "Orthodontics", id: 29694066 },
      { name: "Veterinary medicine", id: 42972112 },
      { name: "General surgery", id: 61434518 },
      { name: "Medical physics", id: 19527891 },
      { name: "Optometry", id: 119767625 },
    ],
    value: "Medicine",
    image: "/src/assets/homepage/Medicine.jpg",
    show: true,
    id: 71924100,
  },
  {
    text: [
      { name: "Biochemistry", id: 55493867 },
      { name: "Organic chemistry", id: 178790620 },
      { name: "Chromatography", id: 43617362 },
      { name: "Physical chemistry", id: 147789679 },
      { name: "Crystallography", id: 8010536 },
      { name: "Inorganic chemistry", id: 179104552 },
      { name: "Food science", id: 31903555 },
      { name: "Stereochemistry", id: 71240020 },
      { name: "Environmental chemistry", id: 107872376 },
      { name: "Polymer chemistry", id: 188027245 },
      { name: "Photochemistry", id: 75473681 },
      { name: "Combinatorial chemistry", id: 21951064 },
      { name: "Chemical physics", id: 159467904 },
      { name: "Computational chemistry", id: 147597530 },
      { name: "Nuclear chemistry", id: 13965031 },
      { name: "Mineralogy", id: 199289684 },
      { name: "Medicinal chemistry", id: 155647269 },
      { name: "Molecular physics", id: 41999313 },
      { name: "Polymer science", id: 126348684 },
      { name: "Radiochemistry", id: 177322064 },
    ],
    value: "Chemisrtry",
    image: "/src/assets/homepage/Chemistry.jpg",
    show: true,
    id: 185592680,
  },
  {
    text: [
      { name: "Artificial intelligence", id: 154945302 },
      { name: "Programming language", id: 199360897 },
      { name: "Operating system", id: 111919701 },
      { name: "Algorithm", id: 11413529 },
      { name: "World Wide Web", id: 136764020 },
      { name: "Telecommunications", id: 76155785 },
      { name: "Machine learning", id: 119857082 },
      { name: "Library science", id: 161191863 },
      { name: "Computer security", id: 38652104 },
      { name: "Computer network", id: 31258907 },
      { name: "Computer vision", id: 31972630 },
      { name: "Information retrieval", id: 23123220 },
      { name: "Data mining", id: 124101348 },
      { name: "Database", id: 77088390 },
      { name: "Data science", id: 2522767166 },
      { name: "Knowledge management", id: 56739046 },
      { name: "Theoretical computer science", id: 80444323 },
      { name: "Embedded system", id: 149635348 },
      { name: "Human–computer interaction", id: 107457646 },
      { name: "Distributed computing", id: 120314980 },
      { name: "Computer graphics (images)", id: 121684516 },
      { name: "Natural language processing", id: 204321447 },
      { name: "Software engineering", id: 115903868 },
      { name: "Parallel computing", id: 173608175 },
      { name: "Speech recognition", id: 28490314 },
      { name: "Simulation", id: 44154836 },
      { name: "Real-time computing", id: 79403827 },
      { name: "Multimedia", id: 49774154 },
      { name: "Internet privacy", id: 108827166 },
      { name: "Computer hardware", id: 9390403 },
      { name: "Computational science", id: 459310 },
      { name: "Computer architecture", id: 118524514 },
      { name: "Computer engineering", id: 113775141 },
    ],
    value: "Computer science",
    image: "/src/assets/homepage/Sorting_quicksort_anim.gif",
    show: true,
    id: 41008148,
  },
  {
    text: [
      { name: "Statistics", id: 105795698 },
      { name: "Geometry", id: 2524010 },
      { name: "Mathematical analysis", id: 134306372 },
      { name: "Algorithm", id: 11413529 },
      { name: "Pure mathematics", id: 202444582 },
      { name: "Combinatorics", id: 114614502 },
      { name: "Econometrics", id: 149782125 },
      { name: "Mathematical optimization", id: 126255220 },
      { name: "Applied mathematics", id: 28826006 },
      { name: "Mathematics education", id: 145420912 },
      { name: "Mathematical physics", id: 37914503 },
      { name: "Discrete mathematics", id: 118615104 },
      { name: "Operations research", id: 42475967 },
      { name: "Mathematical economics", id: 144237770 },
      { name: "Arithmetic", id: 94375191 },
      { name: "Computational science", id: 459310 },
    ],
    value: "Mathematics",
    image: "/src/assets/homepage/Mathematics.jpg",
    show: true,
    id: 33923547,
  },
  {
    text: [
      { name: "Quantum mechanics", id: 62520636 },
      { name: "Optics", id: 120665830 },
      { name: "Thermodynamics", id: 97355855 },
      { name: "Optoelectronics", id: 49040817 },
      { name: "Condensed matter physics", id: 26873012 },
      { name: "Mechanics", id: 57879066 },
      { name: "Astronomy", id: 1276947 },
      { name: "Meteorology", id: 153294291 },
      { name: "Acoustics", id: 24890656 },
      { name: "Atomic physics", id: 184779094 },
      { name: "Nuclear physics", id: 185544564 },
      { name: "Classical mechanics", id: 74650414 },
      { name: "Astrophysics", id: 44870925 },
      { name: "Statistical physics", id: 121864883 },
      { name: "Chemical physics", id: 159467904 },
      { name: "Atmospheric sciences", id: 91586092 },
      { name: "Mathematical physics", id: 37914503 },
      { name: "Nuclear magnetic resonance", id: 46141821 },
      { name: "Theoretical physics", id: 33332235 },
      { name: "Particle physics", id: 109214941 },
      { name: "Molecular physics", id: 41999313 },
      { name: "Astrobiology", id: 87355193 },
      { name: "Geophysics", id: 8058405 },
      { name: "Computational physics", id: 30475298 },
      { name: "Engineering physics", id: 61696701 },
      { name: "Quantum electrodynamics", id: 3079626 },
      { name: "Medical physics", id: 19527891 },
    ],
    value: "Physics",
    image: "/src/assets/homepage/Physic.jpg",
    show: true,
    id: 121332964,
  },
  {
    text: [
      { name: "Composite material", id: 159985019 },
      { name: "Nanotechnology", id: 171250308 },
      { name: "Metallurgy", id: 191897082 },
      { name: "Optoelectronics", id: 49040817 },
      { name: "Polymer chemistry", id: 188027245 },
      { name: "Polymer science", id: 126348684 },
    ],
    value: "Materials science",
    image: "/src/assets/homepage/MaterialScience.jpg",
    show: true,
    id: 192562407,
  },
  {
    text: [
      { name: "Chemical engineering", id: 42360764 },
      { name: "Electrical engineering", id: 119599485 },
      { name: "Mechanical engineering", id: 78519656 },
      { name: "Telecommunications", id: 76155785 },
      { name: "Geotechnical engineering", id: 187320778 },
      { name: "Structural engineering", id: 66938386 },
      { name: "Aerospace engineering", id: 146978453 },
      { name: "Electronic engineering", id: 24326235 },
      { name: "Waste management", id: 548081761 },
      { name: "Environmental engineering", id: 87717796 },
      { name: "Biomedical engineering", id: 136229726 },
      { name: "Embedded system", id: 149635348 },
      { name: "Operations management", id: 21547014 },
      { name: "Operations research", id: 42475967 },
      { name: "Systems engineering", id: 201995342 },
      { name: "Process management", id: 195094911 },
      { name: "Management science", id: 539667460 },
      { name: "Software engineering", id: 115903868 },
      { name: "Control engineering", id: 133731056 },
      { name: "Pulp and paper industry", id: 528095902 },
      { name: "Biochemical engineering", id: 183696295 },
      { name: "Process engineering", id: 21880701 },
      { name: "Civil engineering", id: 147176958 },
      { name: "Automotive engineering", id: 171146098 },
      { name: "Engineering physics", id: 61696701 },
      { name: "Simulation", id: 44154836 },
      { name: "Engineering ethics", id: 55587333 },
      { name: "Reliability engineering", id: 200601418 },
      { name: "Transport engineering", id: 22212356 },
      { name: "Nuclear engineering", id: 116915560 },
      { name: "Petroleum engineering", id: 78762247 },
      { name: "Architectural engineering", id: 170154142 },
      { name: "Forensic engineering", id: 77595967 },
      { name: "Manufacturing engineering", id: 117671659 },
      { name: "Marine engineering", id: 199104240 },
      { name: "Aeronautics", id: 178802073 },
      { name: "Engineering management", id: 110354214 },
      { name: "Engineering drawing", id: 199639397 },
      { name: "Mining engineering", id: 16674752 },
      { name: "Industrial engineering", id: 13736549 },
      { name: "Agricultural engineering", id: 88463610 },
      { name: "Computer engineering", id: 113775141 },
      { name: "Construction engineering", id: 107053488 },
    ],
    value: "Engineering",
    image: "/src/assets/homepage/Engineering.jpg",
    show: true,
    id: 127413603,
  },
  {
    text: [
      { name: "Neuroscience", id: 169760540 },
      { name: "Psychiatry", id: 118552586 },
      { name: "Social psychology", id: 77805123 },
      { name: "Developmental psychology", id: 138496976 },
      { name: "Clinical psychology", id: 70410870 },
      { name: "Cognitive psychology", id: 180747234 },
      { name: "Psychotherapist", id: 542102704 },
      { name: "Pedagogy", id: 19417346 },
      { name: "Mathematics education", id: 145420912 },
      { name: "Communication", id: 46312422 },
      { name: "Psychoanalysis", id: 11171543 },
      { name: "Cognitive science", id: 188147891 },
      { name: "Applied psychology", id: 75630572 },
      { name: "Criminology", id: 73484699 },
    ],
    value: "Psychology",
    image: "/src/assets/homepage/Psychology.svg",
    show: true,
    id: 15744967,
  },
  {
    text: [
      { name: "Finance", id: 10138342 },
      { name: "Economic growth", id: 50522688 },
      { name: "Macroeconomics", id: 139719470 },
      { name: "Econometrics", id: 149782125 },
      { name: "Management", id: 187736073 },
      { name: "Microeconomics", id: 175444787 },
      { name: "Accounting", id: 121955636 },
      { name: "Operations management", id: 21547014 },
      { name: "Market economy", id: 34447519 },
      { name: "Industrial organization", id: 40700 },
      { name: "Environmental resource management", id: 107826830 },
      { name: "Mathematical economics", id: 144237770 },
      { name: "Monetary economics", id: 556758197 },
      { name: "Management science", id: 539667460 },
      { name: "Financial economics", id: 106159729 },
      { name: "Political economy", id: 138921699 },
      { name: "Natural resource economics", id: 175605778 },
      { name: "Demographic economics", id: 4249254 },
      { name: "Economy", id: 136264566 },
      { name: "Public economics", id: 100001284 },
      { name: "Environmental economics", id: 134560507 },
      { name: "Economic geography", id: 26271046 },
      { name: "Development economics", id: 47768531 },
      { name: "Labour economics", id: 145236788 },
      { name: "Law and economics", id: 190253527 },
      { name: "International trade", id: 155202549 },
      { name: "Positive economics", id: 118084267 },
      { name: "Actuarial science", id: 162118730 },
      { name: "Economic system", id: 74363100 },
      { name: "Socioeconomics", id: 45355965 },
      { name: "Agricultural economics", id: 48824518 },
      { name: "International economics", id: 18547055 },
      { name: "Financial system", id: 73283319 },
      { name: "Neoclassical economics", id: 133425853 },
      { name: "Keynesian economics", id: 165556158 },
      { name: "Economic history", id: 6303427 },
      { name: "Economic policy", id: 105639569 },
      { name: "Commerce", id: 54750564 },
      { name: "Welfare economics", id: 549774020 },
      { name: "Classical economics", id: 167562979 },
    ],
    value: "Economics",
    image: "/src/assets/homepage/Economics.svg",
    show: true,
    id: 162324750,
  },
  {
    text: [
      { name: "Linguistics", id: 41895202 },
      { name: "Epistemology", id: 111472728 },
      { name: "Humanities", id: 15708023 },
      { name: "Aesthetics", id: 107038049 },
      { name: "Theology", id: 27206212 },
      { name: "Environmental ethics", id: 95124753 },
      { name: "Religious studies", id: 24667770 },
    ],
    value: "Philosophy",
    image: "/src/assets/homepage/Philosophy.png",
    show: true,
    id: 138885662,
  },
  {
    text: [
      { name: "Law", id: 199539241 },
      { name: "Public relations", id: 39549134 },
      { name: "Public administration", id: 3116431 },
    ],
    value: "Political science",
    image: "/src/assets/homepage/Political.jpg",
    show: true,
    id: 17744445,
  },
  {
    text: [
      { name: "Demography", id: 149923435 },
      { name: "Social science", id: 36289849 },
      { name: "Pedagogy", id: 19417346 },
      { name: "Anthropology", id: 19165224 },
      { name: "Communication", id: 46312422 },
      { name: "Gender studies", id: 107993555 },
      { name: "Political economy", id: 138921699 },
      { name: "Criminology", id: 73484699 },
      { name: "Law and economics", id: 190253527 },
      { name: "Media studies", id: 29595303 },
      { name: "Socioeconomics", id: 45355965 },
      { name: "Regional science", id: 148383697 },
      { name: "Ethnology", id: 2549261 },
    ],
    value: "Sociology",
    image: "/src/assets/homepage/Sociology.svg",
    show: true,
    id: 144024400,
  },
  {
    text: [
      { name: "Archaeology", id: 166957645 },
      { name: "Meteorology", id: 153294291 },
      { name: "Cartography", id: 58640448 },
      { name: "Remote sensing", id: 62649853 },
      { name: "Geodesy", id: 13280743 },
      { name: "Physical geography", id: 100970517 },
      { name: "Environmental planning", id: 91375879 },
      { name: "Forestry", id: 97137747 },
      { name: "Economic geography", id: 26271046 },
      { name: "Environmental protection", id: 526734887 },
      { name: "Regional science", id: 148383697 },
    ],
    value: "Geography",
    image: "/src/assets/homepage/Geology.jpeg",
    show: true,
    id: 205649164,
  },
  {
    text: [
      { name: "Paleontology", id: 151730666 },
      { name: "Oceanography", id: 111368507 },
      { name: "Geotechnical engineering", id: 187320778 },
      { name: "Mineralogy", id: 199289684 },
      { name: "Climatology", id: 49204034 },
      { name: "Atmospheric sciences", id: 91586092 },
      { name: "Soil science", id: 159390177 },
      { name: "Geochemistry", id: 17409809 },
      { name: "Geomorphology", id: 114793014 },
      { name: "Remote sensing", id: 62649853 },
      { name: "Geodesy", id: 13280743 },
      { name: "Seismology", id: 165205528 },
      { name: "Geophysics", id: 8058405 },
      { name: "Petrology", id: 5900021 },
      { name: "Earth science", id: 1965285 },
      { name: "Petroleum engineering", id: 78762247 },
      { name: "Mining engineering", id: 16674752 },
    ],
    value: "Geology",
    image: "/src/assets/homepage/Geography.jpg",
    show: true,
    id: 127313418,
  },
  {
    text: [
      { name: "Environmental engineering", id: 87717796 },
      { name: "Soil science", id: 159390177 },
      { name: "Environmental resource management", id: 107826830 },
      { name: "Environmental planning", id: 91375879 },
      { name: "Agroforestry", id: 54286561 },
      { name: "Environmental protection", id: 526734887 },
      { name: "Water resource management", id: 524765639 },
      { name: "Agricultural science", id: 37621935 },
    ],
    value: "Environmental science",
    image: "/src/assets/homepage/Environment.png",
    show: true,
    id: 39432304,
  },
  {
    text: [
      { name: "Finance", id: 10138342 },
      { name: "Marketing", id: 162853370 },
      { name: "Accounting", id: 121955636 },
      { name: "Industrial organization", id: 40700 },
      { name: "Process management", id: 195094911 },
      { name: "Risk analysis (engineering)", id: 112930515 },
      { name: "Advertising", id: 112698675 },
      { name: "International trade", id: 155202549 },
      { name: "Actuarial science", id: 162118730 },
      { name: "Financial system", id: 73283319 },
      { name: "Economic policy", id: 105639569 },
      { name: "Commerce", id: 54750564 },
      { name: "Business administration", id: 178550888 },
    ],
    value: "Business",
    image: "/src/assets/homepage/Business.svg",
    show: true,
    id: 144133560,
  },
  {
    text: [
      { name: "Humanities", id: 15708023 },
      { name: "Literature", id: 124952713 },
      { name: "Visual arts", id: 153349607 },
      { name: "Aesthetics", id: 107038049 },
      { name: "Art history", id: 52119013 },
      { name: "Classics", id: 74916050 },
    ],
    value: "Art",
    image: "/src/assets/homepage/Art.jpg",
    show: true,
    id: 142362112,
  },
  {
    text: [
      { name: "Archaeology", id: 166957645 },
      { name: "Art history", id: 52119013 },
      { name: "Ancient history", id: 195244886 },
      { name: "Classics", id: 74916050 },
      { name: "Ethnology", id: 2549261 },
      { name: "Economic history", id: 6303427 },
      { name: "Genealogy", id: 53553401 },
    ],
    value: "History",
    image: "/src/assets/homepage/History.jpg",
    show: true,
    id: 95457728,
  },
]);
function goSubject(name) {
  const data = {
    searchType: 0,
    and_list: [{ content: name, select: "Domain", type: "AND", clear: 1 }],
    or_list: [],
    not_list: [],
    start_time: "",
    end_time: "",
  };
  Store.commit("setAdvancedSearch", data);
  router.push({
    path: "/searchResult",
  });
}
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
    path: `/article/${id}`,
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
    path: `/institution/${id}`,
  });
}
function goAllSubjects() {
  router.push({
    path: "/subject",
  });
}

function change(item) {
  item.show = !item.show;
}
function showInfo(item_id) {
  dialogVisible.value = true;
  axios({
    url: "http://122.9.5.156:8000/api/v1/institutions/get_concept_information",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      token: getUserInfo().token,
      concept_id: item_id,
    }),
  })
    .then((res) => {
      id.value = String(item_id);
      flag.value = 0;
      subjectInfo.name = res.data.data.display_name;
      subjectInfo.description = res.data.data.description;
      subjectInfo.summary_stats = res.data.data.summary_stats;
      subjectInfo.img_url = res.data.data.image_url;
      xData = res.data.data.counts_by_year
        .map((item) => String(item.year))
        .reverse();
      yData1 = res.data.data.counts_by_year
        .map((item) => String(item.cited_by_count))
        .reverse();
      yData2 = res.data.data.counts_by_year
        .map((item) => String(item.works_count))
        .reverse();
      yData3 = res.data.data.counts_by_year
        .map((item) => String(item.oa_works_count))
        .reverse();
    })
    .catch((err) => {
      console.log(err);
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
  height: 600px;
  background-color: white;
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-between;
  // align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
}

.nav-item {
  margin-left: 10%;
  width: 80%;
  align-self: stretch;
  height: 50px;
  padding-top: 10px;
  min-height: 50px;
  cursor: pointer;
}

.nav-item-left {
  color: black;
  font-weight: bold;
  font-size: 16px;
  margin: auto;
  height: calc(100% - 10px);
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
  border-bottom: #ccd0d8 1px solid;
}

// .nav-item:hover {
//   transform: translate(5px, 3px);
//   box-shadow: 0 0 10px rgba(159, 174, 157, 0.521);
//   transition: ease 0.2s;

//   .nav-item-left {
//     border-bottom: transparent 1px solid;
//   }
// }

.arrow {
  transition: ease 0.7s;
  color: rgb(218, 218, 218);
}

.nav-item:hover .arrow {
  transform: translate(10px);
  transition: ease 0.7s;
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
  // font-style: italic;
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
  // font-style: italic;
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

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: white;
}

.subject-name {
  color: black;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  line-height: 70px;
  height: 70px;
  font-size: 50px;
  cursor: auto;
}

.subject-description {
  margin-top: 40px;
  margin-bottom: 40px;
  margin-left: 20px;
  color: black;
  font-weight: bold;
  font-size: 25px;
  cursor: auto;
}

.image-block {
  width: 500px;
  height: 450px;
  margin-left: 130px;
  margin-top: 50px;
  overflow: hidden;
}

.image {
  width: 500px;
  height: 450px;
  display: block;
}

.summary {
  margin-left: 5px;
  margin-bottom: 20px;
  font-weight: bold;
  font-style: italic;
  font-size: 20px;
  color: rgb(90, 156, 248);
}

.el-dialog__wrapper {
  max-height: calc(100vh - 120px);
  /* 在这里设置最大高度 */
}
</style>
