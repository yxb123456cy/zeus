import {createApp} from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from "./router";
import pinia from "./stores";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const application = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    application.component(key, component)
}
application.use(router);
application.use(pinia);
application.mount('#app');
