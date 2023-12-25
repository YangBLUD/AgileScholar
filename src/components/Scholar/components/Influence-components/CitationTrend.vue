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
const citationdata  = reactive(getAuthorStates().authorInformation.counts_by_year.slice(0, 10).reverse() // 截取前十个元素
    .map(item => ({
      value: item.cited_by_count
    })),);

// ECharts 配置项
const chartOptions =ref( {
  animation: true, // 启用动画效果
  title: {
    text: 'Citation Trend Graph',
    top: 'top',
    left: 'center',
  },
  xAxis: {
    type: 'category',
    data: yeardata,
    axisLabel: {
      color: '#333', // 坐标轴标签颜色
      fontSize: 12, // 坐标轴标签字体大小
      interval: 0, // 强制显示所有标签
      rotate: 45, // 标签旋转角度
    },
    axisLine: {
      lineStyle: {
        color: '#000'
      }
    },
  },
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#000'
      }
    },
    axisLabel: {
      color: '#333',
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: '#ccc'
      }
    }
  },
  grid: {
    left: '5%',
    right: '5%',
    top: '10%',
    bottom: '5%',
    containLabel: true // 防止标签溢出
  },
  series: [
    {
      data: citationdata,
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 2, // 线条宽度
        shadowColor: 'rgba(0, 0, 0, 0.3)', // 添加阴影效果
        shadowBlur: 5,
        shadowOffsetY: 5,
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(30,144,255,0.7)' // 深蓝色渐变
        },
          {
            offset: 1,
            color: 'rgba(70,130,180,0)' // 透明
          }
        ])
      },
      label: {
        show: true,
        position: 'top', // 标签位置可根据需要调整
        formatter: '{c}', // 数据格式
        textStyle: {
          color: '#333', // 文本颜色
          fontSize: 12, // 字体大小
        }
      }
    }
  ],
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(30,144,255,0.7)',
    textStyle: {
      color: '#fff'
    }
  },
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
