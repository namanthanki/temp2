// routes/index.js
const express = require('express');
const universitiesRouter = require('./universities');
const degreesRouter = require('./degrees');
const fieldsOfStudyRouter = require('./fieldsOfStudy');
const branchesRouter = require('./branches');
const semestersRouter = require('./semesters');
const subjectsRouter = require('./subjects');
const pdfFilesRouter = require('./pdfFiles');

const router = express.Router();

router.use('/universities', universitiesRouter);
router.use('/degrees', degreesRouter);
router.use('/fieldsOfStudy', fieldsOfStudyRouter);
router.use('/branches', branchesRouter);
router.use('/semesters', semestersRouter);
router.use('/subjects', subjectsRouter);
router.use('/pdfFiles', pdfFilesRouter);

module.exports = router;