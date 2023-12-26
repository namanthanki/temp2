// routes/universities.js
const express = require('express');
const universitiesController = require('../controllers/universitiesController');

const universitiesRouter = express.Router();

universitiesRouter.get('/', universitiesController.getAll);
universitiesRouter.get('/new', universitiesController.showForm);
universitiesRouter.post('/', universitiesController.add);

module.exports = universitiesRouter;