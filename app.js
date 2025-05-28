const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const todoRoutes = require('./routes/todos');

const app = express();
const PORT = 3000;

// MongoDB Connection (adjust if using cloud)
mongoose.connect('mongodb://localhost:27017/todoapp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('start'); // Start page UI
});

app.get('/exit', (req, res) => {
  res.render('exit'); // Exit goodbye screen
});

app.use('/todos', todoRoutes); // All todo logic

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
