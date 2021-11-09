/**
 * 学习笔记模块相关接口
 * */
const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const noteCrud = require('../models/note')

// 学习笔记.md文件保存目录
const mdPath = path.resolve('public/note')

router.prefix('/learn')

// 保存笔记
router.post('/saveNote', async (ctx, next) => {
  let { noteTitle, noteTag, noteContent, noteAbstract } = ctx.request.body
  try {
    const result = await noteCrud.save({ noteTitle, noteTag, noteContent, noteAbstract })
    const filename = noteTitle + '_' + result.id
    // 如果文件不存在,则创建文件;如果文件存在,则覆盖文件内容
    fs.writeFile(`${mdPath}/${filename}.md`, noteContent, err => {
      if (err) {
        ctx.body = {
          code: 0,
          msg: '写入失败!',
        }
      }
    })
    ctx.body = {
      code: 1,
      msg: '保存文章成功!',
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: '保存文章失败!',
    }
  }
})

router.post('/getNote', async (ctx, next) => {
  let { pageSize, pageNum } = ctx.request.body
  let condition = ctx.request.body.condition || {}
  console.log(condition);

  try {
    const pageTotal = await noteCrud.count({})
    const result = await noteCrud.findAll(condition, { createdAt: 1, noteTitle: 1, noteTag: 1, noteAbstract: 1, noteContent: 1 }, { limit: Number(pageSize), skip: pageSize * pageNum - pageSize, sort: { 'createAt': 1 } })
    console.log(result);

    ctx.body = {
      code: 1,
      msg: '成功!',
      data: {
        pageTotal: pageTotal,
        pageSize: pageSize,
        pageNum: pageNum,
        content: result
      }
    }
  } catch (error) {
    ctx.body = {
      code: 0,
      msg: '失败!',
    }

  }

})

module.exports = router
