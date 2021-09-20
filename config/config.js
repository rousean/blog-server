'use strict'

// 全局配置
const config = {
  port: '3000',
  mongodb: 'mongodb://localhost:27017/blog',
  mysql: {
    host: '127.0.0.1', // IP
    port: 3306, // 端口号
    database: 'blog', // 数据库名
    user: 'root', // 数据库用户名
    password: '', // 数据库密码
  },
}

module.exports = config
