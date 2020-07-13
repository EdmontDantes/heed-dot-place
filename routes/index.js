const router = require('express').Router();


router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // console.log('user', req.user);
  // console.log(req.session);
  if(req.user) {
    // res.send('Authorized Page');
    paginate(req, res, next);
    return;
  }
  res.render('main/home')
});


module.exports = router