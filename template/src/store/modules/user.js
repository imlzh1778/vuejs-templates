import Vue from 'vue';

export default {
    state: {},
    mutations: {
        USER_SIGN_IN (state, user) {
            Object.assign(state, user);
        },
        USER_SIGN_OUT (state) {
            Object.keys(state).forEach(k => Vue.delete(state, k));
        }
    }
};