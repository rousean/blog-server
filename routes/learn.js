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
  let { note_id, note_title, note_tag, note_filename, note_content } = ctx.request.body
  // 如果文件不存在,则创建文件;如果文件存在,则覆盖文件内容
  fs.writeFile(`${mdPath}/${note_filename}.md`, note_content, err => {
    if (err) {
      ctx.body = {
        code: 0,
        msg: '失败!',
      }
    }
  })
  try {
    await noteCrud.save({ note_id, note_title, note_tag, note_filename })
    ctx.body = {
      code: 1,
      msg: '成功!',
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: '失败!',
    }
  }
})

router.post('/getNote', async (ctx, next) => {
  let { pageSize, pageNum } = ctx.request.body
  console.log(pageSize, pageNum);

  const result = await noteCrud.findAll({}, {}, { limit: Number(pageSize), skip: pageSize * pageNum, sort: { 'createAt': -1 } })
  console.log(result)
  ctx.body = {
    code: 1,
    msg: '成功!',
    result: result
  }
})

module.exports = router
