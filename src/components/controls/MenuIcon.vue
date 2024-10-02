<template>
    <div class="cornerBtnsContainer">
        <InputIconMenu @change="triggerMenu" menu="user" :open="open_menu.user">
            <template #menu>
                <ul>
                    <li class="text_color" aria-label="账号设置">{{ $t("menu.accountSetting") }}</li>
                    <li class="text_color" aria-label="退出登录">{{ $t("menu.logout") }}</li>
                </ul>
            </template>
            <IconUser />
        </InputIconMenu>
        <InputIconMenu @change="triggerMenu" menu="menu" :open="open_menu.menu">
            <template #menu>
                <ul>
                    <li class="text_color" aria-label="设置" @click="openSetting">{{ $t("menu.setting") }}</li>
                    <li class="text_color" aria-label="反馈">{{ $t("menu.feedback") }}</li>
                    <li class="text_color" aria-label="语言" @click="subMenu('language', $event)" autoHideMenu="false">{{ $t("menu.language")
                        }}</li>
                </ul>
            </template>
            <IconMenu />
        </InputIconMenu>
    </div>
    <ul class="subMenu" :class="subMenu_class_language" :style="{
        top: subMenu_language.top + 'px',
        left: subMenu_language.left + 'px'
    }">
        <li class="text_color" v-for="item in languages" :key="item.value" @click="switchLanguage(item.value)">{{ item.name }}</li>
    </ul>
</template>
<script setup>
import { ref } from 'vue';
import InputIconMenu from './InputIconMenu.vue';
import IconUser from '../icons/IconUser.vue';
import IconMenu from '../icons/IconMenu.vue';
import { useI18n } from 'vue-i18n';
const emit = defineEmits(['open']);
const openSetting = () => {
    emit('open',"setting");
}
const { locale, t } = useI18n();
const subMenu_class_language = ref('hide');
const subMenu_language = ref({
    top: 0,
    left: 0
});
const open_menu = ref({
    user: false,
    menu: false
});
const triggerMenu = (dom) => {
    for (let key in open_menu.value) {
        if (key !== dom) {
            open_menu.value[key] = false;
        } else {
            open_menu.value[key] = !open_menu.value[key];
        }
    }
}
document.addEventListener('click', (e) => {
    if (!e.target.closest('.top_menu.item')) {
        for (let key in open_menu.value) {
            open_menu.value[key] = false;
        }
        subMenu_class_language.value = 'hide';
    }
});
const languages = [
    {
        name: '中文',
        value: 'zh'
    }, {
        name: 'English',
        value: 'en'
    }
]
const subMenu = (mode, e) => {
    if (mode === 'language') {
        subMenu_language.value.top = e.clientY;
        subMenu_language.value.left = e.clientX - 170;
        subMenu_class_language.value = 'show_f';
        setTimeout(() => {
            subMenu_class_language.value = 'show';
        }, 200);
    }
}
const switchLanguage = (language) => {
    // eslint-disable-next-line no-undef
    ElNotification({
        title: t("static.success"),
        message: t("menu.switchLanguageSuccess"),
        type: 'success',
    })
    locale.value = language;
    localStorage.setItem("language", language)
    subMenu_class_language.value = 'hide';
}
</script>
<style scoped lang="less">
.cornerBtnsContainer {
    position: absolute;
    right: 20px;
    display: flex;
    top: 10px;
    z-index: 1000;
}

ul.subMenu {
    position: absolute;
    background: var(--bg-7);
    backdrop-filter: blur(10px);
    color: var(--font-1);
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px;
    padding: 5px 5px 0px;
    width: fit-content;
    transform-origin: top right;
    border-radius: 8px;
    position: absolute;
    transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
    z-index: 10000;

    li {
        min-width: 160px;
        padding: 10px 15px;
        transition: all 0.3s ease 0s;
        border-radius: 5px;
        margin-bottom: 5px;
        font-size: 12px;
        display: block;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
        }
    }
}

.subMenu.hide {
    opacity: 0;
    transform: scale(0.7);
    pointer-events: none;
}

.subMenu.show_f {
    opacity: 1;
    transform: scale(1.05);
}

.subMenu.show {
    opacity: 1;
    transform: scale(1);
}
</style>