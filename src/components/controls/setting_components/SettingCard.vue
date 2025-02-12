<template>
    <div class="card">
        <div class="card_title xl-transition-all" v-if="mode !== 'full'">
            <span class=" xl-whitespace-nowrap">{{ title }}</span>
        </div>
        <div class="card_container" :class="{
            full: mode == 'full',
            noPadding: mode == 'noPadding',
        }">
            <div v-if="card === 'color_custom'">
                <div class="xl-flex xl-items-center">
                    <p class="text_color">{{ $t("setting.colorPage_text.label") }}</p>
                    <el-color-picker class="xl-ml-2" v-model="is_data.theme.main_color[0]" />
                </div>
            </div>
            <div v-else-if="card === 'color_default'">
                <p class=" xl-indent-7 xl-leading-6 xl-mb-2 text_color">{{ $t("setting.colorPage_text.default") }}</p>
                <p class=" xl-indent-7 xl-leading-6 text_color">{{ $t("setting.colorPage_text.default_2") }}</p>
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
                <p class="xl-mb-2 text_color">{{ $t('setting.staticWallpaper_text.color') }}</p>
                <div class=" xl-flex xl-flex-wrap xl-items-center">
                    <div v-for="(item, index) in colors" class="xl-rounded-full xl-size-6 xl-mx-1" :key="index" :style="{
                        'background-color': item
                    }" @click="theme.upload.color(item)"></div>
                    <el-color-picker @change="theme.upload.color" v-model="ref_state.bg_color" />
                </div>
            </div>
            <div v-else-if="card === 'staticWallpaper_imgs'" class="xl-flex xl-flex-wrap">
                <div class="bg_container" v-for="(item, index) in theme.in_background" :key="index" :style="{
                    'background-image': `url(/assets/imgs/background/resize/${item}.webp)`,
                }" @click="theme.upload.background('/assets/imgs/background/'+item+'.webp')"></div>
            </div>
            <div v-else-if="card === 'staticWallpaper_random'" class="xl-flex xl-flex-wrap">
                <div class="bg_container" v-for="(item, index) in theme.ra_background" :key="index" :style="{
                    'background-image': `url(${item})`,
                }" @click="theme.upload.background(item)"></div>
            </div>
            <div v-else-if="card === 'dynamicWallpaper_link'">
                <SettingInputNecessary value="https://"
                    :match="'(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]'"
                    :errorMsg="$t('input.msg.error.url')" v-model="ref_state.bg_link_video" />
            </div>
            <div v-else-if="card === 'dynamicWallpaper_upload'">
                <el-upload drag action="#" :before-upload="theme.upload.video" accept="video/*">
                    <el-icon class="el-icon--upload">
                        <upload-filled />
                    </el-icon>
                    <div class="el-upload__text">
                        {{ $t("action.uploadFile_drop") }} / <em> {{ $t("action.uploadFile_drop_em") }} </em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            {{ $t("setting.msg.video") }}
                        </div>
                    </template>
                </el-upload>
            </div>
            <div v-else-if="card === 'Wallhaven'">
                <input type="text" class="xl-px-2 xl-py-2 xl-w-full xl-rounded xl-mb-1"
                    :placeholder="$t('input.msg.enter.wallhaven')" style="background-color:var(--bg-5)">
                <div class="xl-flex xl-flex-wrap">
                    <div class="xl-group xl-relative xl-overflow-hidden"
                        v-for="(item, index) in ref_state.wallhaven_imgs.data" :key="index" :class="{
                            'skeleton': item.thumbs.small == '',
                            'bg_container': item.thumbs.small != ''
                        }">
                        <div v-if="item.thumbs.small !== ''" @click="theme.wallhaven(item.id, item.file_type)"
                            class=" xl-size-10 xl-top-1/2 xl-left-1/2 xl-transform xl-absolute -xl-translate-x-1/2 -xl-translate-y-1/2 group-hover:xl-opacity-100 xl-opacity-0 xl-z-50 hover:xl-scale-125 active:xl-scale-75 xl-transition-all">
                            <IconTrue />
                        </div>
                        <el-image v-if="item.thumbs.small !== ''"
                            class=" xl-size-full xl-rounded-md group-hover:xl-brightness-50 xl-transition-all group-hover:xl-scale-110"
                            :src="item.thumbs.small" fit="cover" />
                    </div>
                </div>
                <div class=" xl-flex xl-mt-3 xl-justify-center">
                    <el-pagination layout="prev, pager, next" :total="ref_state.wallhaven_imgs.meta.last_page"
                        @current-change="wallhaven_imgs_change" />
                </div>
            </div>
            <div v-else-if="card === 'search_engine'">
                <div v-for="(item, index) in engine" :key="index" @click="engine_toggle.change(item)"
                    class=" xl-flex xl-h-9 xl-px-2.5 xl-rounded xl-transition-all xl-items-center search_engine_item">
                    <img class=" xl-size-5" :src="item.icon" :alt="item.name">
                    <span class=" xl-mx-8 xl-opacity-60 xl-w-24 xl-whitespace-nowrap">{{ item.title }}</span>
                    <span class=" xl-opacity-50 xl-ml-5 xl-whitespace-nowrap">{{ item.url }}</span>
                </div>
                <div class=" xl-flex xl-h-9 xl-px-2.5 xl-rounded xl-transition-all xl-items-center search_engine_item">
                    <img class=" xl-size-5" src="/assets/imgs/engine_ico/search.png" alt="custom">
                    <span class=" xl-mx-8 xl-opacity-60 xl-w-24 xl-whitespace-nowrap">{{ $t('setting.customSE') }}</span>
                    <input class=" xl-opacity-50 xl-ml-5 xl-bg-transparent" @blur="engine_toggle.change({
                        title: $t('setting.customSE'),
                        url: search_custom_engine.valueOf(),
                        name: 'custom'
                    })" v-model="search_custom_engine">
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>
const props = defineProps(['card', 'title', 'mode'])
import NProgress from 'nprogress'
import { ref, watch } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { is } from '@/utils/is';
import { useI18n } from 'vue-i18n';
import ImageCompressor from 'image-compressor.js';
import { useStore } from 'vuex';
import SettingInputNecessary from './SettingInputNecessary.vue';
import IconTrue from '@/components/icons/IconTrue.vue';

