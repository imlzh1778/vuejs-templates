import Vue from 'vue';
import VueI18n from 'vue-i18n';
// system
import en from './en';
import ko from './ko';
import cn from './zh-CN';

// element-ui
import enElement from 'element-ui/lib/locale/lang/en';
import cnElement from 'element-ui/lib/locale/lang/zh-CN';
import koElement from 'element-ui/lib/locale/lang/ko';

Vue.use(VueI18n);

const messages = {
    en: Object.assign(en, enElement),
    cn: Object.assign(cn, cnElement),
    ko: Object.assign(ko, koElement)
};

// Create VueI18n instance with options
export default new VueI18n({
    locale: 'cn',
    messages
});