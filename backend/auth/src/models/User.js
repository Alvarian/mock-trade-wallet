/*
    import databases
    use mongoose
*/

// schema for user: email, password, role(host or trader)
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  userID: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isHost: {
    type: Boolean,
    required: true
  }
})

// expose User
module.exports = mongoose.model('user', userSchema)
