const router = require('express').Router();
const Project = require('./models/Project');

router.get('/create-project', (req, res) => {
  return res.render('/project/create-project')
})



module.exports = router