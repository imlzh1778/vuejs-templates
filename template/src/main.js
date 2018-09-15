import Vue from 'vue';
import Element from 'element-ui';

// === css 入口 ===
import 'style';
import 'style/element-ui/default';

// == 业务入口 ===
import App from 'src/app';
import router from 'src/router';
import store from 'src/store';

// === axios拦截器及设置 ===
import axios from 'modules/axios'

{{#if i18n}}
// === 国际化入口 ===
import i18n from './i18n';

Vue.use(Element, {
    i18n: key => i18n.t(key)
});
{{else}}
Vue.use(Element);
{{/if}}

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.prototype.$axios = axios

new Vue({
    el: '#main',
    store,
    {{#i18n}}
    i18n,
    {{/i18n}}
    router,
    computed: {
        template: function () {
            let {meta, name} = this.$route;

            return name === null ? name : meta.template === 'full' ? meta.template : 'default';
        }
    },
    template: '<App :template="template"></App>',
    components: {
        App
    }
});