<template>
    <div class="top_menu item" @click="openMenu">
        <div class="menu" :class="{
                minimal_mode: is_data.theme.minimal_mode,
                [current_class]:true
            }" :style="{
                top: engineMode ? '70px' : '60px'
            }">
            <slot name="menu"></slot>
        </div>
        <slot name="icon"></slot>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { is } from '@/utils/is';
const is_data = is().is_current.value;
import { useRoute } from 'vue-router';

const current_class = ref('hide');
const emit = defineEmits(['change']);
const props = defineProps({
    menu: {
        type: String,
        default: ''
    },
    open: {
        type: Boolean,
        default: false
    }
})
const openMenu = (e) => {
    if (e.target.getAttribute('autoHideMenu') !== 'false')emit('change', props.menu);
}
watch(
    () => props.open,
    (newValue) => {
        if (newValue) {
            current_class.value = "show_f";
            setTimeout(() => {
                current_class.value = "show";
            }, 200);
        } else {
            current_class.value = "hide";
        }
    }
);
const route = useRoute();
const engineMode = ref(false);

watch(() => route.path, (newPath) => {
    engineMode.value = newPath === "/search";
});
</script>

<style scoped lang="less">
.item {
    position: relative;
}

.item>*:not(.menu) {
    --w: 28px;
    width: var(--w);
    height: var(--w);
    margin: 16px 11px 0 16px;
    font-size: 1.9375rem;
    color: var(--theme-color);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.4s ease 0s;
    fill: var(--theme-color, #ffffffc2);

    &:hover {
        fill: var(--theme-color_b, #fff);
    }
}

.menu {
    position: absolute;
    top: 60px;
    right: 8px;
    background-color: var(--bg-7);
    border-radius: 8px;
    padding: 5px 5px 0px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 10px;
    transition: all 0.2s ease 0s;
    backdrop-filter: blur(10px);
    z-index: 999;
    transform-origin: top right;

    &>*>* {
        min-width: 160px;
        padding: 10px 15px;
        font-size: 12px;
        border-radius: 5px;
        margin-bottom: 5px;
        transition: all .3s;

        &:hover {
            background: rgba(0, 0, 0, 0.05);
        }
    }

    &.minimal_mode{
        box-shadow: none;
        border: 1px solid var(--border-2);
    }
}

.menu.hide {
    opacity: 0;
    transform: scale(0.7);
    pointer-events: none;
}

.menu.show_f {
    opacity: 1;
    transform: scale(1.05);
}

.menu.show {
    opacity: 1;
    transform: scale(1);
}
</style>