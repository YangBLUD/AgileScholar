<template>
  <div ref="chartDiv" :style="{ width: '100%', height: chartHeight + 'px' }"></div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';
import * as echarts from 'echarts';
import { useStore } from "vuex";
const store = useStore()
const chartDiv = ref(null);
const chartHeight = ref(680);
function getAuthorStates() {
  return store.getters.getAuthorState
}
const referdata = getAuthorStates().authorNetwork
var nodes = [];
var links = [];
let curcolor = '#5470C6';
var mainAuthor = {
  name: getAuthorStates().authorInformation.display_name, symbolSize: 100, itemStyle: {
    color: getRandomColor() // Call the function to get a random color
  }
};
nodes.push(mainAuthor)
console.log(getAuthorStates().authorNetwork.co_work_list)
console.log(getAuthorStates().authorNetwork.refer_list)
console.log(getAuthorStates().authorNetwork.referred_list)
getLinks()
function getLinks() {
  // 添加被引用关系
  if (referdata.refer_list.length != 0) {
    referdata.refer_list.slice(0, 10).forEach(function (author) {
      nodes.push({
        name: author.name,
        symbolSize: author.count * 50,
        itemStyle: {
          color: curcolor = getRandomColor() // Call the function to get a random color
        }
      });
      links.push({
        source: author.name,
        target: getAuthorStates().authorInformation.display_name,
        label: {
          show: true,
          formatter: 'Referred',
          fontSize: 12
        },
        lineStyle: {
          normal: {
            color: curcolor,
            width: 2, // 设置线条宽度
            curveness: 0.1 // 设置线条的弯曲度，值在 0 到 1 之间
          }
        }
      });
    });
  }
}

function getRandomColor() {
  // Generate a random hexadecimal color code
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
function getRandomNumber() {
  return Math.floor(Math.random() * 200) + 1; // 生成 1 到 100 之间的随机整数
}

const chartOptions = {
  title: {
    text: 'Author Reference Graph'
  },
  tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [
    {
      type: 'graph',
      layout: 'force',
      force: {
        repulsion: 6000, // 调整节点之间的排斥力，值越大节点之间的间距越大
      },
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
    chartDiv.value.removeAttribute("_echarts_instance_");
    chart.setOption(chartOptions);
    // 监听图表内容变化
    watchEffect(() => {
      // 获取图表内容的高度
      const chartContentHeight = chartDiv.value.firstChild.clientHeight;
      // 设置图表的高度为内容高度
      chartHeight.value = chartContentHeight + 100;
    });
  } else {
    console.error("Chart element is not available");
  }
});
</script>
