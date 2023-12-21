import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import store from "./store/index.js"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app=createApp(App)
app.use(router)
app.use(ElementPlus)
app.use(store)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.mount('#app')
