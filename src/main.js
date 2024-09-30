import './assets/styles/main.less'
import './assets/styles/app.css'
import './assets/styles/theme.css'
import './assets/scripts/index.js'
import { createApp } from 'vue';
import App from './App.vue';


// 插件引入
import i18n from './i18n'; // 引入 i18n 配置
import xn from './assets/scripts/star';


// xn全局变量
window.xn = xn;

const app = createApp(App);

// 插件使用
app.use(i18n);

// 全局组件引入
app.mount('#app');