const { t } = useI18n();
const uploaded_img_url = ref(null);
const uploaded = ref(false);
const is_data = is().is_current.value;
const search_custom_engine = ref(is_data.search.engine_name == 'custom' ? is_data.search.engine_url : 'https://');
const store = useStore();
const ref_state = ref({
    bg_link: '',
    bg_color: '#4263eb',
    bg_link_video: '',
    wallhaven_page: 1,
    wallhaven_imgs: { meta: { last_page: 1000 } },
    wallhaven_imgs_list: [],
});
const engine = [
    {
        title: t('search.engine_list.tif'),
        url: 'https://tfseek.top/search?q=',
        icon: '/assets/imgs/engine_ico/tif.png',
        name: 'tif'
    }, {
        title: t('search.engine_list.google'),
        url: 'https://www.google.com/search?q=',
        icon: '/assets/imgs/engine_ico/google.png',
        name: 'google'
    }, {
        title: t('search.engine_list.bing'),
        url: 'https://www.bing.com/search?q=',
        icon: '/assets/imgs/engine_ico/bing.png',
        name: 'bing'
    }, {
        title: t('search.engine_list.baidu'),
        url: 'https://www.baidu.com/s?wd=',
        icon: '/assets/imgs/engine_ico/baidu.png',
        name: 'baidu'
    }, {
        title: '360',
        url: 'https://www.so.com/s?q=',
        icon: '/assets/imgs/engine_ico/360.png',
        name: '360'
    }, {
        title: t('search.engine_list.sogou'),
        url: 'https://www.sogou.com/web?query=',
        icon: '/assets/imgs/engine_ico/sogou.png',
        name: 'sogou'
    }, {
        title: 'DuckDuckGo',
        url: 'https://duckduckgo.com/?q=',
        icon: '/assets/imgs/engine_ico/duckduckgo.png',
        name: 'DuckDuckGo'
    }, {
        title: 'Yandex',
        url: 'https://yandex.com/search/?text=',
        icon: '/assets/imgs/engine_ico/yandex.png',
        name: 'Yandex'
    }, {
        title: 'GitHub',
        url: 'https://github.com/search?q=',
        icon: '/assets/imgs/engine_ico/github.png',
        name: 'github'
    }
]
const colors = ["#fa5252", "#e64980", "#be4bdb", "#7950f2", "#4263eb", "#1c7ed6", "#0ca678", "#37b24d", "#74b816", "#f59f00", "#f76707"];
let debounceTimer;
NProgress.configure({ trickleSpeed: 50 });

