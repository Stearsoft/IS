<template>

    <div ref="backgroundBox" :class="'background-box' + (focus ? ' focus' : '')" :style="{
        'background-color': background_type == 'color' ? background_value : 'transparent',
    }">
        <div :style="{ opacity: focus ? 1 : 0 }"></div>
        <img v-if="background_type == 'image'" :src="background_value" alt="background"
            class=" xl-object-cover xl-h-full xl-w-full">
        <video v-if="background_type == 'video_url'" :src="background_value" autoplay muted loop
            @canplay="handleVideoPlayback" style="opacity: 0;"></video>
    </div>
</template>

<script setup>
import { watch, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { is } from '@/utils/is';
const store = useStore();
const is_data = is().is_current.value;
const background_type = ref(is_data.theme.background.type);
const background_value = ref(is_data.theme.background.value);
const background = computed(() => store.state.background);
const background_time_interval = ref(null);
defineProps({
    focus: {
        type: Boolean,
        default: false
    }
});
if (background_type.value == 'time') {
    background_type.value = "color";
    background_time_interval.value = setInterval(() => {
        background_value.value = "#" + getTime("HHHHMiMiSSSS");
    }, 1000);
}
watch(background, (newValue) => {
    if (newValue) {
        background_type.value = newValue.type;
        background_value.value = newValue.value == 'is://type:base64' ? newValue.base64 : newValue.value;
        background_time_interval.value && clearInterval(background_time_interval.value);
        if (newValue.type == 'time') {
            background_type.value = "color";
            background_time_interval.value = setInterval(() => {
                background_value.value = "#" + getTime("HHHHMiMiSSSS");
            }, 1000);
        }
    }
});
const getTime = (format) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    return format.replace('YYYY', year)
        .replace('MoMo', month)
        .replace('DDDD', day)
        .replace('HHHH', hour)
        .replace('MiMi', minute)
        .replace('SSSS', second);
}
</script>




<style scoped lang="less">
.background-box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transition: all 0.3s ease-in-out;
    z-index: -100000;

    &.focus {
        transform: scale(1.1);
        filter: blur(var(--blur, 10px));
    }

    div {
        opacity: 0;
        background: radial-gradient(rgba(0, 0, 0, 0.24) 0px, rgba(0, 0, 0, 0.57) 93%),
            radial-gradient(rgba(0, 0, 0, 0.25) 33%, rgb(0, 0, 0) 166%);
    }
}
</style>