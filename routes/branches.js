// routes/branches.js
const express = require('express');
const branchesController = require('../controllers/branchesController');

const branchesRouter = express.Router();

branchesRouter.get('/', branchesController.getAll);
branchesRouter.get('/new', branchesController.showForm);
branchesRouter.post('/', branchesController.add);

module.exports = branchesRouter;