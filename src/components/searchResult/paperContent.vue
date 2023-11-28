<template>
    <div class="main">
        <div class="left">
            <div class="timer">
                <div class="state">
                    PROCEEDING
                </div>
                <div class="time">
                    October 2022
                </div>
            </div>
            <div class="pic">
                <img src="../../assets/test.jpg" alt="" width="100px" height="120px">
            </div>
        </div>
        <div class="right">
            <div class="title">
                CAIN '22:Proceedings of the 1st International Conference on AI Engineering:
Software Engineering for AI
            </div>
            <div class="writer">
                <img src="../../assets/test.jpg" class="writer-pic"/>
                <div class="name">Ivica Crnkovic</div>
            </div>
            <div class="abstract">
                The aim of the conference is to bring together researchers and practitioners in software
engineering,in data science and Al,and to build up a community that will target the new
challenges emerging in Software Engineering for Al-enabled systems.In the ..
            </div>
            <div class="bottom">
                <div class="data">
                    <div class="inference">
                        <el-icon><Edit /></el-icon>
                        <div>31</div>
                    </div>
                    <div class="trend">
                        <el-icon><DocumentAdd /></el-icon>
                        <div>5093</div>
                    </div>
                </div>
                <div class="highlight">
                    Highlight
                </div>
                <div class="choice">
                    <div class="introduce">
                        <el-icon><Edit /></el-icon>
                    </div>
                    <div class="addfile">
                        <el-icon><DocumentAdd /></el-icon>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script setup>
import { Edit ,DocumentAdd} from "@element-plus/icons-vue";
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
            font-size: 12px;
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
    }
    .writer{
        display: flex;
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
    .abstract{
        width: 87%;
        white-space: pre-wrap;
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
            width: 20%;
            border-right: 1px;
            font-size: 15px;
            .inference{
                /* margin:  0 5px; */
                display: flex;
            }
            .trend{
                    /* margin: 0 5px; */
                display: flex;
            }
        }
        .highlight{
            position: relative;
            left: 0%;
            width: 10%;
        }
        .choice{
            position: relative;
            left:30%;
            display: flex;
            .introduce{
                background-color: rgb(231, 229, 229);
                margin: 2px;
                font-size: 20px;
                color: gray;
                border-radius: 2px;
            }
            .addfile{
                background-color: rgb(231, 229, 229);
                margin: 2px;
                font-size: 20px;
                color: gray;
                border-radius: 2px;
            }
        }
    }
}
</style>