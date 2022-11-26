import { createApp } from 'vue'
import './style.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router/index'

createApp(App).use(router).mount('#app')
