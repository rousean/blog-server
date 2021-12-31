const path = require("path")
const multer = require("@koa/multer")

// 作品信息上传目录
const uploadPath = path.resolve("public/opus")

// 配置信息
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`)
  },
})
const upload = multer({ storage })

module.exports = upload
