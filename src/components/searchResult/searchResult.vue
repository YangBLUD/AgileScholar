<template>
    <div class="main">
        <div class="second">
            <div class="second-search-results">
                <span>Search Results</span>
            </div>
            <div class="second-search-form">
                <div class='content-search'>
					<input type="" name="" placeholder="Search" class="content-search-input" v-model="searchcontent">
					<el-icon :size='22' color='#808080' @click="keysearch()"><search /></el-icon>
				</div>
            </div>
        </div>
        <div class="middle">
            <div class="middle-left">
                <div class="middle-left-people" :key="index" v-for="(item,index) in agg">
                    <Droplist :agginfo="item"/>
                </div>
            </div>
            <div class="middle-right">
                <!-- 右侧列表 -->
                <div class="middle-right-sum">
                    <div class="first-line">
                        <div class="search-num">
                            {{ totalpage }}
                            <div style="font-weight: 300;">Results for: </div>
                            All: {{ search_title }}
                        </div>
                    </div>
                    <div class="sum-text">
                        <div class="text-first">Searched The ACM Full-Text Collection ({{totalpage}} records)|</div><div class="text-second">Expand to The ACM Guide to Computing Literature (3,605,660 records) </div>
                    </div>
                </div>
                <div class="search-result-tabs">
                    <div class="nav-container">
                        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                            <el-tab-pane label="RESULTS" name="RESULTS"></el-tab-pane>
                            <el-tab-pane label="SCHOLARS" name="SCHOLARS"></el-tab-pane>
                            <el-tab-pane label="INSTITUTIONS" name="INSTITUTIONS"></el-tab-pane>
                            <el-tab-pane label="SUBJECTS" name="SUBJECTS"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="nav-result">
                        Showing {{ search_from }} - {{ search_to }} of {{ totalpage }} Results
                    </div>
                </div>
                <div class="search-result-checkbox">
                    <div class="shai-checkbox">
                        <el-checkbox />
                    </div>
                    <div class="select-all">Select all</div>
                    <div class="per-page">per page:
                        <div v-if="papernum == 10"  class="page-num-active" >10  </div>
                        <div v-else class="page-num-com"  @click="changeSize(10)">10  </div>

                        <div v-if="papernum == 20" class="page-num-active">20  </div>
                        <div v-else class="page-num-com"  @click="changeSize(20)">20  </div>

                        <div v-if="papernum == 30" class="page-num-active" >30  </div>
                        <div v-else class="page-num-com"  @click="changeSize(30)">30  </div>
                    </div>
                    <div class="drop-choice" >
                        <el-col :span="8">
                            <el-dropdown trigger="click" >
                                <span class="el-dropdown-link" @click="dropsort()">Relevance</span>
                                <template #dropdown >
                                <el-dropdown-menu>
                                    <el-dropdown-item :key=index v-for="(item,index) in sortlist" @click="changesort(item)">{{ item.text }}</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
                    </div>
                </div>
                <div class="middle-right-list">
                    <div class="paper-list" :key="index" v-for="(item,index) in paper_list">
                        <div class="list-item">
                            <div class="checkbox">
                                <el-checkbox />
                            </div>
                            <div class="context" >
                                <Content :info="item"/>
                            </div>
                        </div>
                    </div>
                    <div class="bottom-page">
                        <div class="example-pagination-block">
                        <el-pagination layout="prev, pager, next" :page-count="totalye" v-model:current-page="currentPage"
                        @current-change="currentChange"
                        @prev-click="prevClick"
                        @next-click="nextClick"
                        />
                    </div>
                    </div>
                </div>
            </div>
        </div>   
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, onUnmounted ,onBeforeMount,watch,computed} from "vue";
import axios from "axios";
import Content from './paperContent.vue'
import Droplist from './droplist.vue'
import { Search} from "@element-plus/icons-vue";
import { useStore } from "vuex";
const Store = useStore();
//搜索框
const searchcontent = ref("AI");
//搜索函数
function keysearch(){
    return;
    getpaperlist();
}
//初始化函数
onBeforeMount(() => {
    searchcontent.value = Store.getters.getSearch.and_list[0].content;
    getpaperlist();
    totalpage.value =100; //获取总数
    dropsort();
});
//额外的请求参数
const search_first_search = ref(1)
const search_type = ref(0)
const search_work_clustering = ref(0)
const search_author_clustering = ref(1)

const search_sort = ref(0)
const search_extend_list = ref([])

//用于论文列表的渲染
const paper_list = ref([])
//用于第一行的渲染
const search_title = ref("ai")

