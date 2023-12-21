<template>
    <div class="main" @click="console.log(info.title)">
        <div class="left">
            <div class="timer">
                <div class="state">
                    PROCEEDING
                </div>
                <div class="time">
                    {{ props.info.publication_date }}
                </div>
            </div>
            <div class="pic" >
                <img src="../../assets/test.jpg" alt="" style="width: 100px;height: 120px;">
            </div>
        </div>
        <div class="right">
            <div class="title">
                {{ props.info.title }}
            </div>
            <div class="wri_list" >
                <div class="writer" v-for="item in props.info.author_all.slice(0,3)">
                    <img src="../../assets/test.jpg" class="writer-pic"/>
                    <div class="name">{{ item }}</div>
                </div>
            </div>
            <div class="abstract">
                <div v-if="props.info.abstract" class="ab-text">{{ props.info.abstract }}</div>
                <div v-else>without abstract</div>
            </div>
            <div class="bottom">
                <div class="data">
                    <div class="inference">
                        <el-icon><Edit /></el-icon>
                        <div class="inf-num">{{ props.info.cited_count }}</div>
                    </div>
                    <div class="trend">
                        <el-icon><DocumentAdd /></el-icon>
                        <div class="tr-num">{{ props.info.type_num }}</div>
                    </div>
                </div>
                <div class="choice">
                    <div class="introduce" v-if="props.info.pdf_url">
                        <el-icon @click="gotopdf"><Document /></el-icon>
                    </div>
                    <div class="introduce" v-if="props.info.landing_page_url">
                        <el-icon @click="gotolink"><Link /></el-icon>
                    </div>
                    <div class="introduce">
                        
                        <stardialog :folderlist = "folderlist" :token = "user_token" :paper_id="paper_id" :type="type"></stardialog>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script setup>
import { Edit ,DocumentAdd,StarFilled,Link,Document} from "@element-plus/icons-vue";
import { defineProps } from 'vue';
import { reactive, ref, onMounted, onUnmounted ,onBeforeMount} from "vue";
import axios from "axios";
import stardialog from "./stardialog.vue";
import { useStore } from "vuex";
const Store = useStore();
onMounted(() => {
    //addstar();
});
const user_token = ref("eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJcdThjMjJcdTc5YzlcdTRlNjZcdTZjYTFcdTcyNWJcdTcyNWIiLCJ0eXBlIjoidXNlciIsImV4cCI6MTcwMjEwNzEzNy44MDk2MDc3fQ.rVGoTbaiH3XLZudPCxShFXnWg72Yiykuyi0Jn-XPrIE");
//用于收藏
const paper_id = ref("2106749358");
const type = ref(0);
const folder_id = ref(2);
const folderlist = ref([{"folder_id": 1,"folder_name": "谢秉书没牛牛1","num": 2},{"folder_id": 2,"folder_name": "谢秉书没牛牛2","num": 2}]);
function getfold(){
    return;
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/get_folders",
      method: "post",
      data: JSON.stringify({    
            token :user_token,
      }),
    })
      .then((res) => {
            console.log(res);
            folderlist = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
}
function addstar(){
    axios({
      url: "http://122.9.5.156:8000/api/v1/home/star",
      method: "post",
      data: JSON.stringify({    
            token :user_token,
            "paper_id": paper_id,
            "type": type,
            "folder_id": folder_id,
      }),
    })
      .then((res) => {
            console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
}
//用于链接的分享
function gotolink(){
    window.open(props.info.landing_page_url);
}
//用于pdf
function gotopdf(){
    window.open(props.info.pdf_url);
}
const props = defineProps({
    info:Object,
})
</script>
<style scoped>
.main{
    display: flex;
}
.left{
    display: flex;
    width:30%;
    .timer{
        width: 40%;
        margin: 15px;
        .state{
            font-size: 18px;
            font-weight:500;
        }
        .time{
            font-size: 14px;
            color: gray;
        }
    }
    .pic{
        position: relative;
        left: 10%;
        margin: 15px;
        width: 30px;
        height: 30px;
    }
}
.right{
    margin: 15px;
    position: relative;
    left: 10%;
    height: 100%;
    /* width: 95%; */
    .title{
        color: #5f99cc;
        font-size: 18px;
        font-weight: 400;
        width: 87%;
        cursor: pointer;
    }
    .wri_list{
        display: flex   ;
        .writer{
        display: flex;
        cursor: pointer;
        margin-right: 20px;
        .writer-pic{

            margin: 10px 5px 10px 0px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid;
        }
        .name{
            margin: 15px 0;
            color: #806f5d;
            text-decoration: underline;
        }
    }
    }
    
    .abstract{
        font-size: 15px;
        width: 87%;
        height: 78px;
        white-space: pre-wrap;
        text-overflow:ellipsis ;
        overflow: hidden;
        
    }
    .bottom{
        position: relative;
        left: 0px;
        bottom : 0px;
        margin: 15px 0;
        display: flex;
        width: 100%;
        .data{
            position: relative;
            left: 0px;
            display: flex;
            width: 22%;
            border-right: 1px solid #e6e6e6;
            font-size: 18px;
            .inference{
                margin-top: 5px;
                margin-right: 10px;
                display: flex;
                color: #0077c2;
                font-size: 25px;
                .inf-num{
                    margin-top:3px;
                    font-size: 17px;
                    margin-left: 5px;
                }
            }
            .inference:hover{
                cursor:pointer;
                transform:translate(1px,-1px)
            }
            .trend{
                margin-top: 5px;
                margin-right: 10px;
                display: flex;
                color: #974dff;
                font-size: 25px;
                .tr-num{
                    margin-top:3px;
                    font-size: 17px;
                    margin-left: 5px;
                }
            }
            .trend:hover{
                cursor:pointer;
                transform:translate(1px,-1px)
            }
        }
        .choice{
            position: relative;
            left:45%;
            display: flex;
            .introduce{
                background-color: rgb(231, 229, 229);
                margin: 5px;
                margin-left: 5px;
                font-size: 25px;
                color: gray;
                border-radius: 2px;
                height: 30px;
                width: 30px;
                display: flex;
                justify-content:center;
                align-items:center;
            }
            .introduce:hover{
                background-color: #d7d7d7;
            }
        }
    }
}
</style>