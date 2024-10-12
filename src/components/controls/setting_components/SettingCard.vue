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
                <SettingInputNecessary value="https://"
                    :match="'(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'"
                    :errorMsg="$t('input.msg.error.url')" v-model="ref_state.bg_link" />
            </div>
            <div v-else-if="card === 'staticWallpaper_color'">
                <p class="xl-mb-2">{{ $t('setting.staticWallpaper_text.color') }}</p>
                <div class=" xl-flex xl-flex-wrap xl-items-center">
                    <div v-for="(item, index) in colors" class="xl-rounded-full xl-size-6 xl-mx-1" :key="index" :style="{
                        'background-color': item
                    }" @click="theme.upload.color(item)"></div>
                    <el-color-picker @change="theme.upload.color" v-model="ref_state.bg_color" />
                </div>
            </div>
            <div v-else-if="card === 'staticWallpaper_imgs'" class="xl-flex xl-flex-wrap">
                <div class="bg_container" v-for="(item, index) in theme.in_background" :key="index" :style="{
                    'background-image': `url(${item.thumb})`,
                }" @click="theme.upload.background(item.full)"></div>
            </div>
            <div v-else-if="card === 'staticWallpaper_random'" class="xl-flex xl-flex-wrap">
                <div class="bg_container" v-for="(item, index) in theme.ra_background" :key="index" :style="{
                    'background-image': `url(${item})`,
                }" @click="theme.upload.background(item)"></div>
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
import { ref, watch } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { is } from '@/utils/is';
import { useI18n } from 'vue-i18n';
import ImageCompressor from 'image-compressor.js';
import { useStore } from 'vuex';
import SettingInputNecessary from './SettingInputNecessary.vue';

const { t } = useI18n();
const uploaded_img_url = ref(null);
const uploaded = ref(false);
const is_data = is().is_current.value;
const store = useStore();
const ref_state = ref({ bg_link: '', bg_color: '#4263eb' });
const colors = ["#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4263eb", "#1c7ed6", "#0ca678", "#37b24d", "#74b816", "#f59f00", "#f76707"];
let debounceTimer = null;

watch(() => ref_state.value.bg_link, () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        store.dispatch('background', {
            type: "image",
            value: ref_state.value.bg_link,
            base64: ''
        });
        is_data.theme.background.type = "image";
        is_data.theme.background.value = ref_state.value.bg_link;
    }, 1000);
});
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
    in_background: [
        {
            "full": "/assets/imgs/default.webp",
            "thumb": "/assets/imgs/background/resize/default.webp"
        }, {
            "full": "/assets/imgs/background/1.webp",
            "thumb": "/assets/imgs/background/resize/1.webp"
        }, {
            "full": "/assets/imgs/background/acc.webp",
            "thumb": "/assets/imgs/background/resize/acc.webp"
        },
        {
            "full": "/assets/imgs/background/2.webp",
            "thumb": "/assets/imgs/background/resize/2.webp"
        },
        {
            "full": "/assets/imgs/background/3.webp",
            "thumb": "/assets/imgs/background/resize/3.webp"
        },
        {
            "full": "/assets/imgs/background/4.webp",
            "thumb": "/assets/imgs/background/resize/4.webp"
        },
        {
            "full": "/assets/imgs/background/5.webp",
            "thumb": "/assets/imgs/background/resize/5.webp"
        },
        {
            "full": "/assets/imgs/background/6.webp",
            "thumb": "/assets/imgs/background/resize/6.webp"
        },
        {
            "full": "/assets/imgs/background/7.webp",
            "thumb": "/assets/imgs/background/resize/7.webp"
        },
        {
            "full": "/assets/imgs/background/out-001.webp",
            "thumb": "/assets/imgs/background/resize/out-001.webp"
        },
        {
            "full": "/assets/imgs/background/out-002.webp",
            "thumb": "/assets/imgs/background/resize/out-002.webp"
        },
        {
            "full": "/assets/imgs/background/out-003.webp",
            "thumb": "/assets/imgs/background/resize/out-003.webp"
        },
        {
            "full": "/assets/imgs/background/out-004.webp",
            "thumb": "/assets/imgs/background/resize/out-004.webp"
        },
        {
            "full": "/assets/imgs/background/out-005.webp",
            "thumb": "/assets/imgs/background/resize/out-005.webp"
        },
        {
            "full": "/assets/imgs/background/out-006.webp",
            "thumb": "/assets/imgs/background/resize/out-006.webp"
        },
        {
            "full": "/assets/imgs/background/out-007.webp",
            "thumb": "/assets/imgs/background/resize/out-007.webp"
        },
        {
            "full": "/assets/imgs/background/out-009.webp",
            "thumb": "/assets/imgs/background/resize/out-009.webp"
        },
        {
            "full": "/assets/imgs/background/out-010.webp",
            "thumb": "/assets/imgs/background/resize/out-010.webp"
        }
    ],
    ra_background:[
        'https://tfseek.top/api/bingWallpaper.php',
        'https://www.loliapi.com/acg/'
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
                            store.dispatch('background', {
                                type: "image",
                                value: 'is://type:base64',
                                base64: base64data
                            });
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
        },
        color(val) {
            store.dispatch('background', {
                type: "color",
                value: val,
                base64: ''
            });
        },
        background(val) {
            store.dispatch('background', {
                type: "image",
                value: val,
                base64: ''
            });
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

.bg_container {
    width: calc((100% - 30px) / 3);
    height: 100px;
    margin: 5px;
    border-radius: 5px;
    background-position: center;
    background-attachment: inherit;
    background-color: var(--bg-5);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>