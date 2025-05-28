const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Show all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ dueDate: 1 });
  res.render('todos', { todos });
});

// Create new todo
router.post('/', async (req, res) => {
  const { title, dueDate } = req.body;
  await Todo.create({ title, dueDate });
  res.redirect('/todos');
});

// Edit form
router.get('/:id/edit', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.render('edit', { todo });
});

// Update todo
router.put('/:id', async (req, res) => {
  const { title, dueDate } = req.body;
  await Todo.findByIdAndUpdate(req.params.id, { title, dueDate });
  res.redirect('/todos');
});

// Complete task
router.post('/:id/complete', async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, { completed: true });
  res.redirect('/todos');
});

// Delete todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/todos');
});

const express = require('express');
const router = express.Router();

// GET /todos/:id/edit
router.get('/:id/edit', (req, res) => {
  const todoId = req.params.id;

  // Simulate fetching a todo item
  const todo = { id: todoId, title: "Sample Todo", description: "Edit this task" };

  // Render edit form (assuming you're using EJS or another view engine)
  res.render('edit', { todo });
});

module.exports = router;

module.exports = router;

