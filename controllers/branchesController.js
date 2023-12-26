// controllers/branchesController.js
const Branch = require('../models/Branch');
const FieldOfStudy = require('../models/FieldOfStudy');

const branchesController = {
  getAll: (req, res) => {
    Branch.getAll((err, branches) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.render('branches/index', { branches });
    });
  },

  showForm: (req, res) => {
    FieldOfStudy.getAllFieldsOfStudy((err, fieldsOfStudy) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      
      res.render('branches/new', { fieldsOfStudy });
    });
  },

  add: (req, res) => {
    const { branch_name, field_of_study_id } = req.body;
    if (!branch_name || !field_of_study_id) {
      res.status(400).send('Branch name and field of study are required');
      return;
    }

    Branch.add(branch_name, field_of_study_id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.redirect('/branches');
    });
  },
};

module.exports = branchesController;