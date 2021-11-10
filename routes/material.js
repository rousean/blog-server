/**
 * 个人作品模块相关接口
 */
const router = require('koa-router')()
const upload = require('../middleware/material')
const { uploadSingle } = require('../controller/material')

router.prefix('/material')

// 单文件上传
router.post('/uploadSingle', upload.single('file'), uploadSingle)

module.exports = router
