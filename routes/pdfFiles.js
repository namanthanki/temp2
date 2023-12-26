// routes/pdfFiles.js
const express = require('express');
const pdfFilesController = require('../controllers/pdfFilesController');

const pdfFilesRouter = express.Router();

pdfFilesRouter.get('/', pdfFilesController.getAll);
pdfFilesRouter.get('/new', pdfFilesController.showForm);
pdfFilesRouter.post('/', pdfFilesController.add);
pdfFilesRouter.get('/:id/edit', pdfFilesController.getById);
pdfFilesRouter.post('/:id', pdfFilesController.update);
pdfFilesRouter.post('/:id/delete', pdfFilesController.remove);
pdfFilesRouter.get('/:id/download', pdfFilesController.download);

module.exports = pdfFilesRouter;