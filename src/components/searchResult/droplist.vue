<template>
    <div class="main">
        <div class="label">
            <div class="label-content">{{ props.agginfo.name }}</div>
        </div>
        <div class="list">
            <div class="list-item"  v-for="(item,index) in props.agginfo.data.slice(0,6)" :key="index" @click="aggchange(item)" v-if="props.agginfo.data && props.agginfo.data.length!=0">
                <div class="item-item">
                    {{ item.show }}&nbsp;({{ item.value }})
                </div>
            </div>            
            <!-- <el-collapse v-model="activeNames" @change="handleChange" v-if="props.agginfo.data && props.agginfo.data.length!=0">
                <el-collapse-item :title=item.show :name=index v-for="(item,index) in props.agginfo.data.slice(0,6)" :key="index" accordion=true>
                    <template #title>
                        <div class="el-collapse-item-title">{{ item.show }}</div>
                    </template>
                    <div class="item-item" @click="aggchange(item)">
                    {{ item.show }}&nbsp;({{ item.value }})
                    </div>
                </el-collapse-item>
            </el-collapse> -->
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted ,onBeforeMount} from "vue";
import axios from "axios";
import { storeKey, useStore } from "vuex";
const Store = useStore();
onMounted(() => {
    console.log(props.agginfo)
});
const props = defineProps({
    agginfo:Object,
})
const activeNames = ref(['1'])
const handleChange = (val) => {
  console.log(val);
};
//点击进行聚类
function aggchange(item){
    Store.commit("setaggtext", props.agginfo.text);
    Store.commit("setaggraw",item.raw);
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
    .label:hover{
        background-color: #c8c7c7;
    }
    .list{
        position: relative;
        left:0px;
        width:100%;
        text-overflow:ellipsis 
        
    }
    .list-item{
        padding-top: 12px;
        height: 28px;
        
        margin-bottom: 3px;
        word-break: break-all;
        cursor: pointer;
        border-bottom:1px solid #e4e1e1;
    }
    .item-item{
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 15px;
        font-weight: 500;
        font-size: .875rem;
    }
    .list-item:hover{
        background-color: #f0f0f0;
    }
}
</style>