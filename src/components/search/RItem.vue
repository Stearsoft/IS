<template>
    <li class=" xl-mb-7 r_item">
        <div class="display xl-flex xl-mb-1">
            <div class="favicon xl-mr-2 xl-flex xl-items-center">
                <img :src="result.official ? result.site_icon : 'https://tfseek.top/api/favicon/get.php?url=' + result.link"
                    :alt="capitalizeHostName(result.link)" class=" xl-size-7 xl-rounded-full" :style="{
                        'background-color': result.official ? result.site_icon_backgroundcolor : '',
                    }">
            </div>
            <div class="display_info">
                <h4>{{ result.official ? result.site_name : capitalizeHostName(result.link) }}</h4>
                <p>{{ result.display_link }}</p>
            </div>
        </div>
        <h3>
            <a :href="result.link" target="_blank" class=" xl-text-lg title" rel="noopener noreferrer">
                <span>{{ result.title }}</span>
            </a>
        </h3>
        <span class="link">{{ decodeURI(result.link) }}</span>
        <p class=" xl-opacity-80 xl-max-w-[600px]">{{ result.description }}</p>
        <div v-show="result.extensions">
            <ul class=" xl-ml-5 xl-mt-3 xl-flex xl-flex-wrap">
                <li v-for="(item, index) in result.extensions" :key="index" class=" xl-my-1 extensions" :class="{
                    inline: item.type == 'text',
                }"  v-show="index !== result.extensions.length - 1">
                    <template v-if="item.type == 'site_link'">
                        <h3>
                            <a :href="item.link" target="_blank" class=" xl-text-base" rel="noopener noreferrer">
                                <span>{{ item.text }}</span>
                            </a>
                        </h3>
                        <p class=" xl-text-sm">{{ item.description }}</p>
                    </template>
                    <template v-else-if="item.type == 'text'">
                        <span>{{ item.text }}</span>
                    </template>
                </li>
            </ul>
        </div>
        <div v-show="result.images" class=" xl-grid  xl-mt-3 xl-grid-cols-5">
            <div v-for="(item, index) in result.images" :key="index" class=" xl-relative xl-m-1">
                <img :src="item.image" alt="image" class=" xl-w-full xl-h-full xl-object-cover xl-rounded-lg">
                <span v-show="item.image_alt" class=" xl-absolute img_alt_box xl-rounded-lg">{{ item.image_alt }}</span>
            </div>
        </div>
    </li>
</template>

<script setup>
defineProps({
    result: {
        type: Object,
        required: true
    }
})

const capitalizeHostName = (url) => {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname.replace(/^www\./, '');
        const parts = hostname.split('.');

        if (parts.length > 1) {
            parts[0] = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
        }

        return parts.join('.');
    } catch (error) {
        console.error('Invalid URL:', url);
        return '';
    }
};

</script>

<style scoped lang="less">
.r_item{
    color: var(--font-1);
}
.title {
    color: #007afe;

    &:hover {
        text-decoration: underline;
    }
}

.link {
    color: #0f935e;
}

.extensions {
    position: relative;
    margin-bottom: 15px;
    margin-left: 20px;
    color: var(--font-1);

    &:not(.inline) {
        width: calc(50% - 20px);

        &::before {
            --w: 10px;
            content: '';
            display: block;
            width: var(--w);
            height: var(--w);
            position: absolute;
            background: var(--theme-color);
            border-radius: var(--w);
            top: 5px;
            margin: auto;
            left: -20px;
        }
    }

    &.inline {
        // max-width: 400px;
        padding: 5px;
        border-radius: 5px;
        margin-left: -20px;
        margin-top: -15px;
        // box-shadow: 0 0 1px;
        margin-bottom: 5px;
        opacity: .7;
        margin-right: 5px;
        width: 100%;
    }

    &:hover::before {
        background: var(--theme-color_b);
    }

    h3 a {
        color: var(--theme-color);
        opacity: .8;
    }

    p{
        opacity: .8;
    }
}

.img_alt_box {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    font-size: 14px;
    color: rgb(240, 240, 240);
    width: 100%;
    text-align: center;
    top: 0;
    height: 100%;
    padding: 10px;
    opacity: 0;
    transition: all .3s;

    &:hover {
        opacity: 1;
    }
}
</style>