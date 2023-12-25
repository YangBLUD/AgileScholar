<template>
    <div class="institution-show-content-nav">
        <div class="institution-show-content-nav-block Basic-block">
            <div class="institution-show-content-nav-holder"></div>
            <div class="institution-show-content-nav-title">ARTICLE</div>
        </div>
        <div class="basic-block">
            <div v-for="article in articles" class="article-block">
                <h5>RESEARCH-ARTICLE</h5>
                <div class="article-title">
                    <router-link :to="{ name: 'article-display', params: { id: article.id } }">
                        {{article.title}}
                    </router-link>
                </div>
                <div class="article-author">
                    <div v-for="author in article.author_all.slice(0, 2)" class="article-author-block">
                        <img src="../../assets/ArticleDisplay/head.jpg" alt="" class="article-author-img">
                        <span class="article-author-name text-gray">
             {{ author.name }},
            </span>
                    </div>
                    <div class="author-more">
                        ...
                    </div>

                </div>
            </div>
        </div>
        <div class="basic-bottom">
            <div class="basic-line"></div>
            <div v-if="total===0" class="basic-bottom-group">
                <div class="basic-bottom-btn">
                    <span v-if="page!==1" class="basic-bottom-text" @click="minusPage()">&lt previous</span>
                </div>
                <div class="basic-bottom-btn text-right">
                    <span v-if="page!==finalPage" class="basic-bottom-text" @click="addPage()">next &gt</span>
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>

import {ref, watch} from "vue";
import axios from "axios";
import store from "../../store/index.js";
import {ElMessage} from "element-plus";

let articles = ref([
    {
        title: "Wireless mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    },{
        title: "Wireless mesh networks: a survey wireless mesh networks: a survey mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    },{
        title: "Wireless mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    },{
        title: "Wireless mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    },{
        title: "Wireless mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    },{
        title: "Wireless mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    },{
        title: "Wireless mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    },{
        title: "Wireless mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    },{
        title: "Wireless mesh networks: a survey",
        author_all:[
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
            {
                id: "001",
                name: "Yang DingHao",
                claimed: true,
            },
        ],
        id: "2150825860",
        landing_page_url: "https://doi.org/10.1016/j.comnet.2004.12.001",
    }
])
const page = ref(0)
const total = ref(1)
const finalPage = ref(-1)
watch(()=>store.state.Institution.id, (newVal, oldVal)=>{
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
            search_type: 0,
            and_list: [{
                content: store.state.Institution.id,
                select: 'corresponding_institution_ids',
                clear: 1
            }],
            or_list:[],
            not_list: [],
            start_time: "",
            end_time: "",
            first_search: 0,
            work_clustering: 0,
            author_clustering: 0,
            size: 8,
            from: page.value * 8,
            sort: -1,
            extend_list: [],
            token: store.state.User.token,
        }),
// 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        console.log(res.data.errno)
        if(res.data.errno === 0){
            console.log(res.data.data)
            articles.value = res.data.data.result
            finalPage.value = Math.ceil(res.data.data.total/8)
        }
        else{
            ElMessage.error('出错啦，找周霄')
        }
    }).catch(err=>{
        console.log(err)
    })
    page.value = page.value + 1
}
function minusPage(){
    page.value = page.value - 1
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: 'http://122.9.5.156:8000/api/v1/search_result/search',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            search_type: 0,
            add_list: [{
                content: store.state.Institution.id,
                select: 'corresponding_institution_ids',
                clear: 1
            }],
            or_list:[],
            not_list: [],
            start_time: "",
            end_time: "",
            first_search: 0,
            work_clustering: 0,
            author_clustering: 0,
            size: 8,
            from: page.value * 8,
            sort: -1,
            extend_list: [],
            token: store.state.User.token,
        }),
// 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if(res.data.errno === 0){
            // console.log(res.data.data)
            articles.value = res.data.data.result
            finalPage.value = Math.ceil(res.data.data.total/8)
            total.value = res.data.data.total
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
    margin: 10px 10px 15px 0;
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
    padding: 0 10px 0 10px;
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 3 列，每列的宽度平均分配 */
    gap: 10px;
}

.article-block{
    height: 120px;
}
.article-block h5{
    font-weight: 500;
    margin: 0;
}
.article-title{
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 指定显示的行数 */
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 20px;
    margin-top: 5px;
    color: #8347a1;
    font-weight: 500;
    font-family: 'Open Sans', sans-serif;
    font-size: 16px;
}
.article-author{
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
}
.article-author-block{
    line-height: 36px;
    height: 36px;
    margin: 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}
.article-author-img{
    width: 30px;
    height: 30px;
    margin: 5px;
    border-radius: 30px;
}
.article-author-name{
    text-decoration: underline;
    white-space: nowrap;
}
.author-more{
    line-height: 30px;
}

.basic-bottom{
    display: flex;
    flex-direction: column;
}
.basic-line{
    width: 100%;
    height: 1px;
    background-color: #c7cacb;
}
.basic-bottom-group{
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.basic-bottom-btn{
    width: 100px;
    margin: 10px;
    line-height: 30px;
}
.text-right{
    text-align: right;
}
.basic-bottom-text{
    color: #0077c2;
    cursor: pointer;
}
</style>
