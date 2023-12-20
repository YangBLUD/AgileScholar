<template>
    <div class="main">
        <div class="label">
            <div class="label-content">{{ props.agginfo.name }}</div>
        </div>
        <div class="list">
            <el-collapse v-model="activeNames" @change="handleChange" >
                <el-collapse-item :title=item.raw :name=index v-for="(item,index) in props.agginfo.data" :key="index" @click.native="changeitem(item)">
                    <template #title>
                        <div class="el-collapse-item-title">{{ item.raw }}</div>
                    </template>
                    <div class="item-item" :key=index v-for="(str,index) in titlearr">
                    {{ str }}
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({
    agginfo:Object,
})
const activeNames = ref(['1'])
const handleChange = (val) => {
  console.log(val);
};
//用于item的渲染
const titlearr = ref([]);
function changeitem(item){
    let title = item.raw;
    let str = title.split(" & ");
    console.log(str);
    titlearr.value = str.slice(0,str.length-1);
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
            border-bottom:1px solid #e6e6e6;
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