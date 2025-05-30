<template>
    <div ref="backgroundBox" :class="'background-box' + (focus & !engineMode ? ' focus' : '')" :style="{
        'background-color': background_type == 'color' ? background_value : 'transparent',
    }" v-show="!is_data_r.theme.minimal_mode">
        <div :style="{ '--opacity': is_data_r.theme.background.mark_opacity }"></div>
        <img v-if="background_type == 'image'" :src="background_value" alt="background"
            class=" xl-object-cover xl-h-full xl-w-full xl-transition-opacity animate_opacity" @load="bgLoaded()"
            v-show="bgLoaded_mode">
        <video v-else-if="background_type == 'video_url' || background_type == 'video_file'" :src="background_value"
            autoplay muted loop style="opacity: 0;" @canplay="handleVideoPlayback"
            class=" xl-size-full xl-object-cover"></video>
    </div>
</template>

<script setup>
import { watch, computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { is } from '@/utils/is';
import localforage from 'localforage';
import { useRoute } from 'vue-router';

const route = useRoute();
const engineMode = ref(false);
const store = useStore();
const is_data = is().is_current.value;
const is_data_r = ref(is_data);
const current_bg_opacity = ref(0);
const background_type = ref(is_data.theme.background.type);
const background_value = ref(''); // 初始值为空
const background = computed(() => store.state.background);
const background_time_interval = ref(null);
const bgLoaded_mode = ref(false); // 初始为 false

watch(is_data, (newValue) => {
    current_bg_opacity.value = is_data_r.value.theme.background.mark_opacity;
    is_data_r.value = newValue;
    console.log("背景检测到is_data变化");
})

watch(() => route.path, (newPath) => {
    engineMode.value = newPath === "/search";
});
defineProps({
    focus: {
        type: Boolean,
        default: false
    }
});

// 获取背景视频数据
const getVideoFromLocalForage = () => {
    localforage.getItem('xn:bg>background_video')
        .then((videoData) => {
            if (videoData) {
                // 创建 Blob URL
                let videoBlob = videoData.videoFile;
                let videoURL = URL.createObjectURL(videoBlob);

                if (background_value.value !== videoURL) {
                    if (background_value.value.startsWith('blob:')) {
                        URL.revokeObjectURL(background_value.value);
                    }

                    // 更新背景视频的值
                    background_value.value = videoURL;
                    background_type.value = "video_file";
                }
            } else {
                console.error("没有找到内容");
            }
        })
        .catch((err) => {
            console.error("无法获取视频", err);
        });
};

// 背景图片加载完成
const bgLoaded = () => {
    console.log("背景图片已加载完毕");
        bgLoaded_mode.value = true;  // 图片加载完毕后设置为 true，显示背景
}

// 设置时间背景
if (background_type.value == 'time') {
    background_type.value = "color";
    background_time_interval.value = setInterval(() => {
        background_value.value = "#" + getTime("HHHHMiMiSSSS");
    }, 1000);
} else if (background_type.value == 'video_file') {
    getVideoFromLocalForage();
} else if (background_type.value == 'image') {
    if (is_data.theme.background.value === '') {
        localforage.getItem('xn:bg>background_image')
            .then((data) => {
                if (data && data.base64data) {
                    background_value.value = data.base64data;
                } else {
                    console.log("没有找到背景图片数据");
                    background_value.value = ''; // 如果没有找到背景数据，设置为默认值
                }
            })
            .catch((err) => {
                console.error("从 localforage 获取背景图片时发生错误", err);
            });
    } else {
        background_value.value = is_data.theme.background.value; // 否则使用原有值
    }
}

watch(background, (newValue) => {
    if (newValue) {
        console.log("背景发生变化", newValue);
        background_type.value = newValue.type;
        background_value.value = newValue.value == 'is://type:base64' ? newValue.base64 : newValue.value;

        // 清除定时器
        background_time_interval.value && clearInterval(background_time_interval.value);

        if (newValue.type == 'time') {
            background_type.value = "color";
            background_time_interval.value = setInterval(() => {
                background_value.value = "#" + getTime("HHHHMiMiSSSS");
            }, 1000);
        } else if (background_type.value == 'video_file') {
            getVideoFromLocalForage();
        }
    }
});

// 获取当前时间格式化字符串
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

// 处理视频播放
const handleVideoPlayback = (video) => {
    video.target.play();
    video.target.style.opacity = 1;
    video.target.removeEventListener("canplay", handleVideoPlayback);
};

onMounted(() => {
    setTimeout(() => {
    }, 160);
    console.log("object");
})
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
        opacity: var(--opacity, 0);
        background: -webkit-radial-gradient(rgba(0, 0, 0, 0.24) 0, rgba(0, 0, 0, 0.57) 93%), -webkit-radial-gradient(rgba(0, 0, 0, 0.25) 33%, #000000 166%);
        background: radial-gradient(rgba(0, 0, 0, 0.24) 0, rgba(0, 0, 0, 0.57) 93%), radial-gradient(rgba(0, 0, 0, 0.25) 33%, #000000 166%);
        height: 100%;
        transition: all 0.3s ease-in-out;
        z-index: 1;
        position: absolute;
        width: 100%;
    }

    img,
    video {
        animation: fade-in 0.6s ease-in-out;

        @keyframes fade-in {
            0% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
    }
}

.animate_opacity {
    animation: animate_opacity 0.6s ease-in-out;
}

@keyframes animate_opacity {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
