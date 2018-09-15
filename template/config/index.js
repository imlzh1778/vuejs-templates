let {resolve} = require('path'),
    devServer = require('./dev'),    // 开发环境配置 项目开发中不提交，每个开发者的习惯可能不一样
    srcPath = resolve(__dirname, '../src')

module.exports = {
    commonScssFile: [`${srcPath}/style/variables/system-variable.scss`, `${srcPath}/style/base/mixin.scss`], // 配置全局scss变量
    assets: 'assets',                           // 打包后静态资源子目录
    hashLen: 8,
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
    srcPath: srcPath,                           // 项目源代码目录
    rootPath: resolve(__dirname, '../dist'),    // production环境打包后静态资源根目录
    limit: 1024 * 5,                            // url-loader limit参数
    htmlPlugin: {                               // html-webpack-plugin config
        title: 'vue-sample',
        template: 'index.ejs',
        favicon: './src/images/favicon.ico'
    },
    devServer: devServer
}