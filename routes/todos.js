const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// View all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.render('todos', { todos });
});

// Add new task
router.post('/add', async (req, res) => {
  const { task, dueDate } = req.body;
  await Todo.create({ task, dueDate, completed: false });
  res.redirect('/todos');
});

// Toggle complete
router.post('/toggle/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.redirect('/todos');
});

// Delete task
router.post('/delete/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/todos');
});

// Show edit form
router.get('/edit/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.render('edit', { todo });
});

// Submit edit form
router.post('/edit/:id', async (req, res) => {
  const { task, dueDate } = req.body;
  await Todo.findByIdAndUpdate(req.params.id, { task, dueDate });
  res.redirect('/todos');
});

module.exports = router;