//下一行的滑动
const activeName = ref('RESULTS');
const handleClick = (tab, event) => {
    if(tab.props.name == "RESULTS"){
        search_type.value = 0;
    }
    else if(tab.props.name == "SCHOLARS"){
        search_type.value = 1;
    }
    else if(tab.props.name == "INSTITUTIONS"){
        search_type.value = 2;
    }
    else if(tab.props.name == "SUBJECTS"){
        search_type.value = 3;
    }
    getpaperlist();
    resetpage();
};
const totalye = ref(0);
function getpaperlist(){
    axios({
      url: "http://122.9.5.156:8000/api/v1/search_result/search",
      method: "post",
      data: JSON.stringify({
            token :Store.getters.getUserinfo.token,
            search_type : search_type.value,
            and_list : Store.getters.getSearch.and_list,
            or_list : Store.getters.getSearch.or_list,
            not_list : Store.getters.getSearch.not_list,
            start_time : Store.getters.getSearch.start_time,
            end_time : Store.getters.getSearch.end_time,
            first_search : search_first_search.value,
            work_clustering : search_work_clustering.value,
            author_clustering : search_author_clustering.value,
            size : papernum.value,
            from : search_from.value - 1,
            sort : search_sort.value,
            extend_list : search_extend_list.value,
      }),
    })
      .then((res) => {
        let data = res.data.data;
        paper_list.value = data.result;
        totalpage.value = data.total;
        agg.value = data.agg;
        search_to.value = Math.min(data.total,papernum.value);
        totalye.value = parseInt(totalpage.value / papernum.value) +1;
        console.log(data.agg.data);
      })
      .catch((err) => {
        console.log(err);
      });
}
//选择显示论文的条数
const papernum = ref(20)
const search_to = ref(20)
const search_from  = ref(1)

function changeSize(size){
    papernum.value = size;
    getpaperlist();
    search_to.value = search_from.value + (papernum.value - 1);
}
function resetpage(){
    search_from.value = 1;
    search_to.value = search_from.value + papernum.value;
}
//左侧的聚类
const agg = ref([]);
function getCluster(){
	//返回的是ref对象
	return Store.getters.getCluster;
}
watch(getCluster, (newVal, oldVal) => {
	console.log('newVal, oldVal', newVal, oldVal);
    getnewagg();
}, {deep:true});
function getnewagg(){
    search_work_clustering.value = getCluster;
    getpaperlist();
    resetpage();
}
//翻页功能的实现
const currentPage = ref(1);
const totalpage = ref(0);
const currentChange = () => {
    search_from.value = (currentPage.value-1) * papernum.value + 1;
    search_to.value = (currentPage.value ) * papernum.value;
    getpaperlist();
  };
  
//点击左边一页, 切换呈现<新的页码-1>号子数组
const prevClick = () => {
    currentPage.value - 1;
    search_from.value = (currentPage.value-1) * papernum.value + 1;
    search_to.value = (currentPage.value ) * papernum.value;
    getpaperlist();
};

//点击向右一页, 切换呈现<新的页码+1>号子数组
const nextClick = () => {
    currentPage.value + 1;
    search_from.value = (currentPage.value-1) * papernum.value + 1;
    search_to.value = (currentPage.value ) * papernum.value;
    getpaperlist();
};

//下拉框排序
const sortlist = ref([])
function dropsort(){
    sortlist.value = [];
    if(search_type.value == 0){
        sortlist.value.push({id:0,text:"Cited least"});
        sortlist.value.push({id:1,text:"Cited most"});
        sortlist.value.push({id:2,text:"Latest"});
        sortlist.value.push({id:3,text:"Earliest"});
        sortlist.value.push({id:4,text:"Title down"});
        sortlist.value.push({id:5,text:"Title up"});
    }
    else if(search_type.value == 1 ||search_type.value == 2){
        sortlist.value.push({id:0,text:"Cited least"});
        sortlist.value.push({id:1,text:"Cited most"});
        sortlist.value.push({id:2,text:"Index down"});
        sortlist.value.push({id:3,text:"Index up"});
        sortlist.value.push({id:4,text:"More than 10 in 2"});
        sortlist.value.push({id:5,text:"More than 10 in 5"});
        sortlist.value.push({id:6,text:"Results down"});
        sortlist.value.push({id:7,text:"Results up"});
        sortlist.value.push({id:8,text:"Name down"});
        sortlist.value.push({id:9,text:"Name down"});
    }
    else if(search_type.value == 3){
        sortlist.value.push({id:0,text:"Cited least"});
        sortlist.value.push({id:1,text:"Index up"});
        sortlist.value.push({id:2,text:"Results down"});
        sortlist.value.push({id:3,text:"Results up"});
        sortlist.value.push({id:4,text:"Level down"});
        sortlist.value.push({id:5,text:"Level up"});
        sortlist.value.push({id:6,text:"Name down"});
        sortlist.value.push({id:7,text:"Name up"});
    }
}
function changesort(item){
    search_sort.value = item.id;
    getpaperlist();
}
//用于测试
function tst(){
    paper_list.value = [];
    for(let i = 0;i<papernum.value;i++){
        paper_list.value.push(test);
    }
}
const test = {
    title: "AI4TV '19: Proceedings of the 1st International Workshop on AI for Smart TV Content Production, Access and Delivery",
    id: "4254080329",
    abstract: "It is our great pleasure to welcome you to the  Production, Access and Delivery - AI4TV 2019. New scientific breakthroughs in video understanding through the d as dasdasd a sda sda sdasd asd adas ad sdas d sd a d as d a d a sd a s d a d as da sdasd a sd a sdapplication of AI techniques along with ...",
    cited_count: 0,
    domain: [
        {
            "name": "Psychology",
            "id": "15744967",
            "level": "0",
            "activity_level": "0.2911021"
        }
    ],
    author_all: ["aaa","bbb","ccc","ddd"],
    pdf_url: null,
    landing_page_url: "https://doi.org/10.1007/978-3-319-15347-6_300037",
    source: [
        {
            "name": "Springer eBooks",
            "type": "ebook platform",
            "id": "4310319965"
        }
    ],
    publication_date: "2020-01-01",
    type_num: 110,
    is_star: false
}

