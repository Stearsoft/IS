<template>
    <div class="card">
        <div class="card_title xl-transition-all">
            <span>{{ title }}</span>
        </div>
        <div class="card_container">
            <div v-if="card === 'color_custom'">
                <div class="xl-flex xl-items-center">
                    <p>{{ $t("setting.colorPage_text.label") }}</p>
                    <el-color-picker class="xl-ml-2" v-model="is_data.theme.main_color[0]" />
                </div>
            </div>
            <div v-else-if="card === 'color_default'">
                <p class=" xl-indent-7 xl-leading-6 xl-mb-2">{{ $t("setting.colorPage_text.default") }}</p>
                <p class=" xl-indent-7 xl-leading-6">{{ $t("setting.colorPage_text.default_2") }}</p>
                <div class="xl-flex xl-my-8 xl-flex-wrap">
                    <div class="color_box xl-rounded-md" v-for="(color, index) in theme.colors" :key="index"
                        :style="{ '--c': color[2] }" @click="is_data.theme.main_color = color">
                        <span class=" xl-my-2 xl-rounded-full xl-border-4 xl-border-white xl-h-9 xl-w-9 xl-block"
                            :style="{ 'background-color': color[0] }"></span>
                        <span class=" xl-mb-2 xl-rounded-full xl-border-4 xl-border-white xl-h-9 xl-w-9 xl-block"
                            :style="{ 'background-color': color[1] }"></span>
                        <span class=" xl-mb-2 xl-rounded-full xl-border-4 xl-border-white xl-h-9 xl-w-9 xl-block"
                            :style="{ 'background-color': color[2] }"></span>
                    </div>
                </div>
            </div>
            <div v-else-if="card === 'staticWallpaper_upload'">
                <el-upload drag action="#" :before-upload="theme.upload.img" accept="image/*">
                    <el-icon class="el-icon--upload">
                        <upload-filled />
                    </el-icon>
                    <div class="el-upload__text">
                        {{ $t("action.uploadFile_drop") }} / <em> {{ $t("action.uploadFile_drop_em") }} </em>
                    </div>
                    <hr v-if="uploaded" class=" xl-mt-2 xl-mb-5">
                    <img :src="uploaded_img_url" alt="预览" v-if="uploaded" class=" xl-rounded-lg">
                    <template #tip>
                        <div class="el-upload__tip">
                            {{ $t("setting.msg.imgSize") }} 1.5Mb
                        </div>
                    </template>
                </el-upload>
            </div>
            <div v-else-if="card === 'staticWallpaper_link'">
                <input type="text" @blur="ref_state.bg_link_input_blur = true" v-model="ref_state.bg_link"
                    @input="ref_state.bg_link_input_blur = false;" style="background-color: var(--bg-5);"
                    value="https://" class=" xl-px-2 xl-py-2 xl-w-full xl-rounded xl-mb-1">
                <p v-if="ref_state.bg_link_input_blur && ref_state.bg_link_input_is_error" class=" xl-text-red-600 xl-mb-5 xl-text-sm">{{ $t('input.msg.error.url')
                    }}</p>
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
import { ref } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { is } from '@/utils/is';
import { useI18n } from 'vue-i18n';
import ImageCompressor from 'image-compressor.js';
import { useStore } from 'vuex';

const { t } = useI18n();
const uploaded_img_url = ref(null);
const uploaded = ref(false);
const is_data = is().is_current.value;
const store = useStore();
const ref_state = ref({
    bg_link_input_is_error: true,
    bg_link_input_blur: false,
    bg_link: ''
})
// 正则判断url
if (ref_state.value.bg_link.match(/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/)) {
    ref_state.value.bg_link_input_is_error = false
}
const theme = {
    colors: [
        [
            "#fa5252",
            "#c92a2a",
            "#c92a2a10"
        ],
        [
            "#e64980",
            "#a61e4d",
            "#a61e4d10"
        ],
        [
            "#be4bdb",
            "#862e9c",
            "#862e9c10"
        ],
        [
            "#7950f2",
            "#5f3dc4",
            "#5f3dc410"
        ],
        [
            "#4263eb",
            "#364fc7",
            "#364fc710"
        ],
        [
            "#1c7ed6",
            "#1864ab",
            "#1864ab10"
        ],
        [
            "#0ca678",
            "#0b7285",
            "#0b728510"
        ],
        [
            "#37b24d",
            "#087f5b",
            "#087f5b10"
        ],
        [
            "#74b816",
            "#5c940d",
            "#5c940d10"
        ],
        [
            "#f59f00",
            "#e67700",
            "#d9480f10"
        ],
        [
            "#f76707",
            "#d9480f",
            "#d9480f10"
        ]
    ],
    upload: {
        async img(val) {
            if (val.type.indexOf("image") === -1) {
                // eslint-disable-next-line no-undef
                ElNotification({
                    title: t("static.warning"),
                    message: t("setting.msg.onlyImg"),
                    type: 'warning',
                });
                return false;
            }

            try {
                new ImageCompressor(val, {
                    maxSize: 1 * 1024 * 1024,
                    quality: 0.8,
                    success(result) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            const base64data = reader.result;
                            console.log(result.size / 1024 / 1024);
                            if (result.size > 2 * 1024 * 1024) {
                                // eslint-disable-next-line no-undef
                                ElNotification({
                                    title: t("static.warning"),
                                    message: t("setting.msg.imgTooLarge", {
                                        size: (result.size / 1024 / 1024).toFixed(2),
                                        limit: "1.5MB"
                                    }),
                                    type: 'warning',
                                });
                                return false;
                            }

                            uploaded.value = true;
                            uploaded_img_url.value = base64data;
                            store.dispatch('updateBase64Data', base64data);
                            is_data.theme.background.type = "image";
                            is_data.theme.background.value = "";
                            localStorage.setItem("is_bg", base64data);
                        };
                        reader.readAsDataURL(result);
                    },
                    error(e) {
                        // eslint-disable-next-line no-undef
                        ElNotification({
                            title: t("static.error"),
                            message: e.message,
                            type: 'warning',
                        });
                    },
                });
                return false;
            } catch (error) {
                // eslint-disable-next-line no-undef
                ElNotification({
                    title: t("static.error"),
                    message: error,
                    type: 'warning',
                });
                return false;
            }
        }
    }
}
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

.color_box {
    transition: all .3s;
    --w: 3px;
    margin-right: var(--w);
    margin-left: var(--w);

    &:hover {
        background-color: var(--c, #0084ff1a);
    }
}
</style>