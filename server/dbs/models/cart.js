import mongoose from 'mongoose'
const Schema = mongoose.Schema
const Cart = new Schema({
  id: {
    type: String
  },
  detail: {
    type: Array
  },
  cartNo: {
    type: String
  },
  user: {
    type: String
  },
  time: {
    type: String
  }
})

export default mongoose.model('Cart', Cart)