const updateBackground = (type, value) => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        store.dispatch('background', {
            type,
            value,
            base64: ''
        });
        is_data.theme.background.type = type;
        is_data.theme.background.value = value;
    }, 1000);
};

watch(() => ref_state.value.bg_link_video, (newValue) => {
    updateBackground("video_url", newValue);
});

watch(() => ref_state.value.bg_link, (newValue) => {
    updateBackground("image", newValue);
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
        "default","la60d5xp","1ea3qu53","cd4vpsk9","tg7fqy8w","9xujr4oc","4d8mzovo","d9tc5737","jk92agji","mc15tfz5","o6qz8zzr","o1gpeoqb","due321vq","9hc56mo0","ciuxyhc4","fbsdpiay","v9dt8l9d","apkhh598","gjvvqstw","mmsuugp6","qht6byw8","jepy8405","pn8svzxo","w4cs2tbb","pyh8n3o8",
    ],
    ra_background: [
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
            is_data.theme.background.type = "color";
            is_data.theme.background.value = val;
        },
        background(val) {
            store.dispatch('background', {
                type: "image",
                value: val,
                base64: ''
            });
            is_data.theme.background.type = "image";
            is_data.theme.background.value = val;
        },
        video(val) {
            if (val.type.indexOf("video") === -1) {
                // eslint-disable-next-line no-undef
                ElNotification({
                    title: t("static.warning"),
                    message: t("setting.msg.onlyVideo"),
                    type: 'warning',
                });
                return false;
            }

            let request = indexedDB.open("VideoDatabase", 1);

            request.onupgradeneeded = function (event) {
                let db = event.target.result;
                if (!db.objectStoreNames.contains("videos")) {
                    // 创建对象存储来保存视频
                    db.createObjectStore("videos", { keyPath: "id" });
                }
            };

            request.onsuccess = function (event) {
                let db = event.target.result;

                // 开启事务
                let transaction = db.transaction(["videos"], "readwrite");
                let localStore = transaction.objectStore("videos");

                // 检查是否有已有视频记录，使用与保存时一致的 id
                let getRequest = localStore.get('xn:bg>background_video'); // 使用相同 id 来读取

                getRequest.onsuccess = function (event) {
                    let videoData = {
                        id: 'xn:bg>background_video',  // 固定 ID
                        videoFile: val,  // 文件对象
                        timestamp: new Date().getTime()
                    };

                    // 如果有视频，更新它，否则添加新的记录
                    if (event.target.result) {
                        localStore.put(videoData); // 覆盖已有记录
                    } else {
                        localStore.add(videoData); // 添加新记录
                    }

                    // 确保事务完成后再进行下一步操作
                    transaction.oncomplete = function () {
                        // eslint-disable-next-line no-undef
                        ElNotification({
                            title: t("static.success"),
                            message: t("setting.msg.videoSaved"),
                            type: 'success',
                        });

                        // 使用新的视频数据更新背景
                        store.dispatch('background', {
                            type: "video_file",
                            value: 'is://type:video_file',
                            base64: ''
                        });

                        is_data.theme.background.value = "";
                        is_data.theme.background.type = "video_file";

                        db.close(); // 关闭数据库连接
                    };
                };

                getRequest.onerror = function (event) {
                    console.error("Error fetching video from IndexedDB", event);
                };

                transaction.onerror = function (event) {
                    console.error("Transaction error:", event);
                };
            };

            request.onerror = function (event) {
                console.error("Error opening IndexedDB", event);
            };
            return false;
        }



    },

    wallhaven(id, type) {
        const url = 'https://tfseek.top/api/wallhaven_img.php?size=full&id=' + id + '&type=' + type;
        NProgress.start();

        // eslint-disable-next-line no-undef
        ElNotification({
            title: t("static.info"),
            message: t("background.loading"),
            type: 'info',
        });
        const imageUrl = url;

        const img = new Image();
        img.crossOrigin = 'anonymous';

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);

            canvas.toBlob((blob) => {
                if (blob) {
                    // 进行压缩
                    new ImageCompressor(blob, {
                        quality: 0.5,
                        success(result) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                const compressedBase64 = reader.result;
                                store.dispatch('background', {
                                    type: "image",
                                    value: 'is://type:base64',
                                    base64: compressedBase64
                                });
                                is_data.theme.background.type = "image";
                                is_data.theme.background.value = "";
                                localStorage.setItem("is_bg", compressedBase64);
                                NProgress.done();
                            };
                            reader.readAsDataURL(result);
                        },
                        error(err) {
                            console.error('压缩失败:', err);
                        },
                    });
                } else {
                    console.error('Canvas to Blob failed');
                }
            }, 'image/jpeg', 0.8);



        };
        img.src = imageUrl;

        return false;
    },
    load() {

        // https://tfseek.top/api/wallhaven.php?page=
        const url = `https://tfseek.top/api/wallhaven.php?page=${ref_state.value.wallhaven_page}`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                ref_state.value.wallhaven_imgs_list = [];
                ref_state.value.wallhaven_page += 1;
                ref_state.value.wallhaven_imgs = data;
            })
            .catch(error => console.error(error));
    }
}
const engine_toggle = {
    change: function (json) {
        is_data.search.engine_url = json.url;
        is_data.search.engine_name = json.name;
        // eslint-disable-next-line no-undef
        ElNotification({
            title: t("static.success"),
            message: t("search.engine_saved", {name:json.title}),
            type: 'success',
        });
    }
}
const wallhaven_basic = () => {
    const data = {
        data: [],
        meta: {
            last_page: 1000
        }
    }
    for (let i = 0; i < 24; i++) {
        data.data.push({
            id: 0,
            thumbs: {
                small: "",
                large: "",
                original: ""
            }
        })
    }
    ref_state.value.wallhaven_imgs = data;
}
if (props.card === "Wallhaven") {
    wallhaven_basic();
    theme.load();
}
const wallhaven_imgs_change = (val) => {
    wallhaven_basic();
    ref_state.value.wallhaven_page = val;
    theme.load();
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

    .card_container:not(.full) {
        width: 100%;
        padding: 0 30px;
    }

    .card_container.noPadding {
        padding: 0;
    }

    .card_container.full {
        width: 100%;
        padding: 0;
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

.bg_container,
.skeleton {
    width: calc((100% - 30px) / 3);
    height: 100px;
    margin: 5px;
    border-radius: 5px;
}

.bg_container {
    background: var(--bg);
    background-position: center;
    background-attachment: inherit;
    background-color: var(--bg-5);
    background-repeat: no-repeat;
    background-size: cover;

}

.skeleton {
    background: linear-gradient(100deg,
            rgba(255, 255, 255, 0) 20%,
            rgba(255, 255, 255, 0.5) 50%,
            rgba(255, 255, 255, 0) 80%) var(--ske-back-color);
    background-size: 200% 100%;
    background-position: 100% 50%;
    background-position-x: 180%;
    animation: 1s _ske_loading infinite;
    --ske-back-color: var(--bg-5);
}

@keyframes _ske_loading {
    to {
        background-position-x: -20%;
    }
}

.search_engine_item {
    color: var(--font-1);
}

.search_engine_item:hover {
    background-color: var(--theme-color_c);
}
</style>