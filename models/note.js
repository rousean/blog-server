const mongoose = require('mongoose')
const mongoCrud = require('../db/mongo-crud')
const baseModel = require('./base-model')

const Schema = mongoose.Schema

// 定义schema
const noteSchema = new Schema({
  ...baseModel,
  note_id: {
    type: String,
    required: true,
  },
  note_title: {
    type: String,
    required: true,
  },
  note_tag: {
    type: Array,
    required: true,
  },
  note_filename: {
    type: String,
    required: true,
  },
})

// 定义model
const noteModel = mongoose.model('note', noteSchema, 'note')

// 定义class继承增删改查方法
class noteCrud extends mongoCrud {
  constructor() {
    super(noteModel)
  }


}

module.exports = new noteCrud()
