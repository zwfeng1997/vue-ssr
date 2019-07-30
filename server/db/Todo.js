let mongoose = require('mongoose')
let TodoSchema = new mongoose.Schema({
  content: String,
  completed: Boolean
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})

module.exports = mongoose.model('con', TodoSchema)
