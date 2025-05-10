import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', 'pinia'],
      dts: 'src/auto-imports.d.ts',
    }),
    // 自动注册 Element Plus 的组件，无需手动全局注册
    Components({
      resolvers: [ElementPlusResolver()],                   // 自动解析 Element Plus 的组件（如 <el-button />）
      dts: 'src/components.d.ts',                           // 自动生成的组件类型声明文件路径
    }),
  ],
  resolve:{

  }
})
