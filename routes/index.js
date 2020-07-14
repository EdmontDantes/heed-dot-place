const router = require('express').Router();


router.get('/', function(req, res, next) {
  // console.log(timer);
  // let timerstart = timer.start({startValues: [0,0,0,0,0]});
  // console.log(timerstart)
  res.render('main/home');
});



module.exports = router