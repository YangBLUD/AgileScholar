<template>
    <div class="main">
        <div class="second">
            <div class="second-search-results">
                <span>Search Results</span>
            </div>
            <div class="second-search-form">
                <span>搜索栏</span>
            </div>
        </div>
        <div class="middle">
            <div class="middle-left">
                左侧列表
                <div class="middle-left-people">

                </div>
                <div class="middle-left-publications">
                
                </div>
                <div class="middle-left-conferences">
                    
                </div>
            </div>
            <div class="middle-right">
                <!-- 右侧列表 -->
                <div class="middle-right-sum">
                    总览
                </div>
                <div class="search-result-tabs">
                    <div class="nav-container">
                        结果期刊软件人
                    </div>
                    <div class="nav-result">
                        结果共1000条
                    </div>
                </div>
                <div class="search-result-checkbox">
                    筛选器
                </div>
                <div class="middle-right-list">
                    论文列表
                    <ul >
                        <li >

                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script setup>
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
        padding: 40px 80px;
        font-size: 50px;
        font-weight: 600;
        color: white;
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
            background-color: rgb(138, 165, 42);
            display: flex;
            margin: auto 0;
            .nav-container{
                left: 20%;
                width: 50%;
                margin: auto 0;
            }
            .nav-result{
                right: 10%;
                width: 30%;
                margin: auto 0;
            }
        }
        .search-result-checkbox{
            height: 70px;
            background-color: rgb(42, 79, 165);
            
        }
        .middle-right-list{
            height: 200px;
            background-color: blanchedalmond;
            ul{
                li{
                    width: 100%;
                    height: 100px;
                    background-color: black; 
                }
            }
        }
    }
}

</style>