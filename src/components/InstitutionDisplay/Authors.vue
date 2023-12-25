<template>
  <div class="institution-show-content-nav">
    <div class="institution-show-content-nav-block Basic-block">
      <div class="institution-show-content-nav-holder"></div>
      <div class="institution-show-content-nav-title">Author</div>
    </div>
    <div class="basic-block">
      <div v-for="author in authors" class="author-box">
        <img class="author-img" src="../../assets/ArticleDisplay/free.jpg" alt="">
        <div class="author-term-wrapper">
          <p class="author-content-header">{{ author.display_name }}</p>
        </div>
      </div>
      <div v-if="total>4" class="author-btn-group">
        <div v-if="currentPage!==1" class="author-more-two-btn" @click="minusPage()">
          Previous
        </div>
        <div v-if="currentPage!==finalPage" class="author-more-two-btn" @click="addPage()">
          Next
        </div>
      </div>
    </div>
  </div>

</template>


<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import store from "../../store/index.js";
import axios from "axios";
import {ElMessage} from "element-plus";


let institution = reactive(store.state.Institution.institution)
let authors = ref([
  {
    name: "HuoBin Tan",
  }
])
const total = ref(1)
const currentPage = ref(0)
const finalPage = ref(-1)
onMounted(()=>{

})
watch(()=>store.state.Institution.id, (newVal, oldVal)=>{
  institution = store.state.Institution.institution
  addPage()
})
function addPage(){
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: 'http://122.9.5.156:8000/api/v1/search_result/search',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      search_type: 1,
      and_list: [{
        content: store.state.Institution.id,
        select: 'Institution',
        clear: 1
      }],
      or_list:[],
      not_list: [],
      start_time: "",
      end_time: "",
      first_search: 0,
      work_clustering: 0,
      author_clustering: 0,
      size: 4,
      from: currentPage.value * 4,
      sort: -1,
      extend_list: [],
      token: store.state.User.token,
    }),
// 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    if(res.data.errno === 0){
      console.log(res.data.data)
      authors.value = res.data.data.result
      finalPage.value = Math.ceil(res.data.data.total/8)
    }
    else{
      ElMessage.error('出错啦，找周霄')
    }
  }).catch(err=>{
    console.log(err)
  })
  currentPage.value = currentPage.value + 1
}
function minusPage(){
  currentPage.value = currentPage.value - 1
  axios({
    // 接口网址：包含协议名，域名，端口和路由
    url: 'http://122.9.5.156:8000/api/v1/search_result/search',
    // 请求方式，默认为get，可以不写
    method: 'post',
    // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
    data: JSON.stringify({
      search_type: 1,
      and_list: [{
        content: store.state.Institution.id,
        select: 'Institution',
        clear: 1
      }],
      or_list:[],
      not_list: [],
      start_time: "",
      end_time: "",
      first_search: 0,
      work_clustering: 0,
      author_clustering: 0,
      size: 4,
      from: currentPage.value * 4,
      sort: -1,
      extend_list: [],
      token: store.state.User.token,
    }),
// 成功请求回数据后，进入then，并用console.log打印结果
  }).then(res => {
    console.log(res.data.errno)
    if(res.data.errno === 0){
      console.log(res.data.data)
      authors.value = res.data.data.result
      finalPage.value = Math.ceil(res.data.data.total/8)
    }
    else{
      ElMessage.error('出错啦，找周霄')
    }
  }).catch(err=>{
    console.log(err)
  })
}
</script>


<style scoped>
.institution-show-content-nav{
  background-color: #fafafa;
  margin: 10px 0 15px 0;
  /*padding: 30px;*/
}
.institution-show-content-nav-block{
  /*margin: -30px 0 0 -30px;*/
  padding: 13px 0;
  display: flex;
  flex-direction: row;
}
.institution-show-content-nav-holder{
  width: 8px;
  height: 18px;
  background-color: #333333;
}
.institution-show-content-nav-title{
  padding-left: 12px;
  font-size: 18px;
  line-height: 1.125rem;
  font-style: italic;
  font-weight: bold;
}

.basic-block{
  display: flex;
  flex-direction: column;
}

.author-box {
  --main-color-card: #c8f7dc;
  border-radius: 25px;
  /*width: 100%;*/
  margin: 10px;
  padding: 16px;
  background-color: var(--main-color-card);
  display: flex;
  flex-direction: row;
}
.author-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.author-content-header {
  text-align: center;
  font-size: 16px;
  line-height: 24px;
  font-weight: 700;
  opacity: .7;
  margin-left: 15px;
}

.author-more-btn{
  padding: 10px;
  text-align: center;
  min-width: 150px;
  height: 25px;
  line-height: 25px;
  font-size: 14px;
  font-weight: 700;
  opacity: .7;
  font-family: Merriweather Sans, sans-serif;
  margin: 5px 15px 25px 15px;
  border: 1px solid #34c471;
  border-radius: 10px;
  background-color: #c8f7dc;
  cursor: pointer;
}
.author-btn-group{
  display: flex;
  flex-direction: row;
  padding: 10px;
  min-width: 150px;
  height: 40px;
  font-size: 14px;
  font-weight: 700;
  opacity: .7;
  font-family: Merriweather Sans, sans-serif;
  margin: 5px 15px 25px 15px;
}
.author-more-two-btn{
  padding: 10px 0 10px 0;
  text-align: center;
  width: 44%;
  min-width: 50px;
  height: 25px;
  line-height: 25px;
  margin: 0 5px 0 5px;
  border: 1px solid #34c471;
  border-radius: 10px;
  background-color: #c8f7dc;
  cursor: pointer;
}
</style>