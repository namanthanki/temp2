// controllers/fieldsOfStudyController.js
const FieldOfStudy = require('../models/FieldOfStudy');
const Degree = require('../models/Degree');

const fieldsOfStudyController = {
  getAll: (req, res) => {
    FieldOfStudy.getAll((err, fieldsOfStudy) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.render('fieldsOfStudy/index', { fieldsOfStudy });
    });
  },

  showForm: (req, res) => {
    Degree.getAllDegrees((err, degrees) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      
      res.render('fieldsOfStudy/new', { degrees });
    });
  },

  add: (req, res) => {
    const { field_name, degree_id } = req.body;
    if (!field_name || !degree_id) {
      res.status(400).send('Field name and degree are required');
      return;
    }

    FieldOfStudy.add(field_name, degree_id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.redirect('/fieldsOfStudy');
    });
  },
};

module.exports = fieldsOfStudyController;