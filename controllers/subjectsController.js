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

  getSubjectsBySemester: (req, res) => {
    const { semesterId } = req.query;

    Subject.getSubjectsBySemester(semesterId, (err, subjects) => {
      if (err) {
        console.error('Error fetching subjects:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(subjects);
    });
  },

  showForm: (req, res) => {
    Semester.getAllSemesters((err, semesters) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      
      res.render('subjects/new', { semesters });
    });
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

  getSubjectsByUniversity: (req, res) => {
    const { universityId } = req.query;
    Subject.getSubjectsByUniversity(universityId, (err, subjects) => {
      if (err) {
        console.error('Error fetching subjects by university:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.json(subjects);
    });
  },
};

module.exports = subjectsController;