import './assets/styles/main.less'
import './assets/styles/app.css'
import './assets/styles/icon.css'
import './assets/styles/theme.css'
import { createApp } from 'vue';
import App from './App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

// 插件引入
import i18n from './i18n'; // 引入 i18n 配置



const app = createApp(App);

// 插件使用
app.use(i18n);
app.use(autoAnimatePlugin);

// 全局组件引入
app.mount('#app');