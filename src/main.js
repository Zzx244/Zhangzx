import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import Icons from '@element-plus/icons-vue'

createApp(App).use(ElementPlus).use(router).use(Icons).mount('#app')

  