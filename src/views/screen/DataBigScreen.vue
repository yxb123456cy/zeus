<script setup lang="ts">
import {onMounted, ref, watch} from 'vue'
import * as echarts from 'echarts'
import Westeros from '../../config/theme/westeros.json'
import purplepassion from '../../config/theme/purple-passion.json'
import roma from '../../config/theme/roma.json'
import vintage from '../../config/theme/vintage.json'
import walden from '../../config/theme/walden.json'
import macarons from '../../config/theme/macarons.json'

// 主题相关
const currentTheme = ref('westeros')
const availableThemes = [
  {value: 'westeros', label: '西雅图'},
  {value: 'purplepassion', label: '紫色激情'},
  {value: 'roma', label: '罗马'},
  {value: 'vintage', label: '复古'},
  {value: 'walden', label: '沃尔登'},
  {value: 'macarons', label: '马卡龙'}
]

const map = new Map;
map.set('westeros',Westeros);
map.set('purplepassion',purplepassion);
map.set('roma',roma);
map.set('vintage',vintage);
map.set('walden',walden);
map.set('macarons',macarons);


// 图表实例引用
const chart1 = ref<HTMLDivElement | null>(null)
const chart2 = ref<HTMLDivElement | null>(null)
const chart3 = ref<HTMLDivElement | null>(null)
const chart4 = ref<HTMLDivElement | null>(null)

// 图表实例
let chart1Instance: echarts.ECharts | null = null
// 图表实例
let chart2Instance: echarts.ECharts | null = null
// 图表实例
let chart3Instance: echarts.ECharts | null = null
// 图表实例
let chart4Instance: echarts.ECharts | null = null

// 初始化图表方法
function initChart(dom: HTMLDivElement | null, options: any, instanceRef: { instance: echarts.ECharts | null }) {
  if (!dom) return

  const themeName = currentTheme.value;

  // 销毁旧实例
  const oldInstance = echarts.getInstanceByDom(dom);
  if (oldInstance) {
    echarts.dispose(oldInstance);
  }

  // 注册并初始化新主题
  echarts.registerTheme(themeName, map.get(themeName));
  const chart = echarts.init(dom, themeName);
  chart.setOption(options);
  instanceRef.instance = chart;
}

const renderChart = () => {

  initChart(chart1.value, {
    title: {text: '官网访问人数变化折线图'},
    tooltip: {},
    xAxis: {data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']},
    yAxis: {},
    series: [{type: 'line', data: [150, 230, 224, 218, 135, 147, 260]}]
  }, { instance: chart1Instance })

  initChart(chart2.value, {
    title: {text: '商品销售数目柱状图'},
    tooltip: {},
    xAxis: {data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']},
    yAxis: {},
    series: [{type: 'bar', data: [1048, 735, 580, 484, 300, 600]}]
  }, { instance: chart2Instance })

  initChart(chart3.value, {
    title: {text: '商品销售占比饼图'},
    tooltip: {trigger: 'item'},
    legend: {
      orient: 'vertical',
      left: 'left',
      top: "40"
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        data: [
          {value: 1048, name: '衬衫'},
          {value: 735, name: '羊毛衫'},
          {value: 580, name: '雪纺衫'},
          {value: 484, name: '裤子'},
          {value: 300, name: '高跟鞋'},
          {value: 600, name: '袜子'}
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }, { instance: chart3Instance })

  initChart(chart4.value, {
    title: {text: '公司财务支出雷达图'},
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
  }, { instance: chart4Instance })
}

onMounted(() => {
  renderChart()
})

watch(currentTheme, () => {
  renderChart()
})
</script>

<template>
  <div class="data-BigScreen-container">
    <div style="display: flex;justify-content: left;align-items: center;">
      <div style="margin-top: -15px"><el-tag>主题选择:</el-tag></div>
      <div style="margin-left: 1vw">
        <el-select v-model="currentTheme" placeholder="选择主题" style="margin-bottom: 20px; width: 200px;">
          <el-option
              v-for="theme in availableThemes"
              :key="theme.value"
              :label="theme.label"
              :value="theme.value"
          />
        </el-select>
      </div>
    </div>


    <el-card header="第一组">
      <el-row :gutter="20">
        <!-- 图表卡片保持原有结构 -->
        <el-col :span="12" style="margin-top: 1vh">
          <el-card class="chart-card">
            <div ref="chart1" class="chart"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 1vh">
          <el-card class="chart-card">
            <div ref="chart2" class="chart"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 1vh">
          <el-card class="chart-card">
            <div ref="chart3" class="chart"></div>
          </el-card>
        </el-col>
        <el-col :span="12" style="margin-top: 1vh">
          <el-card class="chart-card">
            <div ref="chart4" class="chart"></div>
          </el-card>
        </el-col>
        <!-- 其他三个图表保持相同结构 -->
      </el-row>
    </el-card>
  </div>
</template>

<style scoped lang="less">
.data-BigScreen-container {
  margin: 0 auto;

  .chart-card {
    width: 600px;
    height: 320px;

    .chart {
      width: 500px;
      height: 300px;
    }
  }
}
</style>