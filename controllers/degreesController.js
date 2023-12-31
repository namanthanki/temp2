// controllers/degreesController.js
const Degree = require('../models/Degree');
const University = require('../models/University');

const degreesController = {
  getAll: (req, res) => {
    Degree.getAll((err, degrees) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.render('degrees/index', { degrees });
    });
  },

  getDegreesByUniversity: (req, res) => {
    const { universityId } = req.query;

    Degree.getDegreesByUniversity(universityId, (err, degrees) => {
      if (err) {
        console.error('Error fetching degrees:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.setHeader('Content-Type', 'application/json');
      res.json(degrees);
    });
  },

  showForm: (req, res) => {
    University.getAllUniversities((err, universities) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.render('degrees/new', { universities });
    });
  },

  add: (req, res) => {
    console.log(req.body);
    const { degree_name, university_id } = req.body;
    if (!degree_name || !university_id) {
      res.status(400).send('Degree name and university are required');
      return;
    }

    Degree.add(degree_name, university_id, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Database error');
        return;
      }
      res.redirect('/degrees');
    });
  },
};

module.exports = degreesController;