</script>

<style scoped>
ul{
    list-style: none;
}
.main{
    list-style-type: none;}
.second{
    top: 0px;
    height: 150px;
    width: 87%;
    background-image: url("../../assets/border.jpg");
    display: flex;
    padding: 0px 100px;
    margin-bottom: 50px;
    .second-search-results{
        padding: 40px 80px;
        font-size: 50px;
        font-weight: 600;
        color: white;
    }
    .second-search-form{
        position: relative;
        top:10px;
        padding: 40px 80px;
        font-size: 50px;
        font-weight: 600;
        color: white;

        .content-search{
            position: relative;
            left: 180px;
            display: flex;
            align-items: center;
            padding:5px 10px;
            width: 450px;
            height: 45px;
            background: #F0F2F4;
            border-radius: 8px;
            .content-search-input{
                padding:0 10px;
                width:530px;
                height: 50px;
                border:0;
                border-radius: 8px;
                background: #F0F2F4;
                color:#808080;
                font-size:16px;
                outline: none;
            }
        }
    }
}
.middle{
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    display: flex;
    .middle-left{
        width: 25%;
    }
    .middle-right{
        width: 75%;
        /* display: flex; */
        
        .middle-right-sum{
            height: 70px;
            
            display: inline;
            .first-line{
                display: flex;
                margin-bottom: 10px;
                .search-num{
                    font-size: 20px;
                    font-weight: 400;
                    display: flex;
                }
                .sum-button{
                    position: relative;
                    left: 20px;
                    display: flex;
                    width: 70%;
                   
                }
            }
            .sum-text{
                font-size: 15px;
                font-weight: 100;
                height: 50px;
                width: 100%;
                border-bottom:1px solid #e6e6e6;
                display: flex;
                .text-first{
                    width: 43%;
                }
                .text-second{
                    position: relative;
                    color: #0077c2;
                    left: 0px;
                    width: 55%
                }
            }
        }
        .search-result-tabs{
            height: 50px;
            width: 100%;
            display: flex;
            margin: auto 0;
            background-color: #fafafa;
            .nav-container{
                left: 20%;
                width: 50%;
                margin: auto 0;
                .demo-tabs{
                    padding-left: 10px;
                }
            }
            .nav-result{
                position: relative;
                top:-3px;
                left : 20%;
                width: 30%;
                margin: auto 0;
            }
        }
        .search-result-checkbox{
            height: 70px;
            display: flex;
            border-bottom: 1px solid #fdfdfd;
            .shai-checkbox{
                margin-top: 20px;
                position: relative;
                left: 5px;
            }
            .select-all{
                margin: 25px 20px;
                font-size: 15px;
                color: #e6e6e6;
                font-weight: 500;
                width: 160px;
            }
            .per-page{
                margin-top: 25px;
                position: relative;
                padding-right: 10px;
                left: 46%;
                height: 30px;
                font-size: 15px;
                font-weight: 400;
                color: black;
                border-right: 1px solid #e6e6e6;
                display: flex;
                .page-num-com{
                    margin-right: 15px;
                    cursor: pointer;
                }
                .page-num-active{
                    margin-right: 15px;
                    font-weight: 600;
                    cursor: pointer;
                }
            }
            .drop-choice{
                position: relative;
                left: 48%;
                width: 20%;
                margin-top: 28px;
                .el-dropdown-link{
                    cursor: pointer;
                }
            }
            
        }
        .middle-right-list{
            height: 180px;
            /* background-color: blanchedalmond; */
            .paper-list{
                .list-item{
                    margin: 20px 0px;
                    width: 100%;
                    height: 250px; 
                    display: flex;                   
                    .checkbox{
                        position: relative;
                        left: 5px;
                        width: 20px;
                    }   
                    .context{
                        position: relative;
                        top:0px;
                        left: 20px;
                        height: 100%;
                        width: 95%;
                        background-color: white;
                        box-shadow: 0 0.3125rem 0.5rem rgba(0,0,0,.1);
                    }

                }
            }
            .bottom-page{
                margin-left: 300px;
                .example-pagination-block + .example-pagination-block {
                    margin-top: 10px;
            }
            }
            
        }
    }
}

</style>