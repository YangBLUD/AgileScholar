<template>
  <div ref="chartDiv" style="width: 100%; height: 600px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartDiv = ref(null);
// ECharts 配置项
var data = [
  {
    name: 'Mathematics',
    children: [
      {
        name: 'Algebra',
        value: 15,
        children: [
          {
            name: 'Linear Algebra',
            value: 2
          },
          {
            name: 'Abstract Algebra',
            value: 5,
            children: [
              {
                name: 'Group Theory',
                value: 9
              }
            ]
          },
          {
            name: 'Number Theory',
            value: 4
          }
        ]
      },
      {
        name: 'Geometry',
        children: [
          {
            name: 'Euclidean Geometry',
            value: 4
          }
        ]
      },
      {
        name: 'Calculus',
        value: 10,
        children: [
          {
            name: 'Differential Calculus',
            value: 5,
            itemStyle: {
              color: 'red'
            }
          },
          {
            name: 'Integral Calculus',
            value: 1
          }
        ]
      }
    ]
  },
  {
    name: 'Science',
    children: [
      {
        name: 'Physics',
        children: [
          {
            name: 'Quantum Mechanics',
            value: 3
          },
          {
            name: 'Classical Mechanics',
            value: 4,
            children: [
              {
                name: 'Newtonian Mechanics',
                value: 2
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Literature',
    children: [
      {
        name: 'English Literature',
        children: [
          {
            name: 'Shakespearean Studies',
            value: 1
          },
          {
            name: 'Modern Literature',
            value: 2
          }
        ]
      }
    ]
  }
];

const chartOptions = {
  title: {
    text: 'Academic Focus Graph',
    top: 'top',
    left: 'center',
  },
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 10,
    inRange: {
      color: ['#2F93C8', '#AEC48F', '#FFDB5C', '#F98862','#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00']
    }
  },
  series: {
    type: 'sunburst',
    data: data,
    radius: [0, '90%'],
    label: {
      rotate: 'radial'
    }
  }
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
