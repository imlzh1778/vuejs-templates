import axios from 'axios';
import router from '../router';
import store from 'src/store';
import qs from 'qs';

//  'PUT', 'POST', and 'PATCH'
axios.defaults.transformRequest = [function (data) {
    return qs.stringify(data);
}];

axios.interceptors.request.use(function (config) {
    // token <Cross-site request forgery>
    config.headers.token = store.state.app.SESSION_TOKEN || '';
    // 忽略此次ajax loading
    if (!config['X-no-loading']) {
        store.dispatch('loading', true);
    }
    return config;
}, function (error) {
    store.dispatch('loading', false);
    return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
    let data = res.data;
    {{#login}}
    // 登录状态判断 <根据不同的系统判断条件自行修改>
    if (data.code === 1 && !data.status && store.state.user.id) {
        store.commit('USER_SIGN_OUT');
        router.push({name: 'login', query: {from: router.history.current.fullPath}});
    }
    {{/login}}
    store.dispatch('loading', false);
    return data;
}, function (error) {
    store.dispatch('loading', false);
    return Promise.reject(error);
});

export default axios