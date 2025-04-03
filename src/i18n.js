import { createI18n } from 'vue-i18n';
import en from './langs/en.json';
import zh_tw from './langs/zh-tw.json';
import zh from './langs/zh.json';

const messages = {
    en,
    "zh-cn": zh,
    "zh-tw": zh_tw,
};

const storedLanguage = localStorage.getItem('language');
const browserLanguage = (navigator.language || navigator.userLanguage).toLowerCase();
const supportedLanguages = Object.keys(messages);

let language;
if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
    language = storedLanguage;
} else if (supportedLanguages.includes(browserLanguage)) {
    language = browserLanguage;
} else if (supportedLanguages.includes(browserLanguage.split('-')[0])) {
    language = browserLanguage.split('-')[0];
} else {
    language = 'zh-cn'; // 默认语言
}

if (!storedLanguage) {
    localStorage.setItem('language', language);
}

const i18n = createI18n({
    locale: language,
    messages,
});

export default i18n;