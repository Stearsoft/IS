<template>
    <div id="timeContainer" style="opacity: 1;" aria-hidden="true">
        <div id="timeText" :style="{
            padding: current_time == '/logo_xn/' || current_time == '/logo_tif/' ? '0' : '10px',
        }" :class="{
            minimal_mode: is_data.theme.minimal_mode
        }">
            <img src="../../assets/imgs/xn.webp" v-if="current_time == '/logo_xn/'" alt="LOGO">
            <img src="../../assets/imgs/tif.png" v-else-if="current_time == '/logo_tif/'" alt="LOGO">
            <span v-else>{{ current_time }}</span>
        </div>
    </div>
    <div id="searchBox">
        <div id="inputContainer" :class="{
            minimal_mode: is_data.theme.minimal_mode
        }">
            <input type="text" ref="searchInputDom" name="" :placeholder="is_data.search.placeholder" autocomplete="off"
                :aria-label="$t('search.input')" id="search" class="searchInput" @focus="searchFocus" @blur="searchBlur"
                @input="searchInput" @keyup.enter="searchEnter" @keydown="triggerItem" />
            <span class="goSearch"></span>
        </div>
        <ul ref="searchSuggestionContainer" :aria-label="$t('search.suggestion_list')" :style="{
            height: suggestions.length > 0 ? suggestions.length * 33 + 16 + 'px' : 0,
            opacity: suggestions.length > 0 ? 1 : 0,
            padding: suggestions.length > 0 ? '8px 11px' : '0 11px'
        }">
            <li v-for="(suggestion, index) in suggestions" :key="index" @click="visit(suggestion)" :class="{
                'active': index === currentIndex.valueOf()
            }">
                <template v-if="suggestion.type === 'translate'">
                    <IconTranslate />
                    <span>{{ $t('search.suggestion.translate') }}: {{ suggestion.text }}</span>
                </template>
                <template v-else-if="suggestion.type === 'url'">
                    <IconLink />
                    <span>{{ $t('search.suggestion.url') }}: {{ suggestion.text }}</span>
                </template>
                <template v-else-if="suggestion.type === 'collection'">
                    <IconLove />
                    <span>{{ suggestion.text }}</span>
                </template>
                <template v-else-if="suggestion.type === 'default'">
                    <span>{{ suggestion.text }}</span>
                </template>
            </li>
        </ul>
        <div id="collectionBox" class="hide">
            <div class="xl-flex">
                <div class=" xl-grid group_collection xl-flex-grow xl-p-1 xl-w-full xl-h-300px xl-m-auto" ref="el">
                    <div v-for="item in list" :key="item.id" class=" xl-text-center xl-p-4 xl-rounded xl-cursor-move">
                        <div class=" xl-flex xl-flex-col xl-items-center" data-id="1726497211" :title="item.name">
                            <a href="https://tfseek.top" :aria-label="item.name" target="_blank" menu="collection"></a>
                            <div class=" xl-size-[50px] xl-backdrop-blur xl-rounded-full tile_icon xl-flex xl-items-center xl-justify-center" draggable="false">
                                <img :alt="item.name" class="xl-size-[30px]"
                                    src="https://tfseek.top/api/favicon/get.php?url=https://tfseek.top">
                            </div>
                            <div class=" xl-text-gray-50 xl-mt-1" draggable="false">
                                <span>{{ item.id }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { is } from '@/utils/is';
import IconTranslate from '../icons/IconTranslate.vue';
import IconLove from '../icons/IconLove.vue';
import IconLink from '../icons/IconLink.vue';
import { useDraggable } from 'vue-draggable-plus'
const is_data = is().is_current.value;
const suggestions = ref([]);
const emit = defineEmits(['focused', 'blurred', 'enter']);
const searchSuggestionContainer = ref(null);
const searchInputDom = ref(null);
const currentIndex = ref(-1);
const current_time = ref(is_data.time.base);
const searchFocus = () => {
    emit('focused');
};
const searchBlur = () => {
    if (is_data.search.auto_clear) searchInputDom.value.value = '';
    emit('blurred');
    setTimeout(() => {
        suggestions.value = [];
    }, 200);
};
const searchInput = (e) => {
    currentIndex.value = -1;
    const search_text = e.target.value;
    if (search_text.match(/(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/)) {
        suggestions.value = [];
        suggestions.value.push({
            type: 'url',
            text: search_text,
        });
        return;
    }
    const suggestion_api = `https://www.baidu.com/sugrec?p=3&ie=utf-8&prod=pc&wd=${search_text}`;
    const head = document.getElementsByTagName('head')[0];
    const call = `jsonpCallback_${Math.floor(Math.random() * 10000)}`;

    window[call] = function (data) {
        testData(data);
        head.removeChild(script);
        delete window[call];
    };

    const script = document.createElement('script');
    script.src = `${suggestion_api}&callback=${call}`;
    head.appendChild(script);

    function testData(json) {
        if (json.g && json.g.length >= 1) {
            const back = json.g.map(item => item.q);
            currentIndex.value = -1;
            useData(back, search_text);
        } else {
            suggestions.value = [];
        }
    }

    function useData(back, search_text) {
        suggestions.value = [];
        suggestions.value.push({
            type: 'translate',
            text: search_text,
        });
        const localStorage_cl = localStorage.getItem("collection");

        if (localStorage_cl) {
            JSON.parse(localStorage_cl).forEach(it => {
                const regex = new RegExp(search_text.split("").join('.*'), 'i');
                if (it.folder === "true") {
                    const gm = it.items.filter(gi => regex.test(gi.title.toLowerCase()));
                    if (gm.length > 0) {
                        gm.forEach(gi => {
                            suggestions.value.push({
                                type: 'collection',
                                text: gi.title,
                                url: gi.url
                            })
                        })
                    }
                } else if (regex.test(it.title.toLowerCase())) {
                    suggestions.value.push({
                        type: 'collection',
                        text: it.title,
                        url: it.url
                    })
                }
            });
        }
        back.forEach(item => {
            suggestions.value.push({
                type: 'default',
                text: item,
            });
        });
    }
};
const searchEnter = (e) => {
    goSearch(e.target.value);
};
const triggerItem = (e) => {
    if (e.keyCode == 38) {
        e.preventDefault();
        if (currentIndex.value > 0) {
            currentIndex.value--;
        } else {
            currentIndex.value = suggestions.value.length - 1;
        }
    }
    if (e.keyCode == 40) {
        e.preventDefault();
        if (currentIndex.value < suggestions.value.length - 1) {
            currentIndex.value++;
        } else {
            currentIndex.value = 0;
        }
    }

    if (currentIndex.value != -1) searchInputDom.value.value = suggestions.value[currentIndex.value].text;
}
function visit(json) {
    console.log(json);
    currentIndex.value = -1;
    if (json.type == "url") {
        window.open(json.text, "_blank");
    } else if (json.type == "translate") {
        const url = "https://fanyi.baidu.com/#zh/en/" + json.text;
        window.open(url, "_blank");
    } else if (json.type == "collection") {
        if (json.url) {
            window.open(json.url, "_blank");
        } else {
            const url = json.items[0].url;
            window.open(url, "_blank");
        }
    } else if (json.type == "default") {
        goSearch(json.text);
    }
}
function goSearch(text) {
    console.log(text);
    if (currentIndex.value !== -1) {
        visit(suggestions.value[currentIndex.value]);
    } else {
        let target = "_blank";
        if (is_data.search.engine_url == location.href + "search?q=") target = "_self";
        if (!is_data.search.disable_auto_redirect) {
            window.open(is_data.search.engine_url + text, target);
        } else {
            searchInputDom.value.value = text;
        }
    }
}
const getTime = (format) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    return format.replace('YYYY', year)
        .replace('MoMo', month)
        .replace('DDDD', day)
        .replace('HHHH', hour)
        .replace('MiMi', minute)
        .replace('SSSS', second);
}
setInterval(() => {
    const format = is_data.time.form;
    if (format !== "/logo_xn/" || format !== "/logo_tif/" || format !== "") {
        current_time.value = getTime(format);
    }
}, 1000);

onMounted(() => {
    if (is_data.search.auto_focus) searchInputDom.value.focus();
})

const list = ref([
    {
        name: 'Joao',
        id: 1
    },
    {
        name: 'Jean',
        id: 2
    },
    {
        name: 'Johanna',
        id: 3
    },
    {
        name: 'Juan',
        id: 4
    }, {
        name: 'test',
        id: 5
    }, {
        name: 'test',
        id: 6
    }, {
        name: 'test',
        id: 7
    }, {
        name: 'test',
        id: 8
    }, {
        name: 'test',
        id: 9
    }, {
        name: 'test',
        id: 10
    }, {
        name: 'test',
        id: 11
    }, {
        name: 'test',
        id: 12
    }, {
        name: 'test',
        id: 13
    }, {
        name: 'test',
        id: 14
    }, {
        name: 'test',
        id: 15
    }, {
        name: 'test',
        id: 16
    }, {
        name: 'test',
        id: 17
    }, {
        name: 'test',
        id: 18
    }
])
const el = ref()

// eslint-disable-next-line no-unused-vars
const { start } = useDraggable(el, list, {
    animation: 150,
    ghostClass: 'ghost',
    onStart() {
        console.log('start')
    },
    onUpdate() {
        console.log('update')
    }
})
</script>



<style lang="less" scoped>
div#searchBox {
    position: absolute;
    width: calc(100% - 20px);
    max-width: 500px;
    margin: auto;
    top: var(--top-box);
    left: 0;
    right: 0;
    z-index: 1000;

    div#inputContainer {
        height: 100%;
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        height: 40px;
        background: var(--bg-6);
        border-radius: 20px;
        backdrop-filter: blur(10px);
        transition: all 0.2s cubic-bezier(1, 0.4, 0, 0.59);
        box-shadow: 0 2px 10px var(--shadow-1);

        &.minimal_mode {
            box-shadow: none;
            border: 1px solid var(--border-2);
        }

        input {
            background: transparent;
            padding: 0 10px;
            height: 100%;
            width: calc(100% - 50px);
            color: var(--font-1);
            margin-left: 10px;
            transition: all 0.3s ease-in-out;
        }

        span {
            width: 25px;
            height: 25px;
            border-radius: 20px;
            border: 6px solid var(--theme-color, #0084ff);
            position: absolute;
            right: 8px;
        }

    }

    ul {
        width: 500px;
        background: var(--bg-6);
        border-radius: 10px;
        backdrop-filter: blur(10px);
        line-height: 23px;
        padding: 8px 11px;
        transition: all 0.3s;
        overflow: hidden;
        margin-bottom: 10px;

        &>* {

            display: flex;
            color: var(--font-1);
            transition: all 0.3s;
            padding: 5px;
            padding-left: 15px;
            border-radius: 6px;
            align-items: center;

            &:hover,
            &.active {
                padding-left: 40px;
            }

            &:active {
                background: #ffffff3d;
            }

            i {
                margin-right: 10px;

                &::before {
                    font-size: 17px;
                    color: var(--theme-color);
                }
            }

            svg.icon {
                --w: 19px;
                width: var(--w);
                height: var(--w);
                margin-right: 10px;
                fill: var(--theme-color, #0084ff);
            }
        }
    }
}

div#timeContainer {
    position: fixed;
    left: 50%;
    padding: 10px;
    transform: translateX(-50%);
    top: calc(var(--top-box) - 75px);
    transition: all 0.3s;
    z-index: 1000;

    div#timeText {
        font-size: 30px;
        transition: all 0.3s;
        color: #f9fcff;
        padding: 10px;
        text-shadow: 0 0 1px black;

        &.minimal_mode {
            color: var(--font-1);
        }

        img {
            height: 50px;
        }
    }
}

.group_collection {
    grid-template-columns: repeat(auto-fill, minmax(98px, 5fr));
    grid-template-rows: auto;

    &>div {
        &.sortable-chosen {
            background-color: var(--bg-7);
            transition: background-color .3s;
        }

        div.tile_icon {
            background-color: var(--bg-7);
        }
    }
}
</style>