const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  dueDate: Date,
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Todo', todoSchema);

