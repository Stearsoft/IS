<template>
    <div class="card">
        <div class="card_title">
            <span>{{ title }}</span>
        </div>
        <div class="card_container">
            <div v-if="card === 'color_custom'">
                <div class="xl-flex xl-items-center" >
                    <p>{{ $t("setting.colorPage_text.label") }}</p>
                    <el-color-picker class="xl-ml-2" v-model="is_data.theme.main_color[0]" />
                </div>
            </div>
            <div v-else-if="card === 'color_default'">
                color
            </div>
            <div v-else-if="card === 'staticWallpaper_upload'">
                color
            </div>
            <div v-else-if="card === 'staticWallpaper_link'">
                color
            </div>
            <div v-else-if="card === 'staticWallpaper_color'">
                color
            </div>
            <div v-else-if="card === 'staticWallpaper_imgs'">
                color
            </div>
            <div v-else-if="card === 'staticWallpaper_random'">
                color
            </div>
            <div v-else-if="card === 'dynamicWallpaper_link'">
                color
            </div>
            <div v-else-if="card === 'dynamicWallpaper_upload'">
                color
            </div>
            <div v-else-if="card === 'Wallhaven'">
                color
            </div>
        </div>
    </div>

</template>
<script setup>
defineProps(['card', 'title'])
import { is } from '@/utils/is';
const is_data = is().is_current.value;
</script>

<style scoped lang="less">
.card {
    width: 100%;

    .card_title {
        span {
            margin-bottom: 20px;
            padding: 10px;
            display: block;
            color: var(--theme-color_b, #1483eb);

            &::before {
                content: "";
                height: 20px;
                transform: translateY(-2px);
                display: inline-block;
                background: var(--theme-color, #0084ff);
                opacity: 1;
                pointer-events: none;
                border-radius: 15px;
                width: 6px;
                vertical-align: middle;
                margin-right: 15px;
            }
        }
    }

    .card_container {
        width: 100%;
        padding: 0 30px;
    }
}
</style>