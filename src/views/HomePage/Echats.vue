<template>
    <div class="echarts-line" ref="chart"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
    props: {
        xData: {
            type: Array,
            required: true,
        },
        yData: {
            type: Array,
            required: true,
        },
        options: {
            type: Object,
            default: () => ({}),
        },
    },
    mounted() {
        this.initChart();
    },
    methods: {
        initChart() {
            const chartDom = this.$refs.chart;
            this.myChart = echarts.init(chartDom);
            this.renderChart();
        },
        renderChart() {
            this.myChart.setOption({
                xAxis: {
                    type: "category",
                    data: this.xData,
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        type: "line",
                        data: this.yData,
                    },
                ],
            });
        },
    },
    watch: {
        xData: {
            handler() {
                this.renderChart();
            },
            deep: true,
        },
        yData: {
            handler() {
                this.renderChart();
            },
            deep: true,
        },
    },
};
</script>

<style scoped>
.echarts-line {
    width: 1100px;
    height: 600px;
}
</style>