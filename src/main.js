import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import * as antIcons from '@ant-design/icons-vue';

import './assets/main.less'

const app = createApp(App)

Object.keys(antIcons).forEach(key =>{
    app.component(key, antIcons[key])

})
app.config.globalProperties.$antIcons = antIcons;
app.use(Antd)
app.use(createPinia())
app.use(router)

app.mount('#app')
