## 介绍
> 一个功能完整的前端架构体系，提供快速开始的项目开发模板。 
>   - 开发上提供babel hot-reload eslint sass http-proxy minified extract-text ...
>   - 项目上提供换肤功能(皮肤编译)、国际化、CSS布局模版 内部包管理

### 使用
``` bash
# 安装vue-cli
$ npm install -g vue-cli

git clone https://github.com/imlzh1778/vuejs-templates.git

# 获取模版  -template 支持选项
#  |-Project name 项目名称
#  |-Use i18n to your code? 国际化
#  |-Use login page? 登录页、路由权限
$ vue init /Users/lee/vuejs-templates project-template

# 初始化
$ cd project-template
$ npm install

# 开发模式
$ npm run dev

# Mock模式
$ npm run dev-mock

# 立即构建
$ npm run build

# 构建监听
$ npm run watch
```

### 项目结构
    -build/  // 构建目录
    -config/ // 项目配置
    -src/    // 项目源码
        |- components/  // 组件相关
        |- directives/  // 指令
        |- filters/     // 过滤器
        |- i18n/        // 多国语言
        |- images/      // 图片
        |- mixins/      // 混合
        |- modules/     // 模块相关
        |- router/      // 路由相关
        |- store/       // 状态管理
        |- style/       // 样式相关
        |- utils/       // utils
        |- views/       // 页面组件
        |- app.vue      // 入口容器
        |- main.js      // 入口JS
    -test/  // 单元测试
    -tool/  // 开发工具
    -.babelrc       // babel配置文件
    -.eslintignore  // eslint忽略配置
    -.eslintrc.js   // eslint规则配置
    -.gitignore     // git忽略配置
    -index.ejs      // 启动页面
    -package.json   // npm配置文件
    -README.md      // 帮助文档

### 自定义主题
``` bash
# element-ui的变量文件
> src/style/variables/element-variable.css 可更改字体大小 主题...

# 系统的变量文件
> src/style/variables/system-variable.scss 原则上色彩变量与element-variable色彩变量命名一致
```

### 注意事项
``` bash
# 升级element-ui
    1、生成最新element-ui变量文件
        $ et -i src/style/variables/element-variable-new.css
    2、生成自己需要的element-variable.css
        > 通过对比工具经较element-variable-new.css 与 element-variable.css差异
    3、删除element-variable-new.css文件
    4、编译生成element-ui
        $ et -c src/style/variables/element-variable.css -o src/style/element-ui/default
```

### 内部文档
- [icon font](http://192.168.44.125:7000/docs/iconfont/fonts/demo_fontclass.html) 矢量图标
- [公用组件库](http://192.168.44.125:9000/) 跨系统公用组件vu