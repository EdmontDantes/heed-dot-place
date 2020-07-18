const router = require('express').Router();
const { createTaskGet, createTaskPost, taskHomeGet, taskHomePutOnePlusPomodoro, taskHomePutOnePlusPomodoroSBreak, taskHomePutOnePlusPomodoroLBreak, taskEditGet, taskEditPut } = require('./controllers/taskController')
const { isThereAuth } = require('../utils/isThereAuth');

// router.get('/', (req, res) => {
//   return res.json({ confirmation: 'Success'});
// })

router.get('/create-task/:project', isThereAuth, createTaskGet);

router.post('/create-task/:project', isThereAuth, createTaskPost);

router.get('/task-home/:TaskId', isThereAuth, taskHomeGet);

router.put('/add-pomodoro/:TaskId', isThereAuth, taskHomePutOnePlusPomodoro);

router.put('/add-pomodoro-short-break/:TaskId', isThereAuth, taskHomePutOnePlusPomodoroSBreak);

router.put('/add-pomodoro-long-break/:TaskId', isThereAuth, taskHomePutOnePlusPomodoroLBreak);

router.get('/edit-task/:TaskId', isThereAuth, taskEditGet);

router.put('/edit-task/:TaskId', isThereAuth, taskEditPut);

module.exports = router;