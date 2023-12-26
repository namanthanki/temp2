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
};

module.exports = Subject;