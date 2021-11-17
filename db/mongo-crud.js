// 二次封装mongodb增删改查方法
class mongoCrud {
  /**
   * 子类构造传入对应的Model类
   * @param Model
   */
  constructor(Model) {
    this.Model = Model
  }

  /**
   * 使用Model的静态方法create()添加doc
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  create(obj) {
    return new Promise((resolve, reject) => {
      this.Model.create(obj, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  /**
   * 使用Model save()添加doc
   * @param obj 构造实体的对象
   * @returns {Promise}
   */
  save(obj) {
    return new Promise((resolve, reject) => {
      let entity = new this.Model(obj)
      entity.save((err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * 使用Model insertMany()添加多个doc
   * @param objs 构造实体的对象
   * @returns {Promise}
   */
  insertMany(objs) {
    return new Promise((resolve, reject) => {
      this.Model.insertMany(objs, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * 用id查询
   * @param {_id} id id属性
   * @returns {Promise}
   */
  findById(id) {
    return new Promise((resolve, reject) => {
      this.Model.findById(id, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * 查询总数
   * @param {conditions} 查询条件
   * @returns {Promise}
   */
  count(conditions) {
    return new Promise((resolve, reject) => {
      this.Model.count(conditions, (err, result) => {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * 查询所有符合条件docs
   * @param condition 查找条件 Object
   * @param fields 查询字段 Object
   * @param options 查询回调 Object
   * @returns {Promise}
   */
  findAll(conditions, fields, options) {
    return new Promise((resolve, reject) => {
      this.Model.find(conditions, fields, options, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      }).lean()
    })
  }

  /**
   * 查找符合条件的第一条doc
   * @param condition
   * @param fields
   * @param options
   * @returns {Promise}
   */
  findOne(condition, fields, options) {
    return new Promise((resolve, reject) => {
      this.Model.findOne(condition, fields, options, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  /**
   * 查找排序之后的第一条
   * @param condition
   * @param orderColumn
   * @param orderType
   * @returns {Promise}
   */
  findOneByOrder(condition, orderColumn, orderType) {
    return new Promise((resolve, reject) => {
      this.Model.findOne(condition)
        .sort({ [orderColumn]: orderType })
        .exec(function (err, record) {
          if (err) {
            reject(err)
          } else {
            resolve(record)
          }
        })
    })
  }

  /**
   * 更新 docs
   * @param condition 查找条件
   * @param updater 更新操作
   * @returns {Promise}
   */
  update(condition, updater) {
    return new Promise((resolve, reject) => {
      this.Model.findOneAndUpdate(condition, updater, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }

  /**
   * 移除 doc
   * @param condition 查找条件
   * @returns {Promise}
   */
  remove(condition) {
    return new Promise((resolve, reject) => {
      this.Model.findOneAndDelete(condition, (err, res) => {
        if (err) {
          reject(err)
        } else {
          resolve(res)
        }
      })
    })
  }
}

module.exports = mongoCrud
