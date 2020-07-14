const { check, validationResult } = require('express-validator');


const registerValidation = [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter email').isEmail(),
    check('password', 'Please include a valid password').isLength({min:6})
  ];

  const registerVerify = function(req, res, next) {
    const info = validationResult(req);
    if(!info.isEmpty()) {
        req.flash('errors', 'Invalid Name or Email or Password');
        return res.redirect('/api/users/register');
    }
    next();
}

  module.exports = { registerValidation, registerVerify };