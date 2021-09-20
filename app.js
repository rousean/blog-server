/**
 * 引入相关依赖
 *
 * */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('@koa/cors')
require('./db/mongoose')

// 引入路由
const index = require('./routes/index')
const users = require('./routes/users')
const material = require('./routes/material')
const learn = require('./routes/learn')
const audio = require('./routes/audio')

// 错误处理
onerror(app)

// 中间件
app.use(cors())
app.use(
  bodyparser({
    enableTypes: ['json', 'form', 'text'],
  })
)
app.use(json())
app.use(logger())
// 静态资源
app.use(require('koa-static')(__dirname + '/public'))

app.use(
  views(__dirname + '/views', {
    extension: 'pug',
  })
)

// 日志打印
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 路由信息
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(material.routes(), material.allowedMethods())
app.use(learn.routes(), learn.allowedMethods())
app.use(audio.routes(), audio.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
