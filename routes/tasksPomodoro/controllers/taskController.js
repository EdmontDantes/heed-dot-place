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
        let newTask = await new Task();


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
          }).catch((err) => console.log(err));
          return savedTask;

        }).then((savedTask) => {

          req.flash('messages', 'Your Task has been created successfully, we have redirected you to the task timer page, to find this task again use all projects then pick your Project and click on the task name you want to do');
          res.redirect(301, `/api/users/projects/tasks/task-home/${savedTask._id}`);

        }).catch((error) => {
            req.flash('errors', 'We cannot save your provided Task at this moment please contact developer');
            res.redirect(301, `/api/users/projects/tasks/create-task/${req.params.project}`);
        })
      }

    } catch(error) {
      req.flash('errors', ' We couldn\'t create your Project\'s Task, Something is wrong on our end please contact developer or try again');
      res.redirect(301, `/api/users/projects/tasks/create-task/${req.params.project}`);
    }
  },

  taskHomeGet: async (req, res) => {
    try {
      
      await Task.findOne({ _id: req.params.TaskId }).then((foundTask) => {
        return res.render('task/task-home', { foundTaskToView: foundTask });
      }).catch((error) => {
  
        req.flash('errors', 'We cannot get to Task Timer page at this moment please contact developer');
        res.redirect(301, '/');
      });

    } catch (error) {
      req.flash('errors', 'We cannot get to Task Timer page at this moment please contact developer');
      res.redirect(301, '/');
    }
  },

  taskHomePutOnePlusPomodoro: async (req, res) => {

    try {
      let currTask = await Task.findOne({ _id: req.params.TaskId });
      let currUser = await User.findOne({ _id: req.user._id});
      if(currTask.owner.toString() === currUser._id.toString()) {
        currTask.pomodorosDone += 1;
        await currTask.save().then((savedCurrTask) => {
          req.flash('messages', 'You have saved your progress of your pomodoro in your user records successfully');
          res.redirect(301, `/api/users/projects/tasks/task-home/${req.params.TaskId}`);
        })
      }

    } catch (error) {
      req.flash('errors', 'We cannot get to Task Timer page at this moment please contact developer');
      res.redirect(301, '/');
    }
  },

  taskHomePutOnePlusPomodoroSBreak: async (req, res) => {

    try {
      let currTask = await Task.findOne({ _id: req.params.TaskId });
      let currUser = await User.findOne({ _id: req.user._id});
      if(currTask.owner.toString() === currUser._id.toString()) {
        currTask.pomodoroShortBreakDone += 1;
        await currTask.save().then((savedCurrTask) => {
          req.flash('messages', 'You have saved your progress of your pomodoro short break in your user records successfully');
          res.redirect(301, `/api/users/projects/tasks/task-home/${req.params.TaskId}`);
        })
      }
    } catch (error) {
      req.flash('errors', 'We cannot get to Task Timer page at this moment please contact developer');
      res.redirect(301, '/');
    }
  },

  taskHomePutOnePlusPomodoroLBreak: async (req, res) => {

    try {
      let currTask = await Task.findOne({ _id: req.params.TaskId });
      let currUser = await User.findOne({ _id: req.user._id});
      if(currTask.owner.toString() === currUser._id.toString()) {
        currTask.pomodoroLongBreakDone += 1;
        await currTask.save().then((savedCurrTask) => {
          req.flash('messages', 'You have saved your progress of your pomodoro long break in your user records successfully');
          res.redirect(301, `/api/users/projects/tasks/task-home/${req.params.TaskId}`);
        })
      }
    } catch (error) {
      req.flash('errors', 'We cannot get to Task Timer page at this moment please contact developer');
      res.redirect(301, '/');
    }
  },

  taskEditGet: async (req, res) => {
    try {
      let currTask = await Task.findOne({ _id: req.params.TaskId });
      let currUser = await User.findOne({ _id: req.user._id});
      if(currTask.owner.toString() === currUser._id.toString()) {
      let currProject = await Project.findOne({ _id: currTask.taskProjectBelongsTo});
            return res.render('task/edit-task', { foundTaskToEdit: currTask, foundTaskBelongsToProject: currProject});
      }
    } catch (error) {
      req.flash('errors', 'We cannot get to Task Edit page at this moment please contact developer');
      res.redirect(301, '/');
    }
  },

  taskEditPut: async (req, res) => {
    try {
      const {taskName, taskDescription} = req.body;
      let currTask = await Task.findOne({ _id: req.params.TaskId });
      let currUser = await User.findOne({ _id: req.user._id});
      if(currTask.owner.toString() === currUser._id.toString()) {
        if(taskName) currTask.taskName = taskName || currTask.taskName;
        if(taskDescription) currTask.taskDescription = taskDescription || currTask.taskDescription;
        if(!taskName && !taskDescription) {
          req.flash('messages', 'Your Task has not been updated because you didn\'t provide anything to change');
          res.redirect(301, `/api/users/projects/tasks/edit-task/${req.params.TaskId}`);
        }
        await currTask.save().then((savedCurrTask) => {
          req.flash('messages', 'You have successfully edited your task information');
          res.redirect(301, `/api/users/projects/tasks/task-home/${req.params.TaskId}`);
        })
      }
    } catch (error) {
      req.flash('errors', 'We cannot get to Task Edit page at this moment please contact developer');
      res.redirect(301, '/');
    }
  },

  deleteOneTaskById: async(req, res) => {
    try {

      let currUser = await User.findOne({ _id: req.user._id});
      let currTask = await Task.findOneAndRemove({ _id: req.params.TaskId });

      if(currUser && (currTask.owner.toString() === currUser._id.toString())) { 
        await Project.findOne({ _id: currTask.taskProjectBelongsTo }).then((foundProject) => {
          for(let i = 0; i < foundProject.tasks.length; i++) {
            if(foundProject.tasks[i].task.toString() === currTask._id.toString()) {
              foundProject.tasks.splice(i, 1);

            }
          }
          foundProject.save();
        })
        req.flash('errors', 'You have successfully deleted your task and its tasks');
        return res.redirect(301, '/api/users/projects/all-projects');
      }

    } catch(error) {
      req.flash('errors', 'We couldn\'t delete your Task Something is wrong on our end please contact developer or try again');
      res.redirect(301, `/api/users/projects/all-projects`);
    }
  }
}