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
                'indent': results_list.category == 'web'
            }">
                <div class="lists">
                    <ul class="web">
                        <template v-if="results_list.category == 'web'" >
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
                                <RImage v-for="(image, index) in results_list.data.images" :key="index" :image="image"></RImage>
                            </div>
                        </template>
                    </ul>

                </div>
                <div class="right_bar">
                    <div class="ai_answer"></div>
                    <div class="knowledge"></div>
                </div>
            </div>
            <div class="pages"></div>
        </div>
    </div>
</template>

<script setup>
import { watch, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconSuccess from '@/components/icons/IconSuccess.vue';
import RItem from '@/components/search/RItem.vue';
import RVideo from '@/components/search/RVideo.vue';
import RQuestion from '@/components/search/RQuestion.vue';
import RIcon from '@/components/search/RIcon.vue';
import RImage from '@/components/search/RImage.vue';
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
                if (data.organic && data.organic.length >= 1 || data.images && data.images.length >= 1) {
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
</script>

<style scoped lang="less">
.result_container {
    background-color: var(--bg-7);

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
            }
        }

        .state {
            margin-left: 200px;
            transition: opacity 0.5s ease, max-height 0.5s ease;
            overflow: hidden;
            max-height: 150px;
            color: var(--font-1);

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
            &.indent {
                margin-left: 200px;

                .list > ul.web{
                    max-width: 600px;
                }
            }

            .suggestion {
                display: grid;
                grid-template-columns: 1fr 1fr;

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
                }
            }

            .video {
                border-radius: 5px;
                margin-bottom: 30px;

                h3 {
                    margin: 10px 5px;
                    font-size: 15px;
                    font-weight: 700;
                    color: var(--theme-color);
                }
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