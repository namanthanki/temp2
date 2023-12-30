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
  // getFilteredFiles: (universityId, subjectId, callback) => {
  //   const query = `
  //     SELECT pdf.id, pdf.name, pdf.file_name, pdf.file_path
  //     FROM pdf_files pdf
  //     JOIN subjects subject ON pdf.subject_id = subject.id
  //     JOIN semesters semester ON subject.semester_id = semester.id
  //     JOIN branches branch ON semester.branch_id = branch.id
  //     JOIN fields_of_study field ON branch.field_id = field.id
  //     JOIN degrees degree ON field.degree_id = degree.id
  //     WHERE degree.university_id = ? AND subject.id = ?;
  //   `;

  //   db.query(query, [universityId, subjectId], callback);
  // },
  getFilteredFiles: (universityId, degreeId, fieldId, branchId, semesterId, subjectId, callback) => {
    const query = `
      SELECT pdf.id, pdf.name, pdf.file_name, pdf.file_path
      FROM pdf_files pdf
      JOIN subjects subject ON pdf.subject_id = subject.id
      JOIN semesters semester ON subject.semester_id = semester.id
      JOIN branches branch ON semester.branch_id = branch.id
      JOIN fields_of_study field ON branch.field_id = field.id
      JOIN degrees degree ON field.degree_id = degree.id
      WHERE degree.university_id = ? 
        AND degree.id = ? 
        AND field.id = ? 
        AND branch.id = ? 
        AND semester.id = ? 
        AND subject.id = ?;
    `;

    db.query(query, [universityId, degreeId, fieldId, branchId, semesterId, subjectId], callback);
  },
};

module.exports = PDFFile;