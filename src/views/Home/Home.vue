<template>
  <div class="home-container">

    <el-card style="background-color: rgba(255,255,255,0.65)">您好
      <el-tag style="margin-left: 1vw" size="large" type="success">{{ userStateStore.currentUser?.baseInfo.nickname }}
      </el-tag>
      欢迎使用Zeus后台管理系统&nbsp;祝您生活愉快
    </el-card>
    <!-- Tech stack description -->
    <el-card class="tech-card" style="background-color: rgba(255,255,255,0.65)">
      <ProjectDescriptions/>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import * as echarts from 'echarts'
import {useUserStateStore} from "../../stores/userState.ts";

const chart1 = ref<HTMLDivElement | null>(null)
const chart2 = ref<HTMLDivElement | null>(null)
const chart3 = ref<HTMLDivElement | null>(null)
const chart4 = ref<HTMLDivElement | null>(null)
const userStateStore = useUserStateStore();

// 初始化图表方法
function initChart(dom: HTMLDivElement | null, options: any) {
  if (!dom) return
  const chart = echarts.init(dom)
  chart.setOption(options)
}

onMounted(() => {
  initChart(chart1.value, {
    title: {text: '示例折线图'},
    tooltip: {},
    xAxis: {data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    yAxis: {},
    series: [{type: 'line', data: [150, 230, 224, 218, 135, 147, 260]}]
  })

  initChart(chart2.value, {
    title: {text: '示例柱状图'},
    tooltip: {},
    xAxis: {data: ['A', 'B', 'C', 'D', 'E']},
    yAxis: {},
    series: [{type: 'bar', data: [12, 20, 15, 8, 7]}]
  })

  initChart(chart3.value, {
    title: {text: '示例饼图'},
    tooltip: {trigger: 'item'},
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          {value: 1048, name: '搜索引擎'},
          {value: 735, name: '直接访问'},
          {value: 580, name: '邮件营销'},
          {value: 484, name: '联盟广告'},
          {value: 300, name: '视频广告'}
        ]
      }
    ]
  })

  initChart(chart4.value, {
    title: {text: '示例雷达图'},
    tooltip: {},
    radar: {
      indicator: [
        {name: '销售', max: 6500},
        {name: '管理', max: 16000},
        {name: '信息技术', max: 30000},
        {name: '客服', max: 38000},
        {name: '研发', max: 52000},
        {name: '市场', max: 25000}
      ]
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '预算分配'
          }
        ]
      }
    ]
  })
})
</script>

<style scoped>
.home-container {
  padding: 20px;
}



.chart {
  width: 500px;
  height: 300px;
}

.tech-card {
  margin-top: 1vh;
}

.tech-card h3 {
  margin-bottom: 10px;
}
</style>
