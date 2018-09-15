/**
 * Created by 汤振兴 on 2017/2/18.
 */

import Vue from 'vue';
import axios from 'axios';
import Router from 'vue-router';
import store from 'src/store';

Vue.use(Router);

let oRouter = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: () => import('views/index')
    }{{#login}}, {
        path: '/login',
        name: 'login',
        meta: {auth: false, template: 'full'},
        beforeEnter (to, from, next) {
            axios.get('/hunter/sessionObj.api').then(data => {
                if (data.status) {
                    store.commit('USER_SIGN_IN', data.result.bean);
                    store.commit('APP', data.result.SESSION_OTHER);
                    next({path: to.query.from});
                } else {
                    store.commit('USER_SIGN_OUT');
                    next();
                }
            }).catch(() => {
                next();
            });
        },
        component: () => import('views/login')
    }{{/login}}, {
        path: '*',
        redirect: { name: 'index' }
    }]
});

{{#login}}
// 和axios拦截器不冲突
oRouter.beforeEach((to, from, next) => {
    let {auth = true} = to.meta,
        isLogin = !!store.state.user.id;
    // 登录状态判断
    if (auth && !isLogin) {
        return next({name: 'login', query: {from: to.fullPath}});
    }
    next();
});
{{/login}}

export default oRouter;