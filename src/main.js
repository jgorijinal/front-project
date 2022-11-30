import { createApp } from 'vue'
import './style.css'
import './styles/index.scss'
import App from './App.vue'
import router from './router/index'
import { useREM } from './utils/flexible';
import mlibs from '@/libs'
import 'virtual:svg-icons-register'
import store from './store/index'
import useTheme from '@/utils/theme'

useREM()
useTheme()
createApp(App).use(router).use(store).use(mlibs).mount('#app')
