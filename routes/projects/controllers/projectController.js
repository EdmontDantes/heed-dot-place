
const Project = require('../models/Project');
const User = require('../../users/models/User');
const Task = require('../../tasksPomodoro/models/Task');
module.exports = {
    createProject: async (req, res) => {
      try {
        const { projectName, projectIcon } = req.body;

          if (!projectName) {
            req.flash('errors', 'Please provide project name this field is required');
            return res.redirect(301, '/api/users/projects/create-project');
          }
        let currUser = await User.findOne({ _id: req.user._id});
        console.log('2', currUser);
        if(currUser) {
          if(!projectName && !projectIcon) {
            req.flash('errors', 'Your Project has not been created because you didn\'t provide any input please try again');
            res.redirect(301, '/api/users/projects/create-project');
          }
          let newProject = await new Project();

          if(projectName) newProject.projectName = projectName;
          if(projectIcon) newProject.projectIcon = projectIcon;
          newProject.owner = currUser._id;

          await newProject.save().then((createdProject) => {
            // console.log(createdProject);
            req.flash('messages', 'You have successfully created your project')
            return res.redirect(301, '/api/users/projects/all-projects') 
          }).catch((error) => {
            req.flash('errors', 'We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
            res.redirect(301, '/api/users/projects/create-project');
          });
          
        } else if (!currUser) {
          req.flash('errors', 'You are probably trying to do something that was not in design of the site please contact developer')
          return res.redirect(301, '/api/users/projects/create-project');
        }

      } catch (error) {
        req.flash('errors', ' We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
        res.redirect(301, '/api/users/projects/create-project');
      }
    },

    allProjects: async (req, res) => {
      try {
              let currUser = await User.findOne({ _id: req.user._id});
              if(currUser) {
                  await Project.find({ owner: currUser._id }).populate('tasks.task').exec((err, results) => {
                    if (err) {
                      console.log(err);
                    } else {
                      return res.render('project/project-home', { projects: results });
                    }
                  })
              }
      } catch (error) {
        req.flash('errors', ' We couldn\'t Get your Projects Something is wrong on our end please contact developer or try again');
        res.redirect(301, '/');
      }
    },

    editOneProjectByNameGET: async (req, res) => {
      try {
        let currUser = await User.findOne({ _id: req.user._id});

        await Project.find({ projectName: req.params.name })
        .then((foundProjects) => {
          // console.log(foundProjects)
          foundProjects.forEach((itemInFoundProjects) => {
            if(currUser && (itemInFoundProjects.owner.toString() === currUser._id.toString())) { 
              return res.render('project/edit-project', { foundProjectToView: itemInFoundProjects });
            }
          }) 

        }).catch((error) => {

          req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
          res.redirect(301, '/');
        });

      }catch (error) {

        req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
        res.redirect(301, '/');
      }
    },

    editOneProjectByNamePUT: async (req, res) => {
      try {
        const { projectName, projectIcon } = req.body;

          let currUser = await User.findOne({ _id: req.user._id});

          if(currUser) {

            await Project.find({ projectName: req.params.name })
            .then((foundProjects) => {
              foundProjects.forEach((foundProject) => {


              if (currUser && (foundProject.owner.toString() === currUser._id.toString())) {

                if(projectName) foundProject.projectName = projectName || foundProject.projectName;
                if(projectIcon) foundProject.projectIcon = projectIcon || foundProject.projectIcon;
                if(!projectName && !projectIcon) {
                  req.flash('messages', 'Your Project has not been updated because you didn\'t provide anything to change');
                  res.redirect(301, '/api/users/projects/all-projects');
                }

                foundProject.save().then((savedEditedProject) => {

                  req.flash('messages', 'Your Project have been successfully updated');
                  res.redirect(301, '/api/users/projects/all-projects');
                }).catch((error) => {

                  req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
                  res.redirect(301, '/');
                });
              }
            
            })
        })
      }
    } catch (error) {
        req.flash('errors', 'We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
        res.redirect(301, `/api/users/projects/edit-project/${req.params.name}`);
    }
  }
}