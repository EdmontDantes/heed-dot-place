const Project = require('../models/Project');
const User = require('../../users/models/User')
module.exports = {
    createProject: async (req, res) => {
      try {
        const { projectName, projectIcon } = req.body;
        let comparingProjectName = await Project.findOne({ projectName: projectName });
        if(comparingProjectName) {
          req.flash('errors', 'Project name provided already exists please use another name');
          return res.redirect(301, 'project/create-project');
        }
        let currUser = await User.findOne({ _id: req.user._id});
        if(currUser) {
          let newProject = await new Project();
  
          if(projectName) newProject.projectName = projectName;
          if(projectIcon) newProject.projectIcon = projectIcon;
          newProject.owner = currUser._id;

          await newProject.save().then((createdProject) => {
            console.log(createdProject);
            req.flash('messages', 'You have successfully created your project')
            return res.redirect(301, '/') // this needs to change once task creation is introduced
          }).catch((error) => {
            req.flash('errors', 'We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
            res.redirect(301, '/api/users/projects/create-project');
          });
          
        } else if (!currUser) {
          req.flash('errors', 'You are probably trying to do something that was not in design of the site please contact developer')
          return res.redirect(301, 'project/create-project');
        }


      } catch (error) {
        req.flash('errors', 'We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
        res.redirect(301, '/api/users/projects/create-project');
      }
    },
    oneProjectByName: (req, res) => {
      Project.findOne({ projectName: req.param.projectName }).then((foundProject) => {
        console.log(foundProject);
        return res.render('project/one-project-home', {project: foundProject});
      });
    }
}