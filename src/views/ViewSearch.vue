<template>
    <div class="result_container xl-top-0 xl-left-0 xl-size-full xl-absolute">
        <div class="search_header">
            <a href="/"><img src="/src/assets/imgs/xn.webp" alt="logo" class="xl-h-12 xl-mt-1 xl-ml-3"></a>
        </div>
        <div class="results_body">
            <div class="category">
                <div v-for="item in category" :key="item.key" class=" xl-flex" :class="{
                    active: item.key === results_list.category
                }" @click="changeCategory(item)">
                    <RIcon :icon="item.icon" :focus="item.key === results_list.category" />
                    <span>{{ t(item.text) }}</span>
                </div>
            </div>
            <div class="overview" v-if="results_list.data.overview">
                <div class="left">
                    <h3>{{ results_list.data.overview.title ? results_list.data.overview.title : '' }}</h3>
                    <div class="digest">
                        <div class="imgs">
                            <div class="image-group" v-if="firstTwoImages.length === 2">
                                <div class="image" v-for="(item, index) in firstTwoImages" :key="index">
                                    <a :href="item.href" target="_blank" rel="noopener noreferrer">
                                        <img :src="item.image" :alt="item.image_alt">
                                    </a>
                                </div>
                            </div>

                            <div class="image-group">
                                <template v-for="(item, index) in restItems" :key="index">
                                    <div class="img_se">
                                        <a :href="item.href" target="_blank" rel="noopener noreferrer">
                                            <img :src="item.image" :alt="item.image_alt">
                                        </a>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="knowledge" v-show="results_list.data.knowledge">
                    <p>{{ results_list.data.knowledge.description }}</p>
                    <ul class="info">
                        <li v-for="(item, index) in results_list.data.knowledge.facts" :key="index">
                            <h4>{{ item.key }}</h4>
                            <p>
                                <template v-for="(a, ind) in item.value">
                                    <template v-if="a.link">
                                        <a :href="a.link" target="_blank" rel="noopener noreferrer" :key="ind">
                                            <span>{{ a.text }}</span>
                                        </a>
                                    </template>
                                    <template v-else>
                                        <span :key="ind">{{ a.text }}</span>
                                    </template>

                                </template>
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="state" :class="{ 'fade-out': isFadingOut }">
                <ul>
                    <li v-for="(state, index) in states" :key="index" :class="state.type"
                        class="xl-mb-2 xl-flex xl-items-center">
                        <div class="icon" :class="state.type == 'loading' ? 'loading' : ''">
                            <IconLoading v-if="state.type == 'loading'" />
                            <IconSuccess v-else />
                        </div>
                        <span :class="state.type" class="xl-ml-2 xl-text-xs">{{ state.text }}</span>
                    </li>
                </ul>
            </div>
            <div class="results" :class="{
                'indent': results_list.category == 'web',
                'xl-flex': results_list.category == 'image'
            }">
                <div v-show="results_list.category == 'image'"
                    class=" xl-flex xl-flex-col xl-backdrop-blur-md navigations xl-sticky xl-top-3">
                    <div v-for="(item, index) in results_list.data.navigation" :key="index" class=" navigation"
                        @click="addNavigation(item)">
                        <span>{{ item.title }}</span>
                    </div>
                </div>
                <div class="lists">
                    <ul class="web">
                        <template v-if="results_list.category == 'web'">
                            <template v-for="(result, index) in results_list.data.organic" :key="'result-' + index">
                                <RItem :result="result" />
                                <template v-if="index === 1 && results_list.data.videos">
                                    <div class="video xl-my-5">
                                        <div>
                                            <RVideo v-for="(video, videoIndex) in results_list.data.videos"
                                                :key="'video-' + videoIndex" :video="video" />
                                        </div>
                                    </div>
                                </template>


                                <template
                                    v-else-if="index === Math.floor(results_list.data.organic.length / 2) && results_list.data.people_also_ask">
                                    <div>
                                        <div class="questions xl-my-5">
                                            <RQuestion v-for="(question, qIndex) in results_list.data.people_also_ask"
                                                :key="'question-' + qIndex" :question="question" />
                                        </div>
                                    </div>
                                </template>

                            </template>

                            <div class="suggestion" v-show="results_list.data.related">
                                <span v-for="(item, index) in results_list.data.related" :key="'suggestion-' + index"
                                    class="xl-rounded-full" @click="suggestion(item)">
                                    {{ item.text }}
                                </span>
                            </div>
                        </template>
                        <template v-else-if="results_list.category == 'image'">
                            <div></div>
                            <div class="image_box xl-flex xl-flex-wrap">
                                <RImage v-for="(image, index) in results_list.data.images" :key="index" :image="image">
                                </RImage>
                            </div>
                        </template>
                        <template v-else-if="results_list.category == 'video'">
                            <div class="videos_Container">
                                <RVideoB v-for="(video, index) in results_list.data?.data?.result || []" :key="index"
                                    :video="video" />
                            </div>
                        </template>
                    </ul>

                </div>
                <div class="right_bar">
                    <div class="ai_answer"></div>
                </div>
            </div>
            <div class="pages"></div>
        </div>
    </div>
