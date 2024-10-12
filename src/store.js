import { createStore } from 'vuex';

const store = createStore({
    state: {
        background:{
            type: '',
            value: '',
            base64:'',
        },
        base64data: '', // 用于存储 Base64 数据
        background_type: '',
        background_value:'',
    },
    mutations: {
        background(state, data) {
            state.background = data;
        }
    },
    actions: {
        background({ commit }, data) {
            commit('background',data);
        },
    }
});

export default store;
