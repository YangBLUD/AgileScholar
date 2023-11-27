<template>
  <div ref="chartDiv" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartDiv = ref(null);
// ECharts 配置项
const chartOptions = {
  title: {
    text: '学术关注点'
  },
  tooltip: {},
  xAxis: {
    data: ['项目A', '项目B', '项目C', '项目D']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10]
  }]
};

onMounted(() => {
  if (chartDiv.value) {
    const chart = echarts.init(chartDiv.value);
    chart.setOption(chartOptions);
  } else {
    console.error("Chart element is not available");
  }
});
</script>
