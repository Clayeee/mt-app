import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Show = new Schema({
  name: {
    type: String
  },
  info: {
    type: String
  },
  price: {
    type: String
  },
  oldprice: {
    type: String
  },
  add: {
    type: String
  },
  mod: {
    type: String
  },
  img: {
    type: String
  }
})

export default mongoose.model('Show', Show)
