<template>
  <el-descriptions  title="项目信息" :column="2" border>
    <el-descriptions-item label="项目名称">{{ projectInfo.name }}</el-descriptions-item>
    <el-descriptions-item label="版本">{{ projectInfo.version }}</el-descriptions-item>
    <el-descriptions-item label="类型">{{ projectInfo.type }}</el-descriptions-item>
    <el-descriptions-item label="私有项目">{{ projectInfo.private ? '是' : '否' }}</el-descriptions-item>
    <el-descriptions-item label="依赖数量">{{ Object.keys(projectInfo.dependencies).length }}</el-descriptions-item>
    <el-descriptions-item label="开发依赖数量">{{ Object.keys(projectInfo.devDependencies).length }}</el-descriptions-item>
    <el-descriptions-item label="构建命令">{{ projectInfo.scripts.build }}</el-descriptions-item>
    <el-descriptions-item label="开发命令">{{ projectInfo.scripts.dev }}</el-descriptions-item>
  </el-descriptions>

  <el-tabs type="border-card" class="mt-4" >
    <el-tab-pane label="项目依赖 dependencies">
      <el-table :data="dependenciesList" border size="small" >
        <el-table-column prop="name" label="包名" />
        <el-table-column prop="version" label="版本号" />
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="开发依赖 devDependencies">
      <el-table :data="devDependenciesList" border size="small">
        <el-table-column prop="name" label="包名" />
        <el-table-column prop="version" label="版本号" />
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
const projectInfo = {
  name: "zeus-vue3-view",
  private: true,
  version: "0.0.0",
  type: "module",
  scripts: {
    dev: "vite",
    build: "vue-tsc -b && vite build",
    preview: "vite preview"
  },
  dependencies: {
    "@element-plus/icons-vue": "^2.3.1",
    "@eslint/js": "^9.24.0",
    "@vueuse/components": "^13.0.0",
    "@vueuse/core": "^13.0.0",
    "@vueuse/integrations": "^13.0.0",
    "autoprefixer": "10.4.15",
    "axios": "^1.8.4",
    "echarts": "^5.6.0",
    "element-plus": "^2.9.7",
    "globals": "^16.0.0",
    "less": "^4.3.0",
    "lodash": "^4.17.21",
    "mockjs": "^1.1.0",
    "moment": "^2.30.1",
    "normalize.css": "^8.0.1",
    "nprogress": "^0.2.0",
    "pinia": "^3.0.1",
    "pinia-plugin-persistedstate": "^4.2.0",
    "postcss": "8.4.28",
    "remixicon": "^4.6.0",
    "screenfull": "^6.0.2",
    "tailwindcss": "3.3.3",
    "vue": "^3.5.13",
    "vue-i18n": "^11.1.3",
    "vue-router": "4"
  },
  devDependencies: {
    "@vitejs/plugin-vue": "^5.2.3",
    "@vue/tsconfig": "^0.7.0",
    "typescript": "~5.8.3",
    "unplugin-auto-import": "^19.2.0",
    "unplugin-vue-components": "^28.5.0",
    "vite": "^6.3.5",
    "vue-tsc": "^2.2.8"
  }
}

// 格式化依赖数组，方便表格展示
const dependenciesList = Object.entries(projectInfo.dependencies).map(([name, version]) => ({ name, version }))
const devDependenciesList = Object.entries(projectInfo.devDependencies).map(([name, version]) => ({ name, version }))
</script>

<style scoped>
.mt-4 {
  margin-top: 1rem;
}
</style>
