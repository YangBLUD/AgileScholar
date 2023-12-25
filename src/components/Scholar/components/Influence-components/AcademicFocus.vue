<template>
  <div ref="chartDiv" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartDiv = ref(null);
// ECharts 配置项
var data = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 9
              }
            ]
          },
          {
            name: 'Cousin Ben',
            value: 4
          }
        ]
      },
      {
        name: 'Aunt Jane',
        children: [
          {
            name: 'Cousin Kate',
            value: 4
          }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5,
            itemStyle: {
              color: 'red'
            }
          },
          {
            name: 'Brother Peter',
            value: 1
          }
        ]
      }
    ]
  },
  {
    name: 'Mike',
    children: [
      {
        name: 'Uncle Dan',
        children: [
          {
            name: 'Cousin Lucy',
            value: 3
          },
          {
            name: 'Cousin Luck',
            value: 4,
            children: [
              {
                name: 'Nephew',
                value: 2
              }
            ]
          }
        ]
      }
    ]
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1
          },
          {
            name: 'Cousin Jenny',
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
