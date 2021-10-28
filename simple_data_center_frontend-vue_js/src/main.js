import { createApp } from 'vue'

import 'bootstrap'
import 'animate.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store/index'
import App from './App.vue'

const app = createApp(App)

app.use(store)

app.mount('#app')