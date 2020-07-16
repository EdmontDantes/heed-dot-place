const router = require('express').Router();
const { createTaskGet, createTaskPost } = require('./controllers/taskController')
const { isThereAuth } = require('../utils/isThereAuth');

// router.get('/', (req, res) => {
//   return res.json({ confirmation: 'Success'});
// })

router.get('/create-task/:project', isThereAuth, createTaskGet);

router.post('/create-task/:project', isThereAuth, createTaskPost);

module.exports = router;