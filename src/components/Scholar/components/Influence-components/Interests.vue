<template>
  <div ref="chartDiv" style="width: 100%; height: 600px;"></div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import * as echarts from 'echarts';
import { useStore } from "vuex";

const chartHeight = ref(680);
const store = useStore();
const chartDiv = ref(null);

function getAuthorStates() {
  return store.getters.getAuthorState;
}

const domaindata = reactive(getAuthorStates().authorInformation.domain.slice(0, 10)
    .map(item => ({
      value: parseFloat(item.activity_level) * 1000,
      name: item.name
    })),
);

let max = 1000;
const valuedata = domaindata.map(item => {
  max = Math.max(item.value, max);
  return item.value;
});

const indicatedata = domaindata.map(item => ({
  name: item.name,
  max: max
}));

const chartOptions = {
  title: {
    text: 'Research Interests',
    left: 'center',
    textStyle: {
      color: '#333',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontFamily: 'Arial',
      fontSize: 20
    }
  },
  legend: {
    top: 'bottom'
  },
  radar: {
    name: {
      textStyle: {
        color: '#555',
        backgroundColor: '#fff',
        borderRadius: 3,
        padding: [3, 5]
      }
    },
    indicator: indicatedata
  },
  series: [{
    type: 'radar',
    data: [{
      value: valuedata,
      name: 'Research Interests',
      areaStyle: {
        color: '#1E90FF'
      },
      lineStyle: {
        width: 2,
        color: '#97FFFF'
      },
      symbol: 'circle',
      symbolSize: 5
    }]
  }],
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderColor: '#fff',
    borderWidth: 1,
    textStyle: {
      color: '#fff'
    }
  }
};

onMounted(() => {
  const chart = echarts.init(chartDiv.value, null, { renderer: 'svg' });
  chart.setOption(chartOptions);
});
</script>
