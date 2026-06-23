import { createMemoryHistory, createRouter } from 'vue-router'

import IndexPage from '@/page/IndexPage.vue'
import SettingPage from '@/page/SettingPage.vue'

const routes = [
  { path: '/', component: IndexPage },
  { path: '/setting', component: SettingPage },
]

export  const router = createRouter({
  history: createMemoryHistory(),
  routes,
})