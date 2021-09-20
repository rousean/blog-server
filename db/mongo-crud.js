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
      this.Model.create(obj, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
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
      entity.save((error, result) => {
        if (error) {
          reject(error)
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
      this.Model.insertMany(objs, (error, result) => {
        if (error) {
          reject(error)
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
      this.Model.findById(id, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }

  /**
   * 查询所有符合条件docs
   * @param condition 查找条件
   * @param constraints
   * @returns {Promise}
   */
  findAll(condition, constraints) {
    return new Promise((resolve, reject) => {
      this.Model.find(condition, constraints ? constraints : null, (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
        }
      }).lean()
    })
  }

  /**
   * 查找符合条件的第一条doc
   * @param condition
   * @param constraints
   * @returns {Promise}
   */
  findOne(condition, constraints) {
    return new Promise((resolve, reject) => {
      this.Model.findOne(condition, constraints ? constraints : null, (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
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
      this.Model.update(condition, updater, (error, results) => {
        if (error) {
          reject(error)
        } else {
          resolve(results)
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
      this.Model.remove(condition, (error, result) => {
        if (error) {
          reject(error)
        } else {
          resolve(result)
        }
      })
    })
  }
}

module.exports = mongoCrud
