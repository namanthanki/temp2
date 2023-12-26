// models/PDFFile.js
const db = require('../config/db');

const PDFFile = {
  getAll: (callback) => {
    db.query('SELECT * FROM pdf_files', callback);
  },
  add: (name, file_name, file_path, subjectId, callback) => {
    db.query('INSERT INTO pdf_files (name, file_name, file_path, subject_id) VALUES (?, ?, ?, ?)', [name, file_name, file_path, subjectId], callback);
  },
  getById: (id, callback) => {
    db.query('SELECT * FROM pdf_files WHERE id = ?', [id], callback);
  },
  update: (id, name, file_name, file_path, subjectId, callback) => {
    db.query('UPDATE pdf_files SET name = ?, file_name = ?, file_path = ?, subject_id = ? WHERE id = ?', [name, file_name, file_path, subjectId, id], callback);
  },
  remove: (id, callback) => {
    db.query('DELETE FROM pdf_files WHERE id = ?', [id], callback);
  },
};

module.exports = PDFFile;