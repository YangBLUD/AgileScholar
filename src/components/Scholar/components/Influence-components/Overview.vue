<template>
  <div ref="chartDiv" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import {ref, onMounted, reactive} from 'vue';
import * as echarts from 'echarts';
import {useStore} from "vuex";
const store = useStore()
function getAuthorStates(){
  return store.getters.getAuthorState
}
const data = reactive(getAuthorStates().authorInformation.summary_stats)
const citedByCount = data.cited_by_count;
const y2_citedByCount = data.yr2_cited_by_count;
const h_index = data.h_index;
const yr2_h_index = data.yr2_h_index;
const works_count = data.works_count;
const yr2_works_count = data.yr2_works_count;


const chartDiv = ref(null);
// ECharts 配置项
let chartOptions = {
  title: {
    text: 'Scholar Index Graph',
    top: 'top',
    left: 'center',
  },
  color: ['#1E90FF', '#7FFF00'], // 设置新的颜色方案
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      let tooltipText = params[0].name + '<br/>';
      params.forEach(function (item) {
        tooltipText += item.seriesName + ': ' + item.value.toFixed(2) + '%<br/>';
      });
      return tooltipText;
    }
  },
  legend: {
    data: ['Total', 'Last 2 Years'],
    top:"bottom"
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    axisLabel: {
      formatter: '{value}%'
    }
  },
  yAxis: {
    type: 'category',
    data: ['Cited By Count', 'H Index', 'Works Count']
  },
  series: [
    {
      name: 'Total',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        formatter: function (params) {
          return params.value.toFixed(2) + '%';
        }
      },
      data: [
        ((citedByCount - y2_citedByCount) / citedByCount * 100).toFixed(2),
        ((h_index - yr2_h_index) / h_index * 100).toFixed(2),
        ((works_count - yr2_works_count) / works_count * 100).toFixed(2)
      ].map(Number)
    },
    {
      name: 'Last 2 Years',
      type: 'bar',
      stack: 'total',
      label: {
        show: true,
        formatter: function (params) {
          return params.value.toFixed(2) + '%';
        }
      },
      data: [
        (y2_citedByCount / citedByCount * 100).toFixed(2),
        (yr2_h_index / h_index * 100).toFixed(2),
        (yr2_works_count / works_count * 100).toFixed(2)
      ].map(Number)
    }
  ]
};

