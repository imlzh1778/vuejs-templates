let webpack = require('webpack'),
    {
        assets,
        hashLen,
        srcPath,
        limit,
        publicPath,
        rootPath
    } = require('../config');

module.exports = {
    entry: {
        index: ['babel-polyfill', `${srcPath}/main.js`]  // 相对于执行命令目录
    },
    output: {
        path: rootPath,
        publicPath: publicPath,
        filename: `${assets}/js/[name].js?v=[chunkhash:${hashLen}]`
    },
    module: {
        rules: [{
            test: /\.(eot|ttf|otf|woff2?)(\?\S*)?$/,
            loader: 'url-loader',
            options: {
                limit: limit,
                name: `${assets}/[path][name].[ext]?v=[hash:${hashLen}]`
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: limit,
                    name: `${assets}/[path][name].[ext]?v=[hash:${hashLen}]`
                }
            }
        }, {
            test: /\.js$/,
            include: srcPath,
            use: 'babel-loader'
        }, {
            test: /\.ejs/,
            loader: 'ejs-loader',
            options: {
                interpolate: /\{\{(.+?)\}\}/,
                evaluate: /\[\[(.+?)\]\]/
            }
        }]
    },
    plugins: [],
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css', '.json'],
        alias: {
            'components': `${srcPath}/components`,
            'directives': `${srcPath}/directives`,
            'filters': `${srcPath}/filters`,
            'images': `${srcPath}/images`,
            'modules': `${srcPath}/modules`,
            'style': `${srcPath}/style`,
            'utils': `${srcPath}/utils`,
            'views': `${srcPath}/views`,
            'src': srcPath,
            'vue$': 'vue/dist/vue.esm.js',
            'variable$': `${srcPath}/style/variables/system-variable.scss`
        }
    }
};