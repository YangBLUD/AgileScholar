<template>
    <div class="main">
        <div class="second">
            <div class="second-search-results">
                <span>Search Results</span>
            </div>
            <div class="second-search-form">
                <div class='content-search'>
					<input type="" name="" placeholder="搜索" class="content-search-input">
					<el-icon :size='22' color='#808080'><search /></el-icon>
				</div>
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
                    <div class="first-line">
                        <div class="search-num">
                            98,230 
                            <div style="font-weight: 300;">Results for: </div>
                            All: ai
                        </div>
                        <div class="sum-button">
                            <el-button type="primary" class="button">Edit Search</el-button>
                            <el-button type="success" class="button">Save Search</el-button>
                            <el-button type="info" class="button">RSS</el-button>
                        </div>
                    </div>
                    <div class="sum-text">
                        <div class="text-first">Searched The ACM Full-Text Collection (718,901 records)|</div><div class="text-second">Expand to The ACM Guide to Computing Literature (3,605,660 records) </div>
                    </div>
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
                    <div class="shai-checkbox">
                        <el-checkbox />
                    </div>
                    <div class="select-all">Select all</div>
                    <div class="per-page">per page:20</div>
                    <div class="drop-choice">
                        <el-col :span="8">
                            <el-dropdown trigger="click">
                                <span class="el-dropdown-link">Relevance</span>
                                <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item >Earliest</el-dropdown-item>
                                    <el-dropdown-item >Latest</el-dropdown-item>
                                    <el-dropdown-item >Downloaded</el-dropdown-item>
                                    <el-dropdown-item >Cited</el-dropdown-item>
                                </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </el-col>
                    </div>
                </div>
                <div class="middle-right-list">
                    <div class="paper-list">
                        <div class="list-item">
                            <div class="checkbox">
                                <el-checkbox />
                            </div>
                            <div class="context">
                                <Content></Content>
                            </div>
                        </div>
                        <div class="list-item">
                            <div class="checkbox">
                                <el-checkbox />
                            </div>
                            <div class="context">
                                <Content></Content>
                            </div>
                        </div>
                        <div class="list-item">
                            <div class="checkbox">
                                <el-checkbox />
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
    list-style-type: none;}
.second{
    top: 0px;
    height: 150px;
    width: 87%;
    background-color: aqua;
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
        .middle-right-sum{
            height: 100px;
            
            display: inline;
            .first-line{
                display: flex;
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
                height: 70px;
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
                left: 50%;
                height: 30px;
                font-size: 13px;
                font-weight: 600;
                color: black;
                border-right: 1px solid #e6e6e6;
            }
            .drop-choice{
                position: relative;
                left: 52%;
                width: 20%;
                margin-top: 28px;
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
        }
    }
}

</style>