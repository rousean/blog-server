const mongoose = require('mongoose')
const mongoCrud = require('../db/mongo-crud')

const Schema = mongoose.Schema

// 定义schema
const noteSchema = new Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteTag: {
    type: Array,
    required: true,
  },
  noteAbstract: {
    type: String,
    required: true,
  },
  noteContent: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true
  }
)

// 定义model
const noteModel = mongoose.model('note', noteSchema, 'note')

// 定义class继承增删改查方法
class noteCrud extends mongoCrud {
  constructor() {
    super(noteModel)
  }


}

module.exports = new noteCrud()
