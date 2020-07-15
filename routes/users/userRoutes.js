const router = require('express').Router();
const User = require('./models/User');
const passport = require('passport');
const { register, updateProfile, updatePassword } = require('./controllers/userController');
const { registerValidation, registerVerify } = require('./utils/registerValidation');
const { loginValidation, loginVerify } = require('./utils/loginValidation');
const { isThereAuth } = require('./utils/isThereAuth');

router.get('/', (req, res) => {
  return res.redirect('/');
});

router.get('/', (req, res) => {
  if(req.isAuthenticated()) {
    return res.redirect(301, '/');
  }
  return res.render('auth/register');
});

router.get('/login', (req, res) => {
  if(req.isAuthenticated()) {
    return res.redirect(301, '/');
  }
  return res.render('auth/login');
});

router.post('/login', loginValidation, loginVerify, passport.authenticate('local-login',{
  successRedirect:'/',
  failureRedirect:'/api/users/login',
  failureFlash:true
})
);

router.get('/register', (req, res) => {
  if(req.isAuthenticated()) {
    return res.redirect(301, '/');
  }
  return res.render('auth/register');
});

router.post('/register', registerValidation, registerVerify, register);


router.get('/profile', isThereAuth, (req, res) => {
  return res.render('auth/profile');
});

router.get('/update-profile', isThereAuth, (req, res) => {
  return res.render('auth/update-profile');
});

router.put('/update-profile', isThereAuth, updateProfile);



router.get('/logout',(req,res)=>{
  req.logout();

  req.session.destroy();
  return res.redirect('/')
});
module.exports = router