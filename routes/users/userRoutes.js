const router = require('express').Router();
const User = require('./models/User');
const passport = require('passport');
const { registerValidation, registerVerify } = require('./utils/registerValidation');
const { loginValidation, loginVerify } = require('./utils/loginValidation');
const { Timer } = require('easytimer.js');
const timerInstance = new Timer();

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

router.post('/login', passport.authenticate('local-login',{
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

router.post('/register', registerValidation, registerVerify, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne( { email });

    if(user) {
      req.flash('errors', 'User Already Exists');
      return res.redirect('/api/users/register');
    }

    user = await new User({  profile: { name }, email, password });

    await user.save();
    await req.logIn(user, (err) => {
      if(err) {
        return res.status(400).json({ confirmation: false, message: err });
      } else {
        next ()
      }
    })
  } catch (error) {
    return res.status(500).json({ message: 'failed', error });
  }
});

router.get('/logout',(req,res)=>{
    req.logout();
  
    req.session.destroy()
    return res.redirect('/')
});

module.exports = router