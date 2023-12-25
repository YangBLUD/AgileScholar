<template>
    <div>
        <TopNav></TopNav>
    </div>
    <div class="institution-show-header">
    </div>
    <div class="institution-show-body">
        <div class="institution-show-row">
            <div class="institution-show-aside"></div>
            <div class="institution-show-content">
                <div class="institution-show-content-head">
                    <div class="institution-show-content-info">RESEARCH-INSTITUTION
                    </div>
                    <div class="institution-show-content-group">
                        <el-icon class="institution-show-content-icon"><Share /></el-icon>
                    </div>
                </div>
            </div>
            <div class="institution-show-aside"></div>
        </div>

        <div class="institution-show-row">
            <div class="institution-show-aside">

            </div>
            <div class="institution-show-content">
                <BasicInformation/>
                <div class="institution-more-inform">
                    <Citedby/>
                    <div class="holder"></div>
                    <Domain/>
                </div>
                <div class="institution-more-inform">
                    <Articles/>
                    <div class="holder"></div>
                    <Authors/>
                </div>
            </div>
            <div class="institution-show-aside">

            </div>
        </div>
    </div>
</template>

<script setup>
import {Share} from "@element-plus/icons-vue";
import TopNav from "../HomePage/TopNav.vue";
import BasicInformation from "./BasicInformation.vue";
import Citedby from "./Citedby.vue";
import Domain from "./Domain.vue";
import axios from "axios";
import store from "../../store/index.js";
import {ElMessage} from "element-plus";
import {onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import Articles from "./Articles.vue";
import Authors from "./Authors.vue";

const route = useRoute();
onMounted(()=>{
    jump(route.params.id)
})
watch(()=>store.state.Institution.id, (newVal, oldVal)=>{

})

function jump(institution_id){
    axios({
        // 接口网址：包含协议名，域名，端口和路由
        url: 'http://122.9.5.156:8000/api/v1/institutions/get_institution_information',
        // 请求方式，默认为get，可以不写
        method: 'post',
        // 请求可以携带的参数，用对象来写，get方法对应params，其他方法对应data
        data: JSON.stringify({
            token: store.state.User.token,
            institution_id: institution_id,
        }),
// 成功请求回数据后，进入then，并用console.log打印结果
    }).then(res => {
        if(res.data.errno === 0){
            store.commit('updateInstitution', res.data.data)
            console.log(res.data.data)
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
.header-padding{
    /*width: 100vw;*/
    height: 8vh;
    min-height: 68px;
    color: #f9f9f9;
    background-color: #1a1a1a;
}


.institution-show-header{
    height: 75px;
    /*width: 100vw;*/
    display: flex;
    flex-direction: column;
    align-items: center;
}
.institution-show-path{
    width: 100%;
    max-width: 1300px;
    padding: 0 15px;
    /*background-color: #f0f0f0;*/
    line-height: 50px;
    color: #595959;
}
.institution-show-path-way{
}


.institution-show-body{
    /*width: 100vw;*/
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.institution-show-row{
    width: 100%;
    height: auto;
    /*min-height: 46vh;*/
    max-width: 1400px;
    padding: 0 15px;
    /*background-color: #f9f9f9;*/
    display: grid;
    grid-template-columns: minmax(100px, 10%) minmax(800px, 80%) minmax(100px, 10%);
}
.institution-more-inform{
    height: auto;
    /*min-height: 46vh;*/
    /*background-color: #f9f9f9;*/
    display: grid;
    grid-template-columns: minmax(590px, 74%) minmax(10px, 1%) minmax(200px, 25%);
}
.institution-show-aside{
    /*background-color: #f3f3f3;*/
}

.institution-show-content{
    height: auto;
    /*background-color: #f6f6f6;*/
    font-size: 14px;
    display: block;
}
.institution-show-content-head{
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #888888;
}
.institution-show-content-info{
    font-size: 12px;
}

.institution-show-content-author-all :hover{
    color: #535bf2;
}

.institution-show-content-source{
}
.institution-show-content-source ul{
    margin-left: 18px;
}
.institution-show-content-source p{
    margin: 14px 0;
}



* {
    margin: 0;
    padding: 0;
    /*-webkit-box-sizing: border-box;*/
    /*-moz-box-sizing: border-box;*/
    /*box-sizing: border-box;*/
}
</style>
