let timer = null;
const LOADING = 'loading';

export default {
    // 单一状态树
    state: {
        loading: false
    },
    // 必须是同步处理 同步改变状态，调用 store.commit 方法
    mutations: {
        // 前端自己的状态
        [LOADING] (state, boolean) {
            state.loading = boolean;
        },
        // 后端返回的除用户信息的其它状态管理
        APP (state, data) {
            Object.assign(state, data);
        }
    },
    // 提交的是mutation，可以任意异步操作,不是直接变更状态
    actions: {
        // 对于请求时间短于250ms的不做loading显示
        [LOADING] ({commit}, boolean) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                commit(LOADING, !!boolean);
            }, 250);
        }
    }
};