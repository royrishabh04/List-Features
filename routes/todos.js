const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// View all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ createdAt: -1 });
  res.render('todos', { todos });
});

// Create a new todo
router.post('/', async (req, res) => {
  const { title, dueDate } = req.body;
  const todo = new Todo({ title, dueDate });
  await todo.save();
  res.redirect('/todos');
});

// Complete a todo
router.post('/:id/complete', async (req, res) => {
  await Todo.findByIdAndUpdate(req.params.id, { completed: true });
  res.redirect('/todos');
});

// Undo completion
router.post('/:id/undo', async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, { completed: false });
    res.redirect('/todos');
  } catch (err) {
    res.status(500).send('Failed to undo completion');
  }
});

// Edit form
router.get('/:id/edit', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  res.render('edit', { todo });
});

// Update a todo
router.put('/:id', async (req, res) => {
  const { title, dueDate } = req.body;
  await Todo.findByIdAndUpdate(req.params.id, { title, dueDate });
  res.redirect('/todos');
});

// Delete a todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/todos');
});

module.exports = router;




