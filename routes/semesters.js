// routes/semesters.js
const express = require('express');
const semestersController = require('../controllers/semestersController');

const semestersRouter = express.Router();

semestersRouter.get('/by-branch', semestersController.getSemestersByBranch);
semestersRouter.get('/', semestersController.getAll);
semestersRouter.get('/new', semestersController.showForm);
semestersRouter.post('/', semestersController.add);

module.exports = semestersRouter;