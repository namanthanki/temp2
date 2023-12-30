// models/FieldOfStudy.js
const db = require('../config/db');

const FieldOfStudy = {
  getAll: (callback) => {
    db.query('SELECT * FROM fields_of_study', callback);
  },
  add: (fieldName, degreeId, callback) => {
    db.query('INSERT INTO fields_of_study (name, degree_id) VALUES (?, ?)', [fieldName, degreeId], callback);
  },
  getAllFieldsOfStudy: (callback) => {
    db.query('SELECT id, name FROM fields_of_study', callback);
  },
  getFieldsByDegree: (degreeId, callback) => {
    const query = 'SELECT id, name FROM fields_of_study WHERE degree_id = ?';
    db.query(query, [degreeId], callback);
  },
};

module.exports = FieldOfStudy;