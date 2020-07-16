
const Project = require('../models/Project');
const User = require('../../users/models/User');
const Task = require('../../tasksPomodoro/models/Task');
module.exports = {
    createProject: async (req, res) => {
      try {
        const { projectName, projectIcon } = req.body;
        console.log(projectName, projectIcon)
        //commented code is legacy code when projectName designed to be unique left for later, not needed anymore
            // let comparingProjectNameCreate = await Project.findOne({ projectName: projectName });
            // // console.log('1', comparingProjectNameCreate);
            // if(comparingProjectNameCreate) {
            //   req.flash('errors', 'Project name provided already exists please use another name');
            //   return res.redirect(301, '/api/users/projects/create-project');
            // }
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
      
      let currUser = await User.findOne({ _id: req.user._id});
      if(currUser) {
        await Project.find({ owner: currUser._id }, function(err, projects) {
          if (err) {
            req.flash('errors', 'We can\'t find your Projects in our database some error occurred contact developer')
            return res.redirect(301, '/');
          } else {
            return res.render('project/project-home', { projects: projects });
          }
        });
      }
    },
    // allProjects: async (req, res) => {
    //   try {

    //     let currUser = await User.findOne({ _id: req.user._id});
    //     if(currUser) {
    //       await Project.find({ owner: currUser._id }).populate('tasks').exec((err, tasksPopulated) => {
    //         if (err) {
    //           req.flash('errors', 'Populate We can\'t find your Projects in our database some error occurred contact developer')
    //           // return res.redirect(301, '/');
    //           return res.send('failed')
    //         } else {
    //           console.log(tasksPopulated);
    //           // return res.json({ tasksPopulated: tasksPopulated });
    //           return res.render('project/project-home', { projects: tasksPopulated });
    //         }
    //       })
        // function(err, projects) {
        //     if (err) {
        //       req.flash('errors', 'We can\'t find your Projects in our database some error occurred contact developer')
        //       return res.redirect(301, '/');
        //     } else {
        //       // console.log(projects);
        //       // let foundAllProjectsIds = [];

        //       // projects.forEach((element) => {
        //       //   foundAllProjectsIds.push(element._id)
        //       // });
        //       // console.log(foundAllProjectsIds);
        //       // for (let i = 0; i < foundAllProjectsIds.length; i++) {
                
        //       // }
        //       // let populatedArrayFromProjectIds = [];
        //       // for(const id of foundAllProjectsIds) {
        //       //   Task.findOne({ taskProjectBelongsTo: id }).then((foundTask) => {
        //       //     console.log(foundTask)
        //       //     populatedArrayFromProjectIds.push({ foundTask });
        //       //   }).catch(err => console.log(err));
        //       // }
        //       // console.log(populatedArrayFromProjectIds);
        //       // console.log(populatedArrayFromProjectIds);

        //       // console.log(projects)
        //       // Task.find({ owner: projects._id }, function(err, tasksToFindOwner) {
        //       //   if (err) {
        //       //     req.flash('errors', 'Populate We can\'t find your Projects in our database some error occurred contact developer')
        //       //     return res.redirect(301, '/');
        //       //   } else {
        //       //     console.log(tasksToFindOwner);
        //       //   }
                
        //       // }).populate('Task').exec((err, populatedTasks) => {
        //       //   if (err) {
        //       //     req.flash('errors', 'Populate We can\'t find your Projects in our database some error occurred contact developer')
        //       //     return res.redirect(301, '/');
        //       //   } else {
        //       //     console.log(tasksToFindOwner);
        //           // console.log(populatedTasks);
  
                  // return res.render('project/project-home', { projects: projects });
        //         }
                
        //       });
        //       req.flash('errors', ' We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
        //       res.redirect(301, '/');

        // }
      
  //     }
  //   } catch (error) {
  //     req.flash('errors', ' We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
  //           res.redirect(301, '/');
  //   }
  // },

    editOneProjectByNameGET: (req, res) => {
      Project.findOne({ projectName: req.params.name }).then((foundProject) => {
        // console.log(foundProject);
        return res.render('project/edit-project', { foundProjectToView: foundProject });
      }).catch((error) => {
        console.log('Edit Project Catch from findOne:',error);
        req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
        res.redirect(301, '/');
      });
    },

    editOneProjectByNamePUT: async (req, res) => {
      try {
        const { projectName, projectIcon } = req.body;
        //commented code is legacy code when projectName designed to be unique left for later, not needed anymore
        // console.log('0', req.body);
        // console.log('1', projectName, projectIcon);
        // let comparingProjectName = await Project.findOne({ projectName: projectName });
        // console.log('2', comparingProjectName);
        // if(comparingProjectName && (comparingProjectName.projectName === projectName)) {
        //   req.flash('errors', 'Project name provided already exists please use another name');
        //   return res.redirect(301, `/api/users/projects/edit-project/${req.params.name}`);
        // } else { }
        // console.log('2.a')
          let currUser = await User.findOne({ _id: req.user._id});
          console.log('3', currUser);
          if(currUser) {
            // console.log('4', comparingProjectName.owner);
            // console.log('5', currUser._id);
            let editFinallyTheProject = await Project.findOne({ projectName: req.params.name })
            console.log('6', editFinallyTheProject.projectName);
            if (editFinallyTheProject && (editFinallyTheProject.owner.toString() === currUser._id.toString())) {
              // if((projectName && !projectIcon) && (!projectName && projectIcon))
              if(projectName) editFinallyTheProject.projectName = projectName || editFinallyTheProject.projectName;
              if(projectIcon) editFinallyTheProject.projectIcon = projectIcon || editFinallyTheProject.projectIcon;
              if(!projectName && !projectIcon) {
                req.flash('messages', 'Your Project has not been updated because you didn\'t provide anything to change');
                res.redirect(301, '/api/users/projects/all-projects');
              }
              await editFinallyTheProject.save().then((savedEditedProject) => {
                console.log('7', savedEditedProject);
                req.flash('messages', 'Your Project have been successfully updated');
                res.redirect(301, '/api/users/projects/all-projects');
              }).catch((error) => {
                console.log('Saving edit results error for catch:', error);
                req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
                res.redirect(301, '/');
              });
            }
        }



        
      req.flash('errors', 'Nothing edited please contact developer')
      return res.redirect('/');

    } catch (error) {
      // console.log('try catch error from async EditOnePRoject:', error)
        req.flash('errors', 'We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
        res.redirect(301, `/api/users/projects/edit-project/${req.params.name}`);
    }
  }
}