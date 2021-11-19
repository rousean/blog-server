const router = require("koa-router")()

router.prefix("/user")

router.post("/login", function (ctx, next) {
  let { username, password } = ctx.request.body
  if (username === "admin" && password === "admin") {
    ctx.body = {
      code: 1,
      msg: "登录成功！",
      token: "admin",
    }
  } else {
    ctx.body = {
      code: 0,
      msg: "登录失败！",
      token: "admin",
    }
  }
})

module.exports = router
