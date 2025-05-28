const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const todosRouter = require('./routes/todos');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/todoapp')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Mongoose model
const Todo = require('./models/Todo');

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Routes
app.use('/todos', todosRouter);

// Start Page
app.get('/', (req, res) => {
  res.render('start');
});

// Exit Page
app.get('/exit', (req, res) => {
  res.render('exit');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
