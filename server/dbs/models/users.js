import mongoose from 'mongoose'
const Scheam = mongoose.Schema
const UserScheam = new Scheam({
  username: {
    type: String,
    unique: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true
  }
})
export default mongoose.model('User',UserScheam)