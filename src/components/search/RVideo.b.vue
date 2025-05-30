<template>
    <div class="video">
        <div class="img">
            <img :src="'https://tfseek.top/api/tree.forest/bpic?f=' + video.pic" alt="Cover封面">
            <div class="data">
                <div class="play">
                    <RIcon icon="video" class=" xl-fill-slate-50"></RIcon>
                    <span>{{ playT(video.play) }}</span>
                </div>
                <div class="duration">
                    <span>{{ video.duration }}</span>
                </div>
            </div>
            <div class="mark"></div>
        </div>
        <div class="infoBox">
            <h4 v-html="video.title"></h4>
            <div class="info">
                <span class="author">{{ video.author }}</span>
                <span class="date">{{ stamp2date(video.senddate) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import RIcon from './RIcon.vue';
defineProps({
    video: {
        type: Object,
        required: true
    }
})
const playT = (number) => {
    const T = ['', '万', '亿', '兆'];
    let i = 0;
    while (number >= 10000) {
        number /= 10000;
        i++;
    }
    return number.toFixed(1) + T[i];
}
const stamp2date = (stamp) => {
    const date = new Date(stamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return year + '-' + month + '-' + day;
}
</script>

<style scoped lang="less">
.video {
    --width: 235px;
    width: var(--width);
    margin-bottom: 10px;
    margin-left: 5px;
    margin-right: 5px;

    @media screen and (max-width:960px) {
        background-color: transparent !important;
    }
    @media screen and (max-width:720px) {
        width: calc(50% - 15px);
        --width: 100%;
    }

    .img{
        width: var(--width);
        height: 132px;
        position: relative;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }

        .data{
            display: flex;
            position: absolute;
            width: 100%;
            bottom: 0;
            justify-content: space-between;
            padding: 0 6px;
            z-index: 10;
            color: #FAFAFA;

            .play{
                display: flex;
                align-items: center;
            }
        }
        .mark{
            background-image: linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,.5) 100%);
            height: 30px;
            width: 100%;
            position: absolute;
            bottom: 0;
            border-radius: 5px;
            z-index: 1;
        }
    }
    .infoBox{
        margin-top: 10px;
        width: var(--width);
        h4 {
            font-size: 15px;
            .keyword {
                color: var(--theme-color);
            }
        }
        .info{
            opacity: .6;
            margin-top: 2px;
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }
    }
}
</style>