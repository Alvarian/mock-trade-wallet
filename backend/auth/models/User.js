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
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

// expose User
module.exports = mongoose.model('user', userSchema)
