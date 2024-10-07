import { createStore } from 'vuex';

const store = createStore({
    state: {
        base64data: '', // 用于存储 Base64 数据
        background_type: ''
    },
    mutations: {
        setBase64Data(state, data) {
            state.base64data = data; // 修改 Base64 数据
        },
        setBgType(state, data) {
            state.background_type = data;
        }
    },
    actions: {
        updateBase64Data({ commit }, data) {
            commit('setBase64Data', data); // 提交更改
        },
        updateBgType({ commit }, data) {
            commit('setBgType', data);
        }
    }
});

export default store;
