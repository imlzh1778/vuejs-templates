<template>
    <div class="empty" v-if="!emptyData">
        <img src="~images/empty.png" alt="">
        <p class="tips">亲！该页面暂时没有内容</p>
    </div>
</template>
<style type="text/scss" scoped>
    .empty {
        text-align: center;
        padding: 120px 0;
        .tips {
            margin-top: 15px;
            font-size: 20px;
            color: #818a94;
        }
    }
</style>
<script type="text/javascript">
    export default {
        props: ['data'],
        computed: {
            emptyData () {
                let data = this.data;
                if (typeof data === 'object' && !Object.keys(data).length) {
                    return false;
                }
                return Boolean(data);
            }
        }
    };
</script>