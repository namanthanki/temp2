// routes/degrees.js
const express = require('express');
const degreesController = require('../controllers/degreesController');

const degreesRouter = express.Router();

degreesRouter.get('/by-uni', degreesController.getDegreesByUniversity);
degreesRouter.get('/', degreesController.getAll);
degreesRouter.get('/new', degreesController.showForm);
degreesRouter.post('/', degreesController.add);

module.exports = degreesRouter;