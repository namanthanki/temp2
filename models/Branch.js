// models/Branch.js
const db = require('../config/db');

const Branch = {
  getAll: (callback) => {
    db.query('SELECT * FROM branches', callback);
  },
  add: (branchName, fieldOfStudyId, callback) => {
    db.query('INSERT INTO branches (name, field_id) VALUES (?, ?)', [branchName, fieldOfStudyId], callback);
  },
  getAllBranches: (callback) => {
    db.query('SELECT id, name FROM branches', callback);
  },
};

module.exports = Branch;