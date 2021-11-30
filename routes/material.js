/**
 * 个人作品模块相关接口
 */
const router = require("koa-router")()
const upload = require("../middleware/material")
const { uploadSingle } = require("../controller/material")

router.prefix("/material")

// 单文件上传
router.post("/uploadSingle", upload.single("file"), uploadSingle)

router.post("/getMaterial", (ctx, next) => {
    ctx.body = {
        code: 1,
        msg: "请求成功！",
        data: [
            {
                titleIcon: "code",
                titleName: "代码基础",
                items: [
                    {
                        itemIcon: "JavaScript",
                        itemTitle: "JavaScript基础",
                        itemUrl: "https://wangdoc.com/javascript/",
                        itemContent: "全面介绍 JavaScript 核心语法，覆盖了 ES5 和 DOM 规范的所有内容",
                    },
                    {
                        itemIcon: "JavaScript",
                        itemTitle: "JavaScript讲解",
                        itemUrl: "https://zh.javascript.info/",
                        itemContent:
                            "以最新的 JavaScript 标准为基准。通过简单但足够详细的内容，为你讲解从基础到高阶的 JavaScript 相关知识。",
                    },
                    {
                        itemIcon: "TypeScript",
                        itemTitle: "TypeScript 入门教程",
                        itemUrl:
                            "https://github.com/xcatliu/typescript-tutorial#typescript-%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B",
                        itemContent: "从 JavaScript 程序员的角度总结思考，循序渐进的理解 TypeScript。",
                    },
                    {
                        itemIcon: "Node",
                        itemTitle: "Node.js学习指南",
                        itemUrl: "https://blog.poetries.top/node-learning-notes/",
                        itemContent: "Node.js笔记系统整理",
                    },
                    {
                        itemIcon: "Vue",
                        itemTitle: "Vue3学习资料",
                        itemUrl: "https://vue3js.cn/",
                        itemContent: "vue3相关资料整理",
                    },
                    {
                        itemIcon: "es6",
                        itemTitle: "ES6 入门教程",
                        itemUrl: "https://es6.ruanyifeng.com/",
                        itemContent:
                            "《ECMAScript 6 入门教程》是一本开源的 JavaScript 语言教程，全面介绍 ECMAScript 6 新引入的语法特性。",
                    },
                ],
            },
            {
                titleIcon: "tools",
                titleName: "在线工具",
                items: [
                    {
                        itemIcon: "HTML",
                        itemTitle: "HTML在线美化压缩",
                        itemUrl: "https://tool.lu/html/",
                        itemContent: "HTML在线美化压缩",
                    },
                    {
                        itemIcon: "svg",
                        itemTitle: "阿里巴巴矢量图标库",
                        itemUrl: "https://www.iconfont.cn/",
                        itemContent: "开源海量矢量图标库",
                    },
                ],
            },
            {
                titleIcon: "community",
                titleName: "技术社区",
                items: [
                    {
                        itemIcon: "juejin",
                        itemTitle: "掘金论坛",
                        itemUrl: "https://juejin.cn/",
                        itemContent: "优秀前端学习文章分享论坛",
                    },
                    {
                        itemIcon: "segmentfault",
                        itemTitle: "思否",
                        itemUrl: "https://segmentfault.com/",
                        itemContent: "开放的前端社区",
                    },
                ],
            },
        ],
    }
})

router.post("/getProject", (ctx, next) => {
    ctx.body = {
        code: 1,
        msg: "请求成功！",
        data: [
            {
                title: "后台管理模板",
                stacks: [
                    {
                        title: "vue-system",
                        tag: "前端",
                        url: "https://github.com/rousean/vue-system",
                        introduction:
                            "项目Web端, 技术选用Vue2框架, 结合ElementUI组件。开发登录模块、用户管理模块与路由管理等通用组件。",
                    },
                    {
                        title: "vue-node",
                        tag: "后端",
                        url: "https://github.com/rousean/vue-node",
                        introduction: "项目Server端, 技术选用Node.js与Express框架, 提供用户登录验证等相关请求接口。",
                    },
                ],
            },
            {
                title: "个人博客",
                stacks: [
                    {
                        title: "blog-web",
                        tag: "前端",
                        url: "https://github.com/rousean/blog-web",
                        introduction:
                            "项目Web端, 技术选用Vue2框架, 结合ElementUI组件。开发编写markdown文件组件、音乐模块组件。",
                    },
                    {
                        title: "blog-server",
                        tag: "后端",
                        url: "https://github.com/rousean/vue-node",
                        introduction:
                            "项目Web端, 技术选用Node.js与Koa2框架。 提供文章笔记增删改查接口、音乐列表接口与前端素材等接口。",
                    },
                ],
            },
        ],
    }
})

module.exports = router
