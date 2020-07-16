const router = require('express').Router();
const { createTaskGet, createTaskPost, taskHomeGet, taskHomePutOnePlusPomodoro } = require('./controllers/taskController')
const { isThereAuth } = require('../utils/isThereAuth');

// router.get('/', (req, res) => {
//   return res.json({ confirmation: 'Success'});
// })

router.get('/create-task/:project', isThereAuth, createTaskGet);

router.post('/create-task/:project', isThereAuth, createTaskPost);

router.get('/task-home/:TaskId', isThereAuth, taskHomeGet);

router.put('/add-pomodoro/:TaskId', isThereAuth, taskHomePutOnePlusPomodoro)

module.exports = router;