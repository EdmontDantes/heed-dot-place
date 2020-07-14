module.exports = {
isThereAuth: (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.render('auth/unAuthorizedPage');
    // return res.redirect(301, '/');
  }
  next();
  }
}