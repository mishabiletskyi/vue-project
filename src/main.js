import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initIntercom } from './intercom'

const app = createApp(App)

app.use(router)

initIntercom()

app.mount('#app')
