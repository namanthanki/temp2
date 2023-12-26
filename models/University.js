// models/University.js
const db = require('../config/db');

const University = {
  getAll: (callback) => {
    db.query('SELECT * FROM universities', callback);
  },
  add: (universityName, callback) => {
    db.query('INSERT INTO universities (name) VALUES (?)', [universityName], callback);
  },
  getAllUniversities: (callback) => {
    db.query('SELECT id, name FROM universities', callback);
  }
};

module.exports = University;