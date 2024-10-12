import './assets/styles/main.less'
import './assets/styles/app.css'
import './assets/styles/theme.css'
import { createApp } from 'vue';
import App from './App.vue';
import './index.css'

// 插件引入
import i18n from './i18n';
import store from './store'; // 导入 store


const app = createApp(App);

// 插件使用
app.use(i18n);
app.use(store);

// 全局组件引入
app.mount('#app');