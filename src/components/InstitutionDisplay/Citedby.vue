<template>
    <div class="institution-show-content-nav">
        <div class="institution-show-content-nav-block Basic-block">
            <div class="institution-show-content-nav-holder"></div>
            <div class="institution-show-content-nav-title">Cited Analysis</div>
        </div>
        <div class="basic-block">

            <div id="cited-echarts" class="cited-echarts"></div>
        </div>
    </div>

</template>


<script setup>

import {onMounted, reactive, ref, watch} from "vue";
import * as echarts from "echarts"
import store from "../../store/index.js";
import Vue from "node-forge/lib/util.js";
watch(()=>store.state.Institution.id, (newVal, oldVal)=>{
    console.log("change")
    years.value= store.getters.getYears
    cited_count.value = store.getters.getCitedCount
    work_count.value = store.getters.getWorkCount
    oa_work_count.value = store.getters.getOaWorkCount
    let timer
    let mount = 60
    timer = setInterval(()=>{
      mount --;
      if(mount <= 0){
        initChart()
        window.addEventListener('resize', handleResize);
        clearInterval(timer)
      }
    },1)
})

const years = ref(store.getters.getYears)
const cited_count = ref(store.getters.getCitedCount)
const work_count = ref(store.getters.getWorkCount)
const oa_work_count = ref(store.getters.getOaWorkCount)
function initChart(){
    const chartDom = document.getElementById('cited-echarts');
    chartDom.removeAttribute("_echarts_instance_");
    const myChart = echarts.init(chartDom);
    const option = ref({
        title: {
            text: 'Cited Count'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [  'Cited Count','Work Count', 'Oa Work Count']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: years
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Cited Count',
                type: 'line',
                stack: 'Total',
                data: cited_count
            },
            {
                name: 'Work Count',
                type: 'line',
                stack: 'Total',
                data: work_count
            },
            {
                name: 'Oa Work Count',
                type: 'line',
                stack: 'Total',
                data: oa_work_count
            },
        ]
    })
    myChart.setOption(option.value)
}
onMounted(()=> {
  setTimeout(() => {
    Vue.nextTick(() => {
      years.value = store.getters.getYears
      cited_count.value = store.getters.getCitedCount
      work_count.value = store.getters.getWorkCount
      oa_work_count.value = store.getters.getOaWorkCount
      initChart()
    });
  }, 60);  // 等待 60 毫秒
  window.addEventListener('resize', handleResize);
})
function handleResize(){
    const chartDom = document.getElementById('cited-echarts');
    const myChart = echarts.init(chartDom);
    const option = ref({
        title: {
            text: 'Cited Count'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [  'Cited Count','Work Count', 'Oa Work Count']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: years
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Cited Count',
                type: 'line',
                stack: 'Total',
                data: cited_count
            },
            {
                name: 'Work Count',
                type: 'line',
                stack: 'Total',
                data: work_count
            },
            {
                name: 'Oa Work Count',
                type: 'line',
                stack: 'Total',
                data: oa_work_count
            },
        ]
    })
    myChart.setOption(option.value)
    myChart.resize()
}

</script>


<style scoped>
.institution-show-content-nav{
    background-color: #fafafa;
    margin: 10px 10px 15px 0;
    /*padding: 30px;*/
}
.institution-show-content-nav-block{
    /*margin: -30px 0 0 -30px;*/
    padding: 13px 0;
    display: flex;
    flex-direction: row;
}
.institution-show-content-nav-holder{
    width: 8px;
    height: 18px;
    background-color: #333333;
}
.institution-show-content-nav-title{
    padding-left: 12px;
    font-size: 18px;
    line-height: 1.125rem;
    font-style: italic;
    font-weight: bold;
}

.basic-block{
    display: flex;
    flex-direction: row;
}

.cited-echarts{
    margin: 10px;
    width: 100%;
    min-width: 560px;
    height: 600px;
}
</style>
