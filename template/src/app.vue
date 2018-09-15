<template>
    <div :class="['page-main',classScoped]">
        <template v-if="template === 'default'">
            <main-header></main-header>
            <div class="main-view">
                <router-view class="container"></router-view>
            </div>
            <main-footer></main-footer>
        </template>
        <template v-else-if="template === 'full'">
            <router-view></router-view>
        </template>
        <div v-loading.fullscreen.lock="$store.state.app.loading"></div>
    </div>
</template>

<script type="text/javascript">
    import Header from 'components/header';
    import Footer from 'components/footer';

    export default {
        data () {
            return {};
        },
        props: ['template'],
        components: {
            mainHeader: Header,
            mainFooter: Footer
        },
        computed: {
            classScoped () {
                let path = (this.$route.path || '').replace(/^\//, '');
                return `scoped-${path.split('/').join('-')}`;
            }
        },
        methods: {}
    };
</script>
<style type="text/scss">
    @import "~style/app/index";
</style>