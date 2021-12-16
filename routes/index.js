const router = require("koa-router")()

router.get("/", async (ctx, next) => {
  await ctx.render("index", {
    title: "个人博客后端接口！",
  })
})

module.exports = router
