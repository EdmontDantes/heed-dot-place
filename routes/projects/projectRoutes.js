const router = require('express').Router();
const { createProjectGET, createProjectPOST, allProjects,  editOneProjectByNameGET, editOneProjectByNamePUT, deleteOneProjectById } = require('./controllers/projectController');
const { isThereAuth } = require('../utils/isThereAuth');

router.get('/create-project', isThereAuth, createProjectGET);

router.post('/create-project', isThereAuth, createProjectPOST);


router.get('/all-projects', isThereAuth, allProjects);

router.get('/edit-project/:name', isThereAuth, editOneProjectByNameGET);
router.put('/edit-project/:name', isThereAuth, editOneProjectByNamePUT);

router.delete('/delete-project/:projectId', isThereAuth, deleteOneProjectById)

module.exports = router