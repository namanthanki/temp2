// routes/subjects.js
const express = require('express');
const subjectsController = require('../controllers/subjectsController');

const subjectsRouter = express.Router();

subjectsRouter.get('/by-uni', subjectsController.getSubjectsByUniversity);
subjectsRouter.get('/', subjectsController.getAll);
subjectsRouter.get('/new', subjectsController.showForm);
subjectsRouter.post('/', subjectsController.add);

module.exports = subjectsRouter;