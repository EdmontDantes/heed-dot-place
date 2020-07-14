const router = require('express').Router();
const { Timer } = require('easytimer.js');
const timer = new Timer();

router.get('/', function(req, res, next) {
  // console.log(timer);
  let timerstart = timer.start({startValues: [0,0,0,0,0]});
  console.log(timerstart)
  res.render('main/home', { timer });
});



module.exports = router