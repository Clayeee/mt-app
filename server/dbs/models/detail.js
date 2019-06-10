import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Detail = new Schema({
  name: {
    type: String
  },
  photo: {
    type: Object
  },
  last: {
    type: Number
  },
  price: {
    type: Number
  },
  oldprice: {
    type: Number
  }
})

export default mongoose.model('Detail', Detail)
