module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        'sourceType': 'module'
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    rules: {
        // 禁止出现未使用过的变量 <方便调试>
        'no-unused-vars': 0,
        // 强制函数中的变量要么一起声明要么分开声明
        'one-var': 0,
        // 禁用行尾空白
        'no-trailing-spaces': 0,
        // 禁用未声明的变量
        'no-undef': 0,
        'prefer-promise-reject-errors': 0,
        'no-new': 0,
        // 禁止文件末尾存在空行
        'eol-last': 0,
        // 禁止在行末加分号
        'semi': 0,
        // 统一的缩进格式
        'indent': [
            'error',
            4,
            {
                'SwitchCase': 1
            }
        ],
        // 禁止出现多行空行
        'no-multiple-empty-lines': [
            'error',
            {
                // 允许的最大连续空行数
                'max': 3
            }
        ],
        // 禁止出现多个空格
        'no-multi-spaces': [
            'error',
            {
                'exceptions': {
                    'VariableDeclarator': true
                }
            }
        ]
    }
};