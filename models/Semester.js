// models/Semester.js
const db = require('../config/db');

const Semester = {
  getAll: (callback) => {
    db.query('SELECT * FROM semesters', callback);
  },
  add: (semesterName, branchId, callback) => {
    db.query('INSERT INTO semesters (name, branch_id) VALUES (?, ?)', [semesterName, branchId], callback);
  },
  getAllSemesters: (callback) => {
    db.query('SELECT id, name FROM semesters', callback);
  },
  getSemestersByBranch: (branchId, callback) => {
    const query = 'SELECT id, name FROM semesters WHERE branch_id = ?';
    db.query(query, [branchId], callback);
  },
};

module.exports = Semester;