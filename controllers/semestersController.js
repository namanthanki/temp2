// controllers/semestersController.js
const Semester = require('../models/Semester');
const Branch = require('../models/Branch');

const semestersController = {
  getAll: (req, res) => {
    Semester.getAll((err, semesters) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.render('semesters/index', { semesters });
    });
  },

  showForm: (req, res) => {
    Branch.getAllBranches((err, branches) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      
      res.render('semesters/new', { branches });
    });
  },

  add: (req, res) => {
    const { semester_name, branch_id } = req.body;
    if (!semester_name || !branch_id) {
      res.status(400).send('Semester name and branch are required');
      return;
    }

    Semester.add(semester_name, branch_id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.redirect('/semesters');
    });
  },
};

module.exports = semestersController;