/**
 * 个人作品模块控制器
 *
 */
exports.uploadSingle = (ctx, next) => {
  try {
    ctx.body = {
      code: 1,
      msg: '文件上传成功!',
    }
  } catch (error) {
    ctx.body = {
      code: 0,
      msg: '文件上传失败!',
    }
  }
}
