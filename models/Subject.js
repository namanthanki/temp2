// models/Subject.js
const db = require('../config/db');

const Subject = {
  getAll: (callback) => {
    db.query('SELECT * FROM subjects', callback);
  },
  add: (subjectName, semesterId, callback) => {
    db.query('INSERT INTO subjects (name, semester_id) VALUES (?, ?)', [subjectName, semesterId], callback);
  },
  getAllSubjects: (callback) => {
    db.query('SELECT id, name FROM subjects', callback);
  },
  getSubjectsByUniversity: (universityId, callback) => {
    const query = `
      SELECT s.id, s.name
      FROM subjects s
      JOIN semesters sem ON s.semester_id = sem.id
      JOIN branches b ON sem.branch_id = b.id
      JOIN fields_of_study f ON b.field_id = f.id
      JOIN degrees d ON f.degree_id = d.id
      WHERE d.university_id = ?;
    `;

    db.query(query, [universityId], callback);
  },
};

module.exports = Subject;