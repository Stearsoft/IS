<script setup>
const footer = {
    author: "/wm",
    info: "/intro",
    base: "https://tfseek.top"
}
</script>

<template>
    <footer>
        <span>©2019 - {{ new Date().getFullYear() }} </span><a :href="footer.base + footer.author" target="_blank" rel="noopener noreferrer">{{ $t('footer.author') }}</a>|
        <span>{{ $t('footer.sentence') }}</span>|
        <span><a :href="footer.base + footer.info" target="_blank" rel="noopener noreferrer">{{ $t('footer.info') }}</a></span>
        <span>{{ $t('footer.links') }}</span>
    </footer>
</template>

<style scoped lang="less">
footer {
    position: fixed;
    bottom: 10px;
    color: rgba(255, 255, 255, 0.889);
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 10px;
    border-radius: 10px;
    backdrop-filter: blur(10px);
    font-size: 12px;
    white-space: nowrap;

    a {
        color: inherit;
        margin: 5px;
        &:hover {
            color: #0084ff;
        }
    }

    span {
        margin: 5px;
    }
}
</style>