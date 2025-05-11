import {createApp} from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "./router";
import pinia from "./stores";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const application = createApp(App);
application.use(pinia);
//参数分别是错误对象、触发该错误的组件实例和一个指出错误来源类型信息的字符串。
application.config.errorHandler = (err, instance: ComponentPublicInstance | null, info: string) => {
    // 处理错误，例如：报告给一个服务
    console.log("Zeus获取Vue全局错误:")
    console.log("err:", err);
    console.log("instance:", instance);
    console.log("info:", info);
    //将错误数据上报;
}
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    application.component(key, component)
}

application.use(router);

application.mount('#app');
