const router = require('express').Router();
const Project = require('../projects/models/Project');
const User = require('../users/models/User');

router.get('/', (req, res) => {
  return res.json({ confirmation: 'Success'});
})

router.get('/create-task/:project', (req, res) => {
  Project.findOne({ projectName: req.params.project }).then((foundProject) => {
    console.log(foundProject);
    // return res.json({ foundProject: foundProject });
    return res.render('task/create-task', { foundProjectToView: foundProject });
    // return res.render('project/edit-project', { foundProjectToView: foundProject });
  }).catch((error) => {
    // console.log('Edit Project Catch from findOne:',error);
    req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
    res.redirect(301, '/');
  });
});



module.exports = router;