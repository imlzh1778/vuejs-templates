<template>
    <header class="header">
        <div class="container">
            <router-link class="logo" to="/">网易游戏</router-link>
            <ul class="nav">
                <li class="item">
                    <router-link class="item-link text-link" to="/positionList">职位列表</router-link>
                </li>
                <li class="item">
                    <router-link class="item-link text-link" to="/myRecommend">我的推荐</router-link>
                </li>
                <li class="pull-right">
                    <div class="user-info">
                        <span class="user-name">张三</span>
                        <a href="javascript://" @click="signOut" class="user-link">退出</a>
                    </div>
                </li>
            </ul>
        </div>
    </header>
</template>
<script type="text/javascript">
    export default {
        methods: {
            signOut () {
                this.$axios.get('/hunter/logout.api', {
                    'X-no-loading': true
                }).then(res => {
                    if (res.status) {
                        this.$store.commit('USER_SIGN_OUT');
                        this.$router.replace({name: 'login'});
                    } else {
                        this.$message({
                            message: res.desc,
                            type: 'error'
                        });
                    }
                });
            }
        }
    };
</script>