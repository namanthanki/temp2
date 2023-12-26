// controllers/subjectsController.js
const Subject = require('../models/Subject');
const Semester = require('../models/Semester');

const subjectsController = {
  getAll: (req, res) => {
    Subject.getAll((err, subjects) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.render('subjects/index', { subjects });
    });
  },

  showForm: (req, res) => {
    // Fetch semesters to populate a dropdown in the form
    // Assume a model method getAllSemesters() exists in Semester.js
    // You need to implement this method in the Semester.js model
    // and use it here to fetch semesters.
    // For simplicity, I'll use a placeholder array here.
    const semesters = [{ semester_id: 1, semester_name: 'Example Semester' }];
    res.render('subjects/new', { semesters });
  },

  add: (req, res) => {
    const { subject_name, semester_id } = req.body;
    if (!subject_name || !semester_id) {
      res.status(400).send('Subject name and semester are required');
      return;
    }

    Subject.add(subject_name, semester_id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.redirect('/subjects');
    });
  },
};

module.exports = subjectsController;