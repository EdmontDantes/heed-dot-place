
// this is middleware to create local variable of all the projects possibly needs optimization should the need arise
const Project = require('../models/Project');

module.exports = {
  getAllProjects: (req, res, next) => {
    Project.find({}, (err, projects) => {
      if(err) return next(err);
      res.locals.projects = projects;
      next();
    });
  }
}