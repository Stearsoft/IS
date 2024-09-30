import { createI18n } from 'vue-i18n';
import en from './langs/en.json';
import zh from './langs/zh.json';

const messages = {
    zh,
    en,
};

const storedLanguage = localStorage.getItem('language');
const browserLanguage = navigator.language || navigator.userLanguage;
const supportedLanguages = Object.keys(messages);
let language;
if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
    language = storedLanguage;
} else if (supportedLanguages.includes(browserLanguage)) {
    language = browserLanguage;
} else {
    language = 'zh';
}

// 创建 i18n 实例
const i18n = createI18n({
    locale: language,
    messages,
});

// 导出 i18n 实例
export default i18n;