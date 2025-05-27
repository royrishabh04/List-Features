const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  const todos = await Todo.find().sort({ dueDate: 1 });
  res.render('todos', { todos });
});

router.post('/add', async (req, res) => {
  const { task, dueDate } = req.body;
  await Todo.create({ task, dueDate });
  res.redirect('/todos');
});

router.post('/delete/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.redirect('/todos');
});

router.post('/toggle/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  await todo.save();
  res.redirect('/todos');
});

router.post('/edit/:id', async (req, res) => {
  const { task, dueDate } = req.body;
  await Todo.findByIdAndUpdate(req.params.id, { task, dueDate });
  res.redirect('/todos');
});

module.exports = router;