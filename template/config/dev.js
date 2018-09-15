module.exports = {
    port: 9000,
    proxy: {
        '**/*.api': {
            target: 'http://192.168.229.201:8019',
            changeOrigin: true,
            autoRewrite: 302
        }
    },
    autoOpenBrowser: true // npm run build成功后是否自动打开浏览器
};