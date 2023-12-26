// models/Degree.js
const db = require('../config/db');

const Degree = {
  getAll: (callback) => {
    db.query('SELECT * FROM degrees', callback);
  },
  add: (degreeName, universityId, callback) => {
    db.query('INSERT INTO degrees (name, university_id) VALUES (?, ?)', [degreeName, universityId], callback);
  },
  getAllDegrees: (callback) => {
    db.query('SELECT id, name FROM degrees', callback);
  },
};

module.exports = Degree;