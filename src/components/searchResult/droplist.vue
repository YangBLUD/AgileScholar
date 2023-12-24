<template>
    <div class="main">
        <div class="label">
            <div class="label-content">{{ props.agginfo.text }}</div>
        </div>
        <div class="list">
            <el-collapse v-model="activeNames" @change="handleChange" >
                <el-collapse-item :title=item.raw :name=index v-for="(item,index) in props.agginfo.data.splice(0,6)" :key="index" >
                    <template #title>
                        <div class="el-collapse-item-title">{{ item.raw }}</div>
                    </template>
                    <div class="item-item" @click="aggchange(item)">
                    {{ item.raw }}&nbsp;({{ item.value }})
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script setup>
import { reactive, ref, onMounted, onUnmounted ,onBeforeMount,watch,computed} from "vue";
import axios from "axios";
import { useStore } from "vuex";
const Store = useStore();

const props = defineProps({
    agginfo:Object,
})
const activeNames = ref(['1'])
const handleChange = (val) => {
  console.log(val);
};
//用于item的渲染
const titlearr = ref([]);
//点击进行聚类
function aggchange(item){
    console.log("eeeeeeeeeee");
    console.log(item.raw);
    Store.commit("setCluster", props.agginfo.text,item.raw);
    console.log(Store.getters.getCluster);
}
</script>
<style scoped>
.main{
    position: relative;
    left: 0px;
    width: 89%;
    .label{
        position: relative;
        left: 0px;
        width:100%;
        height: 40px;
        font-size: 20px;
        font-weight: 700;
        background-color: #f0f0f0;
        padding-top: 10px;
        /* padding-left: 10px; */
        .label-content{
            position: relative;
            left: 10px;
        }

    }
    .list{
        position: relative;
        left:0px;
        width:100%;
        text-overflow:ellipsis 
        
    }
    .item-item{
            margin-left: 15px;
            margin-bottom: 3px;
            word-break: break-all;
            cursor: pointer;
        }
    .el-collapse-item-title {
            width: 90%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-left: 10px;
        }
}
</style>