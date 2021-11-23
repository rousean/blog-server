const path = require("path")
const multer = require("@koa/multer")

// 作品信息上传目录
const uploadPath = path.resolve("public/images")

// 配置信息
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, `${file.originalname}`)
  },
})
const limits = {
  fileSize: 10 * 1024 * 1024,
  files: 10,
}
const uploadImage = multer({ storage, limits })

module.exports = uploadImage
