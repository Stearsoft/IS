<template>
    <div class="result_container xl-top-0 xl-left-0 xl-size-full xl-absolute">
        <div class=" search_header">
            <a href="/"><img src="/src/assets/imgs/xn.webp" alt="logo" class=" xl-h-12 xl-mt-1 xl-ml-3"></a>
        </div>
        <div class="results_body">
            <div class="category"></div>
            <div class="state"></div>
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

<style scoped lang="less">
.result_container{
    background-color: var(--bg-7);

    .search_header{
        width: 100%;
        height: 60px;
        box-shadow: 0 1px 6px 0 rgba(32, 33, 36, 0.28);
        background-color: var(--bg-7);
        backdrop-filter: blur(10px);
        position: absolute;
        top: 0;
    }
}
</style>