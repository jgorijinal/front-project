import { createApp } from 'vue'
import './style.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router/index'
import { useREM } from './utils/flexible';
import mlibs from '@/libs'
useREM()

createApp(App).use(router).use(mlibs).mount('#app')
