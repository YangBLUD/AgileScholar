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
const domaindata = reactive(getAuthorStates().authorInformation.domain.slice(0, 10) // 截取前十个元素
    .map(item => ({
      value: parseFloat(item.activity_level) * 10000, // Convert activity_level to a number
      name: item.name
    })),);

watch(getAuthorStates, (newVal, oldVal) => {
  console.log(newVal)
  chartOptions.value = {
    legend: {
      top: 'bottom'
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [50, 250],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: newVal.authorInformation.domain
            .slice(0, 10) // 截取前十个元素
            .map(item => ({
              value: parseFloat(item.activity_level) * 100, // Convert activity_level to a number
              name: item.name
            }))
      }
    ]
  }
}, {deep:true});
// ECharts 配置项
const chartOptions = ref( {
  legend: {
    top: 'bottom'
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie',
      radius: [50, 250],
      center: ['50%', '50%'],
      roseType: 'area',
      itemStyle: {
        borderRadius: 8
      },
      data: domaindata
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
