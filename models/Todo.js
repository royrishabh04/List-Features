const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: String,
  completed: Boolean,
  dueDate: Date
});

module.exports = mongoose.model('Todo', todoSchema);
