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
                    axisLabel: {
                        fontSize: 14, // 设置 x 轴单位的字体大小
                    },
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        fontSize: 14, // 设置 x 轴单位的字体大小
                    },
                },
                legend: {
                    show: true,
                },
                series: [
                    {
                        type: "line",
                        data: this.yData,
                        label: {
                            show: false, // 初始时不显示标签
                            formatter: "{c}", // 标签内容为数值
                            fontSize: 16,
                        },
                        symbolSize: 10, // 设置点的大小
                        emphasis: {
                            label: {
                                show: true, // 鼠标悬停时显示标签
                            },
                        },
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