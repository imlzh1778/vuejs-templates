let webpack = require('webpack'),
    config = require('../config'),
    webpackConfig = require('./webpack.dev.conf'),
    opn = require('opn'),
    path = require('path'),
    express = require('express'),
    proxyMiddleware = require('http-proxy-middleware'),
    app = express(),
    compiler = webpack(webpackConfig),
    devMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
    }),
    hotMiddleware = require('webpack-hot-middleware')(compiler, {
        log: () => {},
        heartbeat: 2000
    }),
    mockServer = require('../mock')(app)

Object.keys(config.devServer.proxy).forEach(function (context) {
    let options = config.devServer.proxy[context]
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(options.filter || context, options))
})

app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

let url = 'http://localhost:' + config.devServer.port

devMiddleware.waitUntilValid(function () {
    console.log('> Listening at ' + url + '\n')
})

module.exports = app.listen(config.devServer.port, function (err) {
    if (err) {
        console.log(err)
        return
    }
    if (config.devServer.autoOpenBrowser) {
        opn(url)
    }
})