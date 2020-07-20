const router = require('express').Router();


router.get('/', function(req, res, next) {
  if(req.isAuthenticated()) {
    req.flash('messages', 'You have succesfully logged in below is your Home / Reports page to see your statistics of progress, happy focus time');
    return res.redirect('/api/users/reports-home')
  }
  // console.log(timer);
  // let timerstart = timer.start({startValues: [0,0,0,0,0]});
  // console.log(timerstart)


  return res.render('main/home');
});



module.exports = router