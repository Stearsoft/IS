import { ref,watch } from 'vue';
const local_is = localStorage.getItem("is");
const is_default = local_is ? JSON.parse(local_is) : {
    version: "v3.0.01",
    language: "zh-CN",
    application: "Insightful Search",
    info: "星柠 | New Page",
    theme: {
        dynamic: true,
        lightMode: true,
        minimal_mode: false,
        main_color: ["#4263eb", "#364fc7", "#364fc710"],
        seconder_color: [],
        background: {
            type: "image",
            value: "https://tfseek.top/assets/img/is/background/out-002.webp",
            mark: false,
            mark_opacity: 0.25,
            blur: 10,
        }
    },
    search: {
        placeholder: "Search...",
        engine_name: "Bing",
        auto_clear: false,
        disable_auto_redirect: false,
        auto_focus: true,
        engine_url: "https://google.com/search?q=",
        engine_change_input: false
    },
    a_word: {
        word: "让生活充满色彩，让梦想更加绚丽",
        from: "星柠",
        author: "川上星林"
    },
    time: {
        base: "10:00",
        form: "HHHH:MiMi"
    },
    user: {
        id: -1,
        nick: "旅行者",
        isLogin: false,
    },
    tool: {
        mf_weather_inp: false,
        mf_music_inp: false,
        mf_word_inp: false,
        mf_tp_inp: false,
        mf_auto_close_collection: true
    },
    tif: {
        tif_ai: false,
        tif_newPage: true,
    }
};
const is_current = ref (is_default);
const renderSetting = (config) => {
    document.documentElement.setAttribute("data-theme", config.theme.lightMode ? "light" : "dark");
    document.documentElement.style.setProperty("--theme-color", config.theme.main_color[0]);
    document.documentElement.style.setProperty("--theme-color_b", config.theme.main_color[1]);
    document.documentElement.style.setProperty("--theme-color_c", config.theme.main_color[2]);

}
renderSetting(is_current.value);
watch(
    is_current,
    (newValue) => {
        if (newValue) {
            console.log("来自is.js的检测，检测到有变化");
            localStorage.setItem("is", JSON.stringify(newValue));
            renderSetting(newValue);
        }
    },
    { deep: true } // 深度监视
);
// 生产/开发模式
const development_mode = false;
const development_config = {
    blur_clear: false,
}
export function is() {
    return {
        is_current,
        save (key, value) {
            is_current.value[key] = value;
            localStorage.setItem("is", JSON.stringify(is_current.value));
        }
    }
}
export function run (key) {
    if (development_mode) {
        return development_config[key];
    }
}