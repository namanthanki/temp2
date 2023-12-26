// controllers/universitiesController.js
const db = require('../config/db');
const University = require('../models/University');

const universitiesController = {
  getAll: (req, res) => {
    University.getAll((err, universities) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.render('universities/index', { universities });
    });
  },

  showForm: (req, res) => {
    res.render('universities/new');
  },

  add: (req, res) => {
    const { university_name } = req.body;
    if (!university_name) {
      res.status(400).send('University name is required');
      return;
    }

    University.add(university_name, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.redirect('/universities');
    });
  },
};

module.exports = universitiesController;