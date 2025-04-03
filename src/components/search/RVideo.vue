<template>
    <div class="xl-flex video_container xl-p-3">
        <div class="imgBox xl-relative xl-mr-2">
            <img :src="video.image" :alt="video.title" class=" xl-rounded-md">
            <span v-show="video.duration" class=" xl-absolute xl-bottom-1 xl-right-1 xl-text-slate-50">{{ video.duration
            }}</span>
        </div>
        <div class="infoBox">
            <a :href="video.link" target="_blank" rel="noopener noreferrer">
                <h3>{{ video.title }}</h3>
            </a>
            <p>{{ video.author }}</p>
            <span class=" xl-opacity-75 xl-text-xs">{{ video.date }}</span>
        </div>
    </div>
</template>


<script setup>
defineProps({
    video: {
        type: Object,
        required: true
    }
})
</script>

<style scoped lang="less">
.video_container {
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: var(--bg-9);
    transition: all .3s;
    backdrop-filter: blur(10px);
    color: var(--font-1);

    .imgBox {
        width: 180px;

        img {
            height: 100px;
            object-fit: cover;
        }

        span {
            text-shadow: 0px 0px 6px #171717, 1px 1px 6px #181818, 1px 1px 6px #242424;
        }
    }

    .infoBox {
        width: calc(100% - 180px);
        margin-left: 10px;

        a {
            color: var(--theme-color);
            font-size: 16px;
        }

        p {
            margin-top: 5px;
            opacity: .8;
        }
    }
}
</style>