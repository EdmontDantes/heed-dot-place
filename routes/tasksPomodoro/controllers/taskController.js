const Project = require('../../projects/models/Project');
const User = require('../../users/models/User');
const Task = require('../models/Task');

module.exports = {
  createTaskGet: (req, res) => {
    const projectParam = req.params.project;
    return res.render('task/create-task', { projectParam: projectParam });
  },
  createTaskPost: async (req, res) => {
  
    try {
      const { taskName, taskDescription } = req.body;
      if (!taskName) {
        req.flash('errors', 'Please provide Task\'s name this field is required');
        return res.redirect(301, `/api/users/projects/create-task/${req.params.project}`);
      }
      let currProject = await Project.findOne({ projectName: req.params.project });
      let currUser = await User.findOne({ _id: req.user._id});
      if(currProject.owner.toString() === currUser._id.toString()) {
        let newTask = new Task();
        if(!taskName && !taskDescription) {
          req.flash('errors', 'Your Project\'s Task has not been created because you didn\'t provide any input please try again');
          res.redirect(301, `/api/users/projects/tasks/create-task/${req.params.project}`);
        }
        if(taskName) newTask.taskName = taskName;
        if(taskDescription) newTask.taskDescription = taskDescription;
        newTask.owner = currUser._id;
        newTask.taskProjectBelongsTo = currProject._id;
  
        await newTask.save().then((savedTask) => {
          currProject.tasks.push({ task: savedTask._id});
          currProject.save().then((savedProject) => {
            console.log('0', savedProject)
          }).catch((err) => console.log(err));
          // console.log('1', currProject.tasks);
          // console.log('2', savedTask)
          return savedTask;

        }).then((savedTask) => {
          req.flash('messages', 'Your Task has been created successfully, we have redirected you to the task timer page, to find this task again use all projects then pick your Project and click on the task name you want to do');
          // return res.render('task/task-home', { projects: currProject, savedTask: savedTask }); 
          // return res.json({ confirmation: 'Success'})
          res.redirect(301, `/api/users/projects/tasks/create-task/${req.params.project}`);
        }).catch((error) => {
            req.flash('errors', 'We cannot save your provided Task at this moment please contact developer');
            res.redirect(301, `/api/users/projects/tasks/create-task/${req.params.project}`);
        })
      }
  
    } catch(error) {
      req.flash('errors', ' We couldn\'t create your Project\'s Task, Something is wrong on our end please contact developer or try again');
      res.redirect(301, `/api/users/projects/tasks/create-task/${req.params.project}`);
    }
    
    
  }
}