import mongoose from 'mongoose'
const Scheam = mongoose.Schema
const Province = new Scheam({
  id: {
    type: String,
    require: true
  },
  value: {
    type: Array,
    require: true
  }
})
export default mongoose.model('Province',Province)