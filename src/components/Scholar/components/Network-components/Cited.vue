<template>
  <div ref="chartDiv" :style="{ width: '100%', height: chartHeight + 'px' }"></div>
</template>

<script setup>
import {ref, onMounted, watchEffect} from 'vue';
import * as echarts from 'echarts';
import {useStore} from "vuex";
const store = useStore()
const chartDiv = ref(null);
const chartHeight = ref(680);
function getAuthorStates(){
  return store.getters.getAuthorState
}
const referdata = getAuthorStates().authorNetwork
var nodes = [];
var links = [];
var mainAuthor = { name: getAuthorStates().authorInformation.display_name, symbolSize: 10 };
nodes.push(mainAuthor)
console.log(getAuthorStates().authorNetwork.co_work_list)
 getLinks()
function getLinks(){
  var index = 0;
  if  (referdata.co_work_list.length!=0){
    referdata.co_work_list.forEach(function (author) {
      nodes.push({
        name: author.name+(index++),
        symbolSize: 100
      });
      links.push({
        source: 'Main Author',
        target: author.name+(index++),
        label: {
          show: true,
          formatter: 'Co-Work'
        }
      });
    });
  }
// 添加被引用关系
  if (referdata.referred_list.length!=0){
    referdata.referred_list.forEach(function (author) {
      nodes.push({
        name: author.name+(index++),
        symbolSize: 100
      });
      links.push({
        source: author.name+(index++),
        target: 'Main Author',
        label: {
          show: true,
          formatter: 'Referred'
        }
      });
    });
  }
}
const chartOptions = {
  title: {
    text: 'Author Relationship Graph'
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 50,
      roam: true,
      label: {
        show: true
      },
      edgeSymbol: ['circle', 'arrow'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20
      },
      data: nodes,
      links: links,
      lineStyle: {
        opacity: 0.9,
        width: 2,
        curveness: 0
      }
    }
  ]
};
onMounted(() => {
  if (chartDiv.value) {
    const chart = echarts.init(chartDiv.value);
    chart.setOption(chartOptions);
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
