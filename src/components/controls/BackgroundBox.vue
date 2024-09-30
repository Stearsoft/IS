<template>

    <div ref="backgroundBox" :class="'background-box' + (focus ? ' focus' : '')">
        <div :style="{ opacity: focus ? 1 : 0 }"></div>
    </div>
</template>

<script setup>
import { ElNotification } from 'element-plus';
import { ref, onMounted, nextTick } from 'vue';

defineProps({
    focus: {
        type: Boolean,
        default: false
    }
});

const backgroundBox = ref(null);

const setBackground = (bg) => {
    const t = bg.type;
    if (t === "image") {
        const img = createMediaElement('img', bg.url, 'background-image', { alt: "背景", "aria-hidden": "true" });
        backgroundBox.value.appendChild(img);
    } else if (t === "color") {
        backgroundBox.value.style.backgroundColor = bg.url;
    } else if (t === "time") {
        setInterval(() => {
            backgroundBox.value.style.backgroundColor = "#" + this.$xn.date("HHHHMiMiSSSS");
        }, 1000);
    } else if (t === "video_url") {
        const video = createMediaElement('video', bg.url, null, { autoplay: "autoplay", muted: "muted", loop: "loop" });
        handleVideoPlayback(video);
    } else if (t === "video_file") {
        openIndexedDBForVideo();
    }
};

const createMediaElement = (type, src, className, attributes) => {
    const media = document.createElement(type);
    media.src = src;
    if (className) media.className = className;
    Object.entries(attributes || {}).forEach(([key, value]) => {
        media.setAttribute(key, value);
    });
    return media;
};

const handleVideoPlayback = (video) => {
    video.style.opacity = 0;
    backgroundBox.value.appendChild(video);
    video.oncanplay = () => {
        video.play();
        video.style.opacity = 1;
    };
};

const openIndexedDBForVideo = () => {
    const r = indexedDB.open("VideoDatabase", 1);
    r.onsuccess = (ev) => {
        const db = ev.target.result;
        const transaction = db.transaction("videos", "readonly");
        const store = transaction.objectStore("videos");
        const request = store.getAll();

        request.onsuccess = () => {
            const videos = request.result;
            if (videos.length > 0) {
                const videoBlob = new Blob([videos[0].data], { type: "video/*" });
                const video = createMediaElement('video', URL.createObjectURL(videoBlob), null, { autoplay: "autoplay", muted: "muted", loop: "loop" });
                handleVideoPlayback(video);
            } else {
                showErrorNotification("IndexedDB中没有视频数据");
            }
        };
        request.onerror = () => showErrorNotification("检索视频数据时发生错误");
    };
    r.onerror = () => showErrorNotification("无法打开IndexedDB数据库");
};

const showErrorNotification = (message) => {
    ElNotification({
        title: 'Error',
        message,
        type: 'error',
    });
};

onMounted(async () => {
    const is = localStorage.getItem('is');
    const bg = is ? JSON.parse(is).background : { type: 'image', url: '../../assets/imgs/default.webp' };
    setBackground(bg);

    // 等待 DOM 更新
    await nextTick();

});
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