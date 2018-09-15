let isMockServer = process.env.NODE_ENV_DEV_MODE === 'mock',
    fs = require('fs'),
    vm = require('vm'),
    {resolve} = require('path')

function stripBOM (content) {
    // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
    // because the buffer-to-string conversion in `fs.readFileSync()`
    // translates it to FEFF, the UTF-16 BOM.
    if (content.charCodeAt(0) === 0xFEFF) {
        content = content.slice(1)
    }
    return content.replace(/^\#\!.*/, '')
}

module.exports = function (app) {
    if (isMockServer) {
        console.log('================ mock-server ================')
        app.use(function (req, res, next) {
            let path = req.path.split('?')[0]
            let fileContent = fs.readFileSync(`${resolve(__dirname, '../mock')}/mock.js`, 'utf8'),
                context = vm.runInThisContext(stripBOM(fileContent).replace('module.', ''), {fileName: 'mock.js'}),
                pathArr = Object.keys(context)
            if (path === '/mockData.api') {
                res.send(context)
            } else {
                if (pathArr.indexOf(path) > -1) {
                    res.send(context[path])
                } else {
                    next()
                }
            }
        })
    }

    return app
}