</template>

<script setup>
import { watch, onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconSuccess from '@/components/icons/IconSuccess.vue';
import RItem from '@/components/search/RItem.vue';
import RVideo from '@/components/search/RVideo.vue';
import RQuestion from '@/components/search/RQuestion.vue';
import RIcon from '@/components/search/RIcon.vue';
import RImage from '@/components/search/RImage.vue';
import RVideoB from '@/components/search/RVideo.b.vue';
import axios from 'axios';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const category = [
    {
        'text': 'tif.key.web',
        'key': 'web',
        'icon': 'internet'
    }, {
        'text': 'tif.key.image',
        'key': 'image',
        'icon': 'image',
    }, {
        'text': 'tif.key.video',
        'key': 'video',
        'icon': 'video'
    }
]
const getCategory = () => {
    if (route.query.cg && category.map(item => item.key).includes(route.query.cg)) {
        return route.query.cg;
    } else {
        return 'web';
    }
}
const results_list = ref({
    page: 1,
    state: 'loading',
    category: getCategory(),
    data: []
});
const changeCategory = (item) => {
    if (item.key === results_list.value.category) return;
    results_list.value = {
        page: 1,
        state: 'loading',
        category: item.key,
        data: []
    };
    router.push({
        path: '/search',
        query: {
            q: route.query.q,
            cg: item.key
        }
    });
    result.web(route.query.q);
}
const addNavigation = (item) => {
    results_list.value = {
        page: 1,
        state: 'loading',
        category: 'image',
        data: []
    };
    router.push({
        path: '/search',
        query: {
            q: route.query.q + ' ' + item.title,
            cg: 'image'
        }
    });
    result.web(route.query.q);
}
if (!route.query.q) location.href = '/';
const states = ref([]);
const isFadingOut = ref(false);

const run = () => {
    console.log("执行 run() 函数");
    progress(2000, false);
    result.web(route.query.q);

};
const suggestion = (json) => {
    router.push({
        path: '/search',
        query: {
            q: json.text
        }
    });
    results_list.value = {
        page: 1,
        state: 'loading',
        category: getCategory(),
        data: []
    };
}
onMounted(run);
watch(() => route.query.q, (newQ) => {
    if (newQ) {
        run();
    }
});

const progress_messages = [
    "正在连接服务器",
    "正在获取来自网络的信息",
    "正在整理有关信息",
    "整理成有效渲染数据",
    "即将完成",
];

let progress_intervalId = null;
let progress_index = 0;

const progress = (interval, updateIntervalOnly = false) => {
    if (progress_intervalId) {
        clearInterval(progress_intervalId);
    }

    if (!updateIntervalOnly) {
        progress_index = 0;
        states.value = [];
        isFadingOut.value = false;
    }

    progress_intervalId = setInterval(() => {
        if (progress_index >= progress_messages.length) {
            clearInterval(progress_intervalId);
            return;
        }
        if (states.value.length > 0) {
            states.value[states.value.length - 1].type = "success";
        }
        states.value.push({
            type: "loading",
            text: progress_messages[progress_index],
        });

        console.log("当前 states:", states.value);
        progress_index++;
    }, interval);
};

const result = {
    web: (key) => {
        axios.get(`https://tfseek.top/api/search.php?q=${key}&page=${results_list.value.page}&category=${results_list.value.category}`)
            .then((response) => {
                const data = response.data;
                if (data.organic && data.organic.length >= 1
                    || data.images && data.images.length >= 1
                    || data.data.result && data.data.result.length >= 1
                ) {
                    results_list.value.data = data;
                    results_list.value.state = "success";
                    results_list.value.page++;

                    progress(200, true);

                    const totalProgressTime = progress_messages.length * 200;
                    const fadeOutDelay = 1000;
                    const fadeOutDuration = 2000;

                    setTimeout(() => {
                        isFadingOut.value = true;

                        setTimeout(() => {
                            states.value = [];
                            isFadingOut.value = false;
                        }, fadeOutDuration);
                    }, totalProgressTime + fadeOutDelay);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

const items = computed(() => results_list.value.data.overview.items || [])

const firstTwoImages = computed(() => {
    return items.value.filter(i => i.type === 'img').slice(0, 2)
})

const restItems = computed(() => {
    let imgCount = 0
    return items.value.filter(item => {
        if (item.type === 'img') {
            imgCount++
            return imgCount > 2
        }
        return false
    })
})
</script>

<style scoped lang="less">
.result_container {
    background-color: var(--bg-7);

    @media screen and (max-width: 960px) {
        background-color: rgba(232, 234, 237, 0.888);
    }

    .search_header {
        width: 100%;
        height: 60px;
        box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
        background-color: var(--bg-7);
        backdrop-filter: blur(10px);
        position: absolute;
        top: 0;

        a {
            width: 180px;
            display: block;
        }
    }

    .results_body {
        position: absolute;
        --header-height: 70px;
        top: var(--header-height, 70px);
        width: 100%;
        height: calc(100% - var(--header-height, 70px) - 10px);
        overflow: auto;

        .category {
            margin-left: 200px;
            display: flex;
            margin-bottom: 20px;
            margin-top: 10px;

            &>div {
                padding: 4px 11px;
                margin-right: 5px;
                border-radius: 5px;
                transition: all.3s;
                cursor: pointer;
                display: flex;
                align-items: center;
                opacity: .6;
                font-size: 12px;

                &.active {
                    background-color: var(--theme-color_c);
                    color: var(--theme-color);
                }

                &:hover {
                    background-color: var(--bg-6);
                    opacity: 1;
                }

                span {
                    font-size: 15px;
                }
            }

            @media screen and (max-width: 1220px) {
                margin-left: 10px;
            }
        }

        .overview {
            margin-left: 200px;

            @media screen and (max-width: 1220px) {
                margin-left: 10px;
            }

            .digest {
                margin: 29px 0;
            }

            .imgs {
                display: flex;
                max-width: 600px;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                border-radius: 10px;

                @media screen and (max-width: 960px) {
                    max-width: 100%;
                }

                .image-group {
                    display: flex;
                    width: 100%;

                    .image,
                    .img_se {
                        width: 100%;
                    }


                    img {
                        width: 100%;
                        max-height: 150px;
                        object-fit: cover;
                        height: 100%;
                    }
                }
            }

            h3 {
                font-size: 30px;
            }

            .knowledge {
                margin-left: 20px;
                border-left: 1px solid var(--border-3);
                padding: 0 10px;
                max-width: 500px;
                position: absolute;
                left: 810px;
                top: 140px;

                @media screen and (max-width: 1220px) {
                    left: 610px;
                }

                @media screen and (max-width: 960px) {
                    position: unset;
                    margin-left: 10px;
                    max-width: 100%;
                    border-left: none;
                    border-bottom: 1px solid var(--border-3);
                    margin-bottom: 40px;
                }

                &>p {
                    margin-bottom: 20px;
                    font-size: 18px;
                }

                ul {
                    li {
                        display: flex;
                        margin-bottom: 5px;

                        h4 {
                            width: 100px;
                            min-width: 100px;
                        }

                        a {
                            color: #0084ff;
                        }
                    }
                }
            }
        }

        .state {
            margin-left: 200px;
            transition: opacity 0.5s ease, max-height 0.5s ease;
            overflow: hidden;
            max-height: 150px;
            color: var(--font-1);

            @media screen and (max-width: 1220px) {
                margin-left: 10px;
            }

            &.fade-out {
                opacity: 0;
                max-height: 0px;
            }

            .icon {
                width: 20px;
                height: 20px;

                &.loading {
                    animation: spin 1s linear infinite;
                }
            }
        }

        .results {
            .navigations {
                background: var(--bg-6);
                border-radius: 0 10px 10px 0;
                padding: 10px 0;
                height: fit-content;
                --border-style: 1px solid var(--bg-7);
                border-top: var(--border-style);
                border-bottom: var(--border-style);
                border-right: var(--border-style);

                .navigation {
                    color: var(--theme-color);
                    --w: 120px;
                    padding: 3px;
                    margin-bottom: 10px;
                    margin-right: 10px;
                    margin-left: 30px;
                    width: var(--w);
                    max-width: var(--w);
                    position: relative;



                    &:hover {
                        color: var(--theme-color_b);

                        &::before {
                            background-color: var(--theme-color_b);
                        }
                    }

                    &::before {
                        content: '';
                        --size: 7px;
                        width: var(--size);
                        height: var(--size);
                        border-radius: 50%;
                        background-color: var(--theme-color);
                        position: absolute;
                        left: -15px;
                        top: 50%;
                        transform: translateY(-50%);
                    }

                    span {
                        display: block;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;
                    }
                }
            }



            &.indent {
                margin-left: 200px;


                @media screen and (max-width: 1220px) {
                    margin-left: 10px;
                }

                @media screen and (max-width: 960px) {
                    margin-left: 0;
                }

                .lists>ul.web {
                    max-width: 600px;

                    @media screen and (max-width: 960px) {
                        max-width: 100%;

                        li {
                            padding: 10px;
                            background-color: var(--bg-3);
                            margin-bottom: 10px;
                        }
                    }
                }
            }

            .suggestion {
                display: grid;
                grid-template-columns: 1fr 1fr;

                @media screen and (max-width: 960px) {
                    background-color: var(--bg-3);
                    grid-template-columns: 1fr;
                }

                span {
                    border: 1px solid var(--theme-color);
                    color: var(--theme-color);
                    text-align: center;
                    margin: 3px;
                    padding: 9px;
                    font-size: 14px;
                    backdrop-filter: blur(11px);
                    transition: all .3s;

                    &:hover {
                        color: white;
                        background-color: var(--theme-color);
                    }

                    @media screen and (max-width: 960px) {
                        border-radius: 0;
                        border: none;
                        // border-bottom: 1px solid;
                        text-align: left;
                        color: var(--font-1);
                        margin: none;

                        &:hover {
                            background-color: rgba(0, 0, 0, 0.05);
                            color: var(--font-1);
                        }
                    }
                }
            }

            .video {
                border-radius: 5px;
                margin-bottom: 30px;

                @media screen and (max-width: 960px) {
                    background-color: var(--bg-3);
                }

                h3 {
                    margin: 10px 5px;
                    font-size: 15px;
                    font-weight: 700;
                    color: var(--theme-color);
                }
            }

            .videos_Container {
                justify-items: center;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(235px, 1fr));
                gap: 10px;
                max-width: calc(235px * 7 + 40px);
                grid-template-rows: auto;
                margin-left: 200px;
            }
        }
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}
</style>