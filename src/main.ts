import { createApp, h } from 'vue'
import './style.css'
import App from './App.vue'
import { NConfigProvider } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
const app=createApp({
    render: () => h(NConfigProvider,{locale:zhCN,dateLocale:dateZhCN},[h(App)]),
})
app.mount('#app')
