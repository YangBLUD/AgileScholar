<template>
  <div ref="chartDiv" :style="{ width: '100%', height: chartHeight + 'px' }"></div>
</template>

<script setup>
import {ref, onMounted, defineProps, reactive, watchEffect, watch} from 'vue';
import * as echarts from 'echarts';
import {useStore} from "vuex";

const chartDiv = ref(null);
const chartHeight = ref(680);
const store = useStore()
function getAuthorStates(){
  return store.getters.getAuthorState
}
const yeardata = reactive(getAuthorStates().authorInformation.counts_by_year.slice(0, 10).reverse() // 截取前十个元素
    .map(item => ({
      value: item.year,
    })),);
const workscountdata =  reactive(getAuthorStates().authorInformation.counts_by_year.slice(0, 10).reverse() // 截取前十个元素
    .map(item => ({
      value: item.works_count*100
    })),);
const oa_works_countdata =  reactive(getAuthorStates().authorInformation.counts_by_year.slice(0, 10).reverse() // 截取前十个元素
    .map(item => ({
      value: item.oa_works_count*100
    })),);
// ECharts 配置项
const chartOptions =ref( {
  color: [ '#37A2FF', '#FF0087', '#FFBF00'],
  title: {
    text: 'academic achievements'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['works_count', 'oa_works_count',]
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: yeardata
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'works_count',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#A020F0'
          },
          {
            offset: 1,
            color: '#FFFFE0'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: workscountdata
    },
    {
      name: 'oa_works_count',
      type: 'line',
      stack: 'Total',
      smooth: true,
      lineStyle: {
        width: 0
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#0000FF'
          },
          {
            offset: 1,
            color: '#00FFFF'
          }
        ])
      },
      emphasis: {
        focus: 'series'
      },
      data: oa_works_countdata
    }
  ]
});
onMounted(() => {
  console.log(getAuthorStates().authorInformation.domain)
  if (chartDiv.value) {
    const chart = echarts.init(chartDiv.value);
    chart.setOption(chartOptions.value);
    // 监听图表内容变化
    watchEffect(() => {
      // 获取图表内容的高度
      const chartContentHeight = chartDiv.value.firstChild.clientHeight;
      // 设置图表的高度为内容高度
      chartHeight.value = chartContentHeight;
    });
  } else {
    console.error("Chart element is not available");
  }
});


</script>
