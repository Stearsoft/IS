<template>
    <div class="result_container xl-top-0 xl-left-0 xl-size-full xl-absolute">
        <div class=" search_header">
            <a href="/"><img src="/src/assets/imgs/xn.webp" alt="logo" class=" xl-h-12 xl-mt-1 xl-ml-3"></a>
        </div>
        <div class="results_body">
            <div class="category"></div>
            <div class="state">
                <ul>
                    <li v-for="(state, index) in states" :key="index" :class="state.type" class=" xl-mb-2 xl-flex xl-items-center">
                        <div class="icon" :class="state.type == 'loading' ? 'loading' : ''">
                            <IconLoading v-if="state.type == 'loading'"/>
                            <IconSuccess v-else/>
                        </div>
                        <span :class="state.type" class=" xl-ml-2 xl-text-xs">{{ state.text }}</span>
                    </li>
                </ul>
            </div>
            <div class="results">
                <div class="lists"></div>
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
import { useRoute } from 'vue-router';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconSuccess from '@/components/icons/IconSuccess.vue';

const route = useRoute()
if (!route.query.q) location.href = '/';
const states = ref([]);
const run = () => {
    console.log("执行 run() 函数");
    progress();
    
};
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
let progress_index = 0; // 当前 messages 进度
const progress = () => {
    if (progress_intervalId) {
        clearInterval(progress_intervalId);
    }

    progress_index = 0; // 重置进度

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
    }, 2000);
}
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

        .state {
            margin-left: 200px;

            .icon {
                width: 20px;
                height: 20px;

                &.loading {
                    animation: spin 1s linear infinite;
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