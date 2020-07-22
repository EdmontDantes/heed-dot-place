
const Project = require('../models/Project');
const User = require('../../users/models/User');
const Task = require('../../tasksPomodoro/models/Task');
const Category = require('../../categories/models/Category');
module.exports = {
  createProjectGET: async (req, res) => {
    try {
      let currUser = await User.findOne({ _id: req.user._id});
      if(currUser) {

        let allCategories = await Category.find({ owner: currUser._id });
        // console.log(allCategories)
        return res.render('project/create-project', { categoriesToChooseFromThatExistAlready: allCategories });
      }
    } catch (error) {
      req.flash('errors', 'Something is wrong');
      res.redirect(301, '/api/users/projects/all-projects');
    }
  },

  createProjectPOST: async (req, res) => {
      try {
        const { projectName, projectIcon, categoryNameDropDown, categoryName, categoryColor } = req.body;

        let currUser = await User.findOne({ _id: req.user._id});
        if(currUser) {
          if(!projectName && !categoryName && !categoryColor) {
            req.flash('errors', 'Your Project has not been created because you didn\'t provide data in all fields');
            res.redirect(301, '/api/users/projects/create-project');
          }

          let existingCategory = await Category.findOne({ categoryName: categoryNameDropDown, owner: currUser._id }).catch((error) => console.log(error));
          
          let newProject = await new Project();
          
          if(projectName) newProject.projectName = projectName;
          if(projectIcon) newProject.projectIcon = projectIcon;
          newProject.owner = currUser._id;
          if(existingCategory) {
            newProject.category = existingCategory._id;


            
          } else {
            let newCategory = await new Category();
            if(categoryName) newCategory.categoryName = categoryName;

            if(categoryColor) newCategory.categoryColor = categoryColor;

            
            if(currUser) newCategory.owner = currUser._id;
            await newCategory.save().then((savedCategory) => {
              newProject.category = savedCategory._id;
            }).catch((error) => {
              req.flash('errors', 'We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
              res.redirect(301, '/api/users/projects/create-project');
            });
          }
          await newProject.save().then((createdProject) => {
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
        console.log('catch try error')
        req.flash('errors', ' We couldn\'t create your Project Something is wrong on our end please contact developer or try again');
        res.redirect(301, '/api/users/projects/all-project');
      }
    },

    allProjects: async (req, res) => {
      try {
              let currUser = await User.findOne({ _id: req.user._id});
              if(currUser) {
                  let allCategories = await Category.find({ owner: currUser._id });
                  await Project.find({ owner: currUser._id }).populate('tasks.task').exec((err, results) => {
                    if (err) {
                      console.log(err);
                    } else {
                      return res.render('project/project-home', { projects: results, categories: allCategories });
                    }
                  })
              }
      } catch (error) {
        req.flash('errors', ' We couldn\'t Get your Projects Something is wrong on our end please contact developer or try again');
        res.redirect(301, '/');
      }
    },

    editOneProjectByIdGET: async (req, res) => {
      try {
        let currUser = await User.findOne({ _id: req.user._id});

        await Project.find({ _id: req.params.projectId, owner: currUser._id })
        .then((foundProjects) => {
          foundProjects.forEach((itemInFoundProjects) => {
            if(currUser && (itemInFoundProjects.owner.toString() === currUser._id.toString())) {
              Category.find({ owner: currUser._id }).then((foundAllCategories) => {
                return res.render('project/edit-project', { foundProjectToView: itemInFoundProjects, categoriesToChooseFromThatExistAlready: foundAllCategories });

              }).catch((error) => {
                req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
                res.redirect(301, '/');
              })
            }
          })

        }).catch((error) => {

          req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
          res.redirect(301, '/');
        });

      } catch (error) {

        req.flash('errors', 'We cannot get to edit-project page at this moment please contact developer');
        res.redirect(301, '/');
      }
    },

    editOneProjectByIdPUT: async (req, res) => {
      try {
        const { projectName, projectIcon, categoryNameDropDown } = req.body;

          let currUser = await User.findOne({ _id: req.user._id});

          if(currUser) {
            let existingCategory = await Category.findOne({ categoryName: categoryNameDropDown, owner: currUser._id }).catch((error) => console.log(error));
            await Project.find({ _id: req.params.projectId })
            .then((foundProjects) => {
              foundProjects.forEach((foundProject) => {


              if (currUser && (foundProject.owner.toString() === currUser._id.toString())) {

                if(projectName) foundProject.projectName = projectName || foundProject.projectName;
                if(projectIcon) foundProject.projectIcon = projectIcon || foundProject.projectIcon;
                if(existingCategory.categoryName) foundProject.category = existingCategory._id;
                if(!projectName && !projectIcon) {
                  req.flash('messages', 'Your Project has not been updated because you didn\'t provide anything to change except category');
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
        req.flash('errors', 'We couldn\'t edit your Project Something is wrong on our end please contact developer or try again');
        res.redirect(301, `/api/users/projects/edit-project/${req.params.name}`);
    }
  },

  deleteOneProjectById: async(req, res) => {
    try {
      let currUser = await User.findOne({ _id: req.user._id});
      let currProject = await Project.findOneAndRemove({ _id: req.params.projectId })
      if(currUser && (currProject.owner.toString() === currUser._id.toString())) { 
        await Task.deleteMany({ taskProjectBelongsTo: currProject._id });
        req.flash('errors', 'You have successfully deleted your project and its tasks')
        return res.redirect(301, '/api/users/projects/all-projects');
      }


    } catch(error) {
      req.flash('errors', 'We couldn\'t delete your Project Something is wrong on our end please contact developer or try again');
      res.redirect(301, `/api/users/projects/all-projects`);
    }
  }
}