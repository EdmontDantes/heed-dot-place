const thereIsAuth = (req, res, next) => {
  if(req.isAuthenticated()) {
    return res.redirect(301, '/');
  }
  next();
}