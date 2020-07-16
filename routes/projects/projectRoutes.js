const router = require('express').Router();
const { createProject, allProjects,  editOneProjectByNameGET, editOneProjectByNamePUT } = require('./controllers/projectController');
const { isThereAuth } = require('../utils/isThereAuth');

router.get('/create-project', isThereAuth, (req, res) => {
  return res.render('project/create-project');
});

router.post('/create-project', isThereAuth, createProject);


router.get('/all-projects', isThereAuth, allProjects);

router.get('/edit-project/:name', isThereAuth, editOneProjectByNameGET);
router.put('/edit-project/:name', isThereAuth, editOneProjectByNamePUT);

module.exports = router