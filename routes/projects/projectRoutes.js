const router = require('express').Router();
const { createProject, oneProjectByName } = require('./controllers/projectController');
const { isThereAuth } = require('../utils/isThereAuth');

router.get('/create-project', isThereAuth, (req, res) => {
  return res.render('project/create-project')
});

router.post('/create-project', isThereAuth, createProject);


router.get('/all-projects', isThereAuth, (req, res) => {
  return res.render('project/project-home')
});

router.get('/one-project/:name', isThereAuth, oneProjectByName)


module.exports = router