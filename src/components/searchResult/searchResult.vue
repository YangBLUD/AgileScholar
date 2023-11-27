<template>
    <div class="main">
        <div class="second">
            <div class="second-search-results">
                <span>Search Results</span>
            </div>
            <div class="second-search-form">
                <el-form >
                    <el-form-item>
                        <el-input class="el-search"/>
                        <el-button :icon="Search" />
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="middle">
            <div class="middle-left">
                <div class="middle-left-people">
                    <Droplist></Droplist>
                </div>
                <div class="middle-left-publications">
                    <Droplist></Droplist>
                </div>
                <div class="middle-left-conferences">
                    <Droplist></Droplist>
                </div>
            </div>
            <div class="middle-right">
                <!-- 右侧列表 -->
                <div class="middle-right-sum">
                    总览
                </div>
                <div class="search-result-tabs">
                    <div class="nav-container">
                        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                            <el-tab-pane label="RESULTS" name="first"></el-tab-pane>
                            <el-tab-pane label="PERIODICALS" name="second"></el-tab-pane>
                            <el-tab-pane label="SOFTWARE" name="third"></el-tab-pane>
                            <el-tab-pane label="PEOPLE" name="fourth"></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="nav-result">
                        Showing 1 - 20 of 98,218 Results
                    </div>
                </div>
                <div class="search-result-checkbox">
                    筛选器
                </div>
                <div class="middle-right-list">
                    <div class="paper-list">
                        <div class="list-item">
                            <div class="checkbox">
                                <el-checkbox v-model="checked3"/>
                            </div>
                            <div class="context">
                                <Content></Content>
                            </div>
                        </div>
                        <div class="list-item">
                            <div class="checkbox">
                                <el-checkbox v-model="checked3"/>
                            </div>
                            <div class="context">
                                <Content></Content>
                            </div>
                        </div>
                        <div class="list-item">
                            <div class="checkbox">
                                <el-checkbox v-model="checked3"/>
                            </div>
                            <div class="context">
                                <Content></Content>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
import Content from './paperContent.vue'
import Droplist from './droplist.vue'
import { Search} from "@element-plus/icons-vue";
import { ref } from 'vue';

const activeName = ref('first');
const handleClick = (tab, event) => {
};
</script>
<style scoped>
ul{
    list-style: none;
}
.main{
    /* display: flex; */
    /* justify-content: center; */
    list-style-type: none;}
.second{
    top: 0px;
    height: 150px;
    width: 100%;
    background-color: aqua;
    display: flex;
    padding: 0px 100px;
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
        .el-search{
           height: 55px;
           width: 600px; 
        }
    }
}
.middle{
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    background-color: antiquewhite;
    display: flex;
    .middle-left{
        width: 25%;
        background-color: azure;
    }
    .middle-right{
        width: 75%;
        background-color: blueviolet;
        .middle-right-sum{
            height: 100px;
            background-color: brown;
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
            background-color: rgb(42, 79, 165);
            
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
                    box-shadow: 0 0 5px 1px #999;
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
                    }

                }
            }
        }
    }
}

</style>