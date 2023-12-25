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
let curcolor ='#5470C6';
const colors = ['#1f77b4', '#2ca02c', '#ff7f0e', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
var mainAuthor = { name: getAuthorStates().authorInformation.display_name, symbolSize: 100 , itemStyle: {
    color: colors[0] // Call the function to get a random color
  }};
nodes.push(mainAuthor)
getLinks()
function getLinks(){
  if  (referdata.co_work_list.length!=0){
    referdata.co_work_list.slice(0,10).forEach(function (author) {
      nodes.push({
        name: author.name,
        symbolSize: author.count*50,
        itemStyle: {
          color: curcolor=getRandomColor() // Call the function to get a random color
        },
      });
      links.push({
        source: getAuthorStates().authorInformation.display_name,
        target: author.name,
        market:false,
        lineStyle: {
          normal: {
            color:colors[nodes.length%10-1],
            width: 2, // 设置线条宽度
            curveness: 0, // 设置线条的弯曲度，值在 0 到 1 之间
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
    text: 'Author Relationship Graph',
    textStyle: {
      fontFamily: 'Arial, sans-serif'
    }
  },
  tooltip: {
    backgroundColor: 'rgba(50,50,50,0.7)', // Dark tooltip for tech feel
    textStyle: {
      color: '#fff'
    }
  },
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
        show: true,
        color: '#fff', // Contrast color for labels
        fontFamily: 'Arial, sans-serif'
      },
      edgeSymbol: ['rectangle', 'none'],
      edgeSymbolSize: [4, 10],
      edgeLabel: {
        fontSize: 20,
        color: '#fff'
      },
      data: nodes,
      links: links,
      lineStyle: {
        normal: {
          width: 3, // Thicker lines for better visibility
          curveness: 0, // Slight curve for a modern look
        }
      },
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
      chartHeight.value = chartContentHeight+100;
    });
  } else {
    console.error("Chart element is not available");
  }
});
</script>
