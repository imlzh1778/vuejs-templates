let webpack = require('webpack'),
    merge = require('webpack-merge'),
    baseConfig = require('./webpack.base.conf'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin'),
    {resolve} = require('path'),
    {
        commonScssFile,
        assets,
        srcPath,
        hashLen,
        htmlPlugin
    } = require('../config'),
    vendorCss = new ExtractTextPlugin({
        filename: `${assets}/css/vendor.css?v=[contenthash:${hashLen}]`
    }),
    styleCss = new ExtractTextPlugin({
        filename: `${assets}/css/style.css?v=[contenthash:${hashLen}]`
    })

module.exports = merge(baseConfig, {
    module: {
        rules: [{
            test: /\.scss$/,
            include: srcPath,
            use: vendorCss.extract(['css-loader', 'postcss-loader', 'sass-loader', {
                loader: 'sass-resources-loader',
                options: {
                    resources: commonScssFile
                }
            }])
        }, {
            test: /\.css$/,
            use: vendorCss.extract(['css-loader', 'postcss-loader'])
        }, {
            test: /\.vue$/,
            include: srcPath,
            loader: 'vue-loader',
            options: {
                loaders: {
                    css: styleCss.extract({
                        use: ['css-loader?sourceMap', 'sass-loader', {
                            loader: 'sass-resources-loader',
                            options: {
                                resources: commonScssFile
                            }
                        }],
                        fallback: 'vue-style-loader'
                    })
                }
            }
        }]
    }, plugins: [
        // 生产版本
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // 任何从node_modules来的JS模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return (
                    module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(resolve(__dirname, '../node_modules')) === 0
                )
            }
        }),
        // 分离webpackBootstrap模块加载器 app发生变化 -> hash变化 ->  webpackBootstrap变化
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // HTML 压缩及注入
        new HtmlWebpackPlugin(
            Object.assign({
                minify: {
                    removeComments: true,
                    collapseWhitespace: true
                }
            }, htmlPlugin)
        ),
        vendorCss,
        styleCss,
        new OptimizeCSSPlugin(),
        // JS 压缩
        new webpack.optimize.UglifyJsPlugin({
            // 产生sourceMap
            sourceMap: true,
            // 移除的无效代码或定义是显示警告信息
            compress: {
                warnings: false
            }
        }),
        // 能使体积更小
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        // 提升JS作用 Treesaking（scope hoistingH）
        new webpack.optimize.ModuleConcatenationPlugin()
    ],
    devtool: '#source-map'
})