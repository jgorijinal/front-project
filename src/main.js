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
import {VueMasonryPlugin} from 'vue-masonry';
import mDirectives from '@/directives'
import './permission'
useREM()
useTheme()
createApp(App).use(mDirectives).use(router).use(store).use(VueMasonryPlugin).use(mlibs).mount('#app')
