/**
 * 背景音乐模块相关接口
 */
const router = require("koa-router")()
const fs = require("fs")
const path = require("path")

// 定义音乐存储目录
const audioPath = path.resolve("public/audio")

router.prefix("/audio")

// 获取音乐列表
router.get("/audioList", (ctx, next) => {
  let result = fs.readdirSync(audioPath, "utf8")
  let audioList = result.reduce((acc, cur, idx, list) => {
    let audioTitle = cur.split(" - ")[1].split(".")[0]
    let audioAuthor = cur.split(" - ")[0]
    acc.push({ audioName: cur, audioTitle: audioTitle, audioAuthor: audioAuthor })
    return acc
  }, [])
  if (audioList) {
    ctx.body = {
      code: 1,
      msg: "音乐列表请求成功！",
      data: audioList,
    }
  } else {
    ctx.body = {
      code: 0,
      msg: "音乐列表请求失败！",
    }
  }
})

module.exports = router
