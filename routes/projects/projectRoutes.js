const router = require('express').Router();
const { createProject } = require('./controllers/projectController');
const { isThereAuth } = require('../utils/isThereAuth');

router.get('/create-project', isThereAuth, (req, res) => {
  return res.render('project/create-project')
});

router.post('/create-project', isThereAuth, createProject);



module.exports = router