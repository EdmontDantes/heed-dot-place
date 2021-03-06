const router = require('express').Router();
const { createProjectGET, createProjectPOST, allProjects,  editOneProjectByIdGET, editOneProjectByIdPUT, deleteOneProjectById } = require('./controllers/projectController');
const { isThereAuth } = require('../utils/isThereAuth');

router.get('/create-project', isThereAuth, createProjectGET);

router.post('/create-project', isThereAuth, createProjectPOST);


router.get('/all-projects', isThereAuth, allProjects);

router.get('/edit-project/:projectId', isThereAuth, editOneProjectByIdGET);
router.put('/edit-project/:projectId', isThereAuth, editOneProjectByIdPUT);

router.delete('/delete-project/:projectId', isThereAuth, deleteOneProjectById)

module.exports = router