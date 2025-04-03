<template>
    <article>
        <a :href="image.link" target="_blank" rel="noopener noreferrer" :title="image.title">
            <div class="imageBox">
                <img :src="image.image" :alt="image.image_alt">
            </div>
            <div class=" site">
                <div class="icon">
                    <img :src="image.source_logo" :alt="image.source">
                    <span>{{ image.source }}</span>
                </div>
                <a :href="image.link" target="_blank" rel="noopener noreferrer">
                    <h4>{{ image.title }}</h4>
                </a>
            </div>
        </a>
    </article>
</template>

<script setup>
defineProps({
    image: {
        type: Object,
        required: true
    }
})
</script>

<style scoped lang="less">
article {
    padding: 4px 13px;
    margin-bottom: 22px;

    .imageBox {
        img {
            height: 145px;
            object-fit: cover;
        }
    }

    .site {
        display: flex;
        flex-direction: column;
        max-width: 100%;
        position: relative;

        .icon {
            display: flex;
            width: 100%;
            margin-bottom: 5px;
            margin-top: 5px;

            img {
                --size: 20px;
                width: var(--size);
                height: var(--size);
                margin-right: 8px;
                margin-left: 5px;
                border-radius: 100%;
            }

            span {
                font-size: 14px;
                color: var(--font-1);
                opacity: .7;
            }
        }



        a {
            max-width: 100%;
            max-width: 100%;
            position: absolute;
            top: 28px;


            h4 {
                font-size: 14px;
                color: var(--font-1);
                opacity: .7;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>