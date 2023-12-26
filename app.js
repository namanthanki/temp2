// app.js
const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/db');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Home route
app.get('/', (req, res) => {
  res.send('Hello, welcome to the study materials app!');
});

// Use routes
app.use(routes);

// Listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});