let mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
  name: String,
  pass: String
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})

module.exports = mongoose.model('user', UserSchema)