// const chartOptions = {
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'cross',
//       crossStyle: {
//         color: '#999'
//       }
//     }
//   },
//   grid: {
//     right: '20%'
//   },
//   toolbox: {
//     feature: {
//       dataView: { show: true, readOnly: false },
//       magicType: { show: true, type: ['line', 'bar'] },
//       restore: { show: true },
//       saveAsImage: { show: true }
//     }
//   },
//   legend: {
//     data: ['Cited By Count', 'Works Count', 'H Index', 'OA Percent']
//   },
//   xAxis: [
//     {
//       type: 'category',
//       data: ['Total', 'Last 2 Years']
//     }
//   ],
//   yAxis: [
//     {
//       type: 'value',
//       name: 'Count',
//       min: 0,
//       max: 40000,
//       position: 'right',
//       axisLine: {
//         lineStyle: {
//           color: '#5793f3'
//         }
//       },
//       axisLabel: {
//         formatter: '{value}'
//       }
//     },
//     {
//       type: 'value',
//       name: 'Percent',
//       min: 0,
//       max: 100,
//       position: 'left',
//       axisLine: {
//         lineStyle: {
//           color: 'black'
//         }
//       },
//       axisLabel: {
//         formatter: '{value} %'
//       }
//     }
//   ],
//   series: [
//     {
//       name: 'Cited By Count',
//       type: 'bar',
//       itemStyle: {
//         color: '#FF6A6A' // 修改柱状图颜色
//       },
//       data: [citedByCount, y2_citedByCount]
//     },
//     {
//       name: 'Works Count',
//       type: 'bar',
//       yAxisIndex: 0,
//       itemStyle: {
//         color: '#7FFF00' // 修改柱状图颜色
//       },
//       data: [works_count, yr2_works_count]
//     },
//     {
//       name: 'H Index',
//       type: 'line',
//       yAxisIndex: 1,
//       data: [h_index, yr2_h_index]
//     },
//     {
//       name: 'OA Percent',
//       type: 'line',
//       yAxisIndex: 1,
//       data: [9.41, 9.41] // 假定两年都是 9.41%
//     }
//   ]
// };
//
// const chartOptions = {
//   color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
//   title: {
//     text: 'Gradient Stacked Area Chart'
//   },
//   tooltip: {
//     trigger: 'axis',
//     axisPointer: {
//       type: 'cross',
//       label: {
//         backgroundColor: '#6a7985'
//       }
//     }
//   },
//   legend: {
//     data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5']
//   },
//   toolbox: {
//     feature: {
//       saveAsImage: {}
//     }
//   },
//   grid: {
//     left: '3%',
//     right: '4%',
//     bottom: '3%',
//     containLabel: true
//   },
//   xAxis: [
//     {
//       type: 'category',
//       boundaryGap: false,
//       data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//     }
//   ],
//   yAxis: [
//     {
//       type: 'value'
//     }
//   ],
//   series: [
//     {
//       name: 'Line 1',
//       type: 'line',
//       stack: 'Total',
//       smooth: true,
//       lineStyle: {
//         width: 0
//       },
//       showSymbol: false,
//       areaStyle: {
//         opacity: 0.8,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           {
//             offset: 0,
//             color: 'rgb(128, 255, 165)'
//           },
//           {
//             offset: 1,
//             color: 'rgb(1, 191, 236)'
//           }
//         ])
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [140, 232, 101, 264, 90, 340, 250]
//     },
//     {
//       name: 'Line 2',
//       type: 'line',
//       stack: 'Total',
//       smooth: true,
//       lineStyle: {
//         width: 0
//       },
//       showSymbol: false,
//       areaStyle: {
//         opacity: 0.8,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           {
//             offset: 0,
//             color: 'rgb(0, 221, 255)'
//           },
//           {
//             offset: 1,
//             color: 'rgb(77, 119, 255)'
//           }
//         ])
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [120, 282, 111, 234, 220, 340, 310]
//     },
//     {
//       name: 'Line 3',
//       type: 'line',
//       stack: 'Total',
//       smooth: true,
//       lineStyle: {
//         width: 0
//       },
//       showSymbol: false,
//       areaStyle: {
//         opacity: 0.8,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           {
//             offset: 0,
//             color: 'rgb(55, 162, 255)'
//           },
//           {
//             offset: 1,
//             color: 'rgb(116, 21, 219)'
//           }
//         ])
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [320, 132, 201, 334, 190, 130, 220]
//     },
//     {
//       name: 'Line 4',
//       type: 'line',
//       stack: 'Total',
//       smooth: true,
//       lineStyle: {
//         width: 0
//       },
//       showSymbol: false,
//       areaStyle: {
//         opacity: 0.8,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           {
//             offset: 0,
//             color: 'rgb(255, 0, 135)'
//           },
//           {
//             offset: 1,
//             color: 'rgb(135, 0, 157)'
//           }
//         ])
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [220, 402, 231, 134, 190, 230, 120]
//     },
//     {
//       name: 'Line 5',
//       type: 'line',
//       stack: 'Total',
//       smooth: true,
//       lineStyle: {
//         width: 0
//       },
//       showSymbol: false,
//       label: {
//         show: true,
//         position: 'top'
//       },
//       areaStyle: {
//         opacity: 0.8,
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           {
//             offset: 0,
//             color: 'rgb(255, 191, 0)'
//           },
//           {
//             offset: 1,
//             color: 'rgb(224, 62, 76)'
//           }
//         ])
//       },
//       emphasis: {
//         focus: 'series'
//       },
//       data: [220, 302, 181, 234, 210, 290, 150]
//     }
//   ]
// };
onMounted(() => {
  if (chartDiv.value) {
    const chart = echarts.init(chartDiv.value);
    chart.setOption(chartOptions);
  } else {
    console.error("Chart element is not available");
  }
});
</script>
