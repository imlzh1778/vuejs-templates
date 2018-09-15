let webpack = require('webpack'),
    merge = require('webpack-merge'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
    {
        commonScssFile,
        srcPath,
        assets,
        htmlPlugin
    } = require('../config'),
    baseConfig = require('./webpack.base.conf')

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function (name) {
    baseConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
    output: {
        filename: `${assets}/js/[name].js`
    },
    module: {
        rules: [{
            test: /\.scss$/,  // creates style nodes from JS strings | translates CSS into CommonJS | compiles Sass to CSS
            include: srcPath,
            use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader', {
                loader: 'sass-resources-loader',
                options: {
                    resources: commonScssFile
                }
            }]
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            include: srcPath,
            options: {
                loaders: {
                    css: ['vue-style-loader', 'css-loader', 'sass-loader', {
                        loader: 'sass-resources-loader',
                        options: {
                            resources: commonScssFile
                        }
                    }]
                }
            }
        }, {
            test: /\.(js|vue)$/,
            loader: 'eslint-loader',
            enforce: 'pre',
            include: srcPath,
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        }]
    },
    devtool: '#cheap-module-eval-source-map',   // #eval-source-map
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin(htmlPlugin),
        new FriendlyErrorsPlugin()
    ]
})