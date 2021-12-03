/**
 * 学习笔记模块相关接口
 * */
const router = require("koa-router")()
const fs = require("fs")
const path = require("path")
const noteCrud = require("../models/note")
const uploadImage = require("../middleware/uploadImage")

// 学习笔记.md文件保存目录
const mdPath = path.resolve("public/note")

router.prefix("/learn")

// 保存笔记
router.post("/saveNote", async (ctx, next) => {
  let { noteTitle, noteTag, noteContent, noteAbstract } = ctx.request.body
  try {
    const result = await noteCrud.save({ noteTitle, noteTag, noteContent, noteAbstract })
    const filename = noteTitle + "_" + result.id
    // 如果文件不存在,则创建文件;如果文件存在,则覆盖文件内容
    fs.writeFile(`${mdPath}/${filename}.md`, noteContent, err => {
      if (err) {
        ctx.body = {
          code: 0,
          msg: "写入失败！",
        }
      }
    })
    ctx.body = {
      code: 1,
      msg: "保存文章成功！",
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: "保存文章失败！",
    }
  }
})

// 获取文章列表
router.post("/getNote", async (ctx, next) => {
  let { pageSize, pageNum } = ctx.request.body
  let condition = ctx.request.body.condition || {}
  try {
    const pageTotal = await noteCrud.count(condition)
    const result = await noteCrud.findAll(
      condition,
      { createdAt: 1, noteTitle: 1, noteTag: 1, noteAbstract: 1 },
      { limit: Number(pageSize), skip: pageSize * pageNum - pageSize, sort: { _id: -1 } }
    )
    ctx.body = {
      code: 1,
      msg: "文章请求成功！",
      data: {
        pageTotal: pageTotal,
        pageSize: pageSize,
        pageNum: pageNum,
        content: result,
      },
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: "文章请求失败！",
      error: err,
    }
  }
})

// 根据id查找文章
router.post("/getNoteById", async (ctx, next) => {
  let { id } = ctx.request.body
  try {
    const result = await noteCrud.findOne({ _id: id }, {}, {})
    ctx.body = {
      code: 1,
      msg: "文章请求成功！",
      data: result,
    }
  } catch (error) {
    ctx.body = {
      code: 0,
      msg: "文章请求失败！",
    }
  }
})

// 根据id删除文章
router.post("/deleteNote", async (ctx, next) => {
  let { id } = ctx.request.body
  try {
    await noteCrud.remove({ _id: id })
    ctx.body = {
      code: 1,
      msg: "文章删除成功！",
    }
  } catch (error) {
    ctx.body = {
      code: 0,
      msg: "文章删除成功！",
    }
  }
})

// 根据id修改文章
router.post("/updateNote", async (ctx, next) => {
  let { id, noteTitle, noteTag, noteContent, noteAbstract } = ctx.request.body
  try {
    const result = await noteCrud.update({ _id: id }, { $set: { noteTitle, noteTag, noteContent, noteAbstract } })
    const filename = noteTitle + "_" + result.id
    // 如果文件不存在,则创建文件;如果文件存在,则覆盖文件内容
    fs.writeFile(`${mdPath}/${filename}.md`, noteContent, err => {
      if (err) {
        ctx.body = {
          code: 0,
          msg: "写入失败！",
        }
      }
    })
    ctx.body = {
      code: 1,
      msg: "文章修改成功！",
    }
  } catch (err) {
    ctx.body = {
      code: 0,
      msg: "修改文章失败！",
    }
  }
})

// markdown上传图片
router.post("/uploadImage", uploadImage.single("file"), (ctx, next) => {
  ctx.body = {
    code: 1,
    msg: "请求成功！",
  }
})

router.get("/tagOptions", (ctx, next) => {
  ctx.body = {
    code: 1,
    msg: "请求成功！",
    data: [
      {
        type: "success",
        label: "JavaScript",
      },
      {
        type: "danger",
        label: "HTML",
      },
      {
        type: "warning",
        label: "CSS",
      },
      {
        type: "danger",
        label: "TypeScript",
      },
      {
        type: "success",
        label: "Vue",
      },
      {
        type: "danger",
        label: "Node",
      },
      {
        type: "warning",
        label: "Deno",
      },
    ],
  }
})

module.exports = router
