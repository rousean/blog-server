const mongoose = require("mongoose") // 引入mongoose
const chalk = require("chalk") // 引入告警模式

const config = require("../config/config") // 引入配置

mongoose.connect(config.mongodb, {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.Promise = global.Promise

let mongodb = mongoose.connection
mongodb.once("open", () => {
  console.log(chalk.green("MongoDb 连接成功!"))
})

mongodb.on("error", function (error) {
  console.error(chalk.red("Error in MongoDb connection: " + error))
  mongoose.disconnect()
})

mongodb.on("close", function () {
  console.log(chalk.red("MongoDb 断开, 请重新连接!"))
  mongoose.connect(config.url, { server: { auto_reconnect: true } })
})

module.exports = mongodb
