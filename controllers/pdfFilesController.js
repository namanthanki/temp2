// controllers/pdfFilesController.js
const PDFFile = require('../models/PDFFiles');
const Subject = require('../models/Subject');

const multer = require('multer');
const path = require('path');

// Set up storage for PDF files using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/pdfFiles');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage: storage });

const pdfFilesController = {
  getAll: (req, res) => {
    PDFFile.getAll((err, pdfFiles) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.render('pdfFiles/index', { pdfFiles });
    });
  },

  showForm: (req, res) => {
    Subject.getAllSubjects((err, subjects) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      
      res.render('pdfFiles/new', { subjects });
    });
  },

  add: [
    upload.single('pdfFile'), // Use multer to handle file upload
    (req, res) => {
      const { name, subject_id } = req.body;

      // Check if a file is uploaded
      if (!req.file) {
        res.status(400).send('Please upload a PDF file');
        return;
      }

      const file_name = req.file.originalname;
      const file_path = req.file.path;

      if (!name || !file_name || !file_path || !subject_id) {
        res.status(400).send('All fields are required');
        return;
      }

      PDFFile.add(name, file_name, file_path, subject_id, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Database error');
          return;
        }
        res.redirect('/pdfFiles');
      });
    },
  ],

  getById: (req, res) => {
    const pdfFileId = req.params.id;

    PDFFile.getById(pdfFileId, (err, pdfFile) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }

      if (!pdfFile) {
        res.status(404).send('PDF file not found');
        return;
      }

      res.render('pdfFiles/edit', { pdfFile });
    });
  },

  update: (req, res) => {
    const pdfFileId = req.params.id;
    const { name, subject_id } = req.body;

    // Check if a file is uploaded
    if (req.file) {
      const file_name = req.file.originalname;
      const file_path = req.file.path;

      PDFFile.update(pdfFileId, name, file_name, file_path, subject_id, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Database error');
          return;
        }
        res.redirect('/pdfFiles');
      });
    } else {
      // If no new file is uploaded, update only the text fields
      PDFFile.getById(pdfFileId, (err, pdfFile) => {
        if (err) {
          console.error(err);
          res.status(500).send('Database error');
          return;
        }

        if (!pdfFile) {
          res.status(404).send('PDF file not found');
          return;
        }

        PDFFile.update(pdfFileId, name, pdfFile.file_name, pdfFile.file_path, subject_id, (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Database error');
            return;
          }
          res.redirect('/pdfFiles');
        });
      });
    }
  },

  remove: (req, res) => {
    const pdfFileId = req.params.id;

    PDFFile.remove(pdfFileId, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.redirect('/pdfFiles');
    });
  },

  download: (req, res) => {
    const pdfFileId = req.params.id;

    PDFFile.getById(pdfFileId, (err, pdfFile) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }

      if (!pdfFile[0]) {
        res.status(404).send('PDF file not found');
        return;
      }
      console.log(pdfFile[0].file_path);
      // Check if file_path is defined
      if (!pdfFile[0].file_path) {
        console.error('File path is undefined');
        res.status(500).send('File path is undefined');
        return;
      }

      // Construct the file path using path.join and normalize
      const filePath = path.resolve(__dirname, '..', pdfFile[0].file_path);

      // Set the appropriate content type for PDF
      res.setHeader('Content-Type', 'application/pdf');
      // Set the Content-Disposition header to trigger download
      res.download(filePath, `${pdfFile[0].name}.pdf`, (err) => {
        if (err) {
          console.error('Error downloading file:', err);
          res.status(500).send('Error downloading file');
        }
      });
    });
  },
};

module.exports = pdfFilesController;