<template>
    <div>
        <div ref="chart" style="width: 600px; height: 400px;"></div>
        <button @click="refreshData">刷新数据</button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

export default {
    setup() {
        const chartData = ref([10, 20, 30, 40, 50]);
        let chartInstance = null;

        const refreshData = () => {
            // 模拟获取新数据
            chartData.value = [30, 40, 50, 60, 70];
            // 刷新图表数据
            chartInstance.setOption({
                series: [{
                    data: chartData.value
                }]
            });
        };

        onMounted(() => {
            chartInstance = echarts.init(document.getElementById('chart'));
            chartInstance.setOption({
                xAxis: {
                    type: 'category',
                    data: ['A', 'B', 'C', 'D', 'E']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: chartData.value,
                    type: 'bar'
                }]
            });
        });

        return {
            refreshData
        };
    }
};
</script>
