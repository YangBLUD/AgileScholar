<template>
    <div class="main">
        <div class="label">
            <div class="label-content">People</div>
        </div>
        <div class="list">
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="Names" name="1">
                    <div>
                    item1
                    </div>
                    <div>
                    item2
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Institutions" name="2">
                    <div>
                    item1
                    </div>
                    <div>
                    item2
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Authors" name="3">
                    <div>
                    item1
                    </div>
                    <div>
                    item2
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Editors" name="4">
                    <div>
                    item1
                    </div>
                    <div>
                    item2
                    </div>
                </el-collapse-item>
                <el-collapse-item title="Advisors" name="5">
                    <div>
                    item1
                    </div>
                    <div>
                    item2
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const activeNames = ref(['1'])
const handleChange = (val) => {
  console.log(val);
};

</script>
<style scoped>
.main{
    position: relative;
    left: 0px;
    width: 85%;
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
    }
}
</style>