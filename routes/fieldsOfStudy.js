// routes/fieldsOfStudy.js
const express = require('express');
const fieldsOfStudyController = require('../controllers/fieldsOfStudyController');

const fieldsOfStudyRouter = express.Router();

fieldsOfStudyRouter.get('/', fieldsOfStudyController.getAll);
fieldsOfStudyRouter.get('/new', fieldsOfStudyController.showForm);
fieldsOfStudyRouter.post('/', fieldsOfStudyController.add);

module.exports = fieldsOfStudyRouter;