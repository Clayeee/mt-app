import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Maps = new Schema({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Object,
    require: true
  }
})

export default mongoose.model('Map', Maps)
