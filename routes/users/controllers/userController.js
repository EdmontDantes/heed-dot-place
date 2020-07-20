const Project = require('../../projects/models/Project');
const User = require('../../users/models/User');
const Task = require('../../tasksPomodoro/models/Task');
const bcrypt = require('bcryptjs');
const moment = require('moment');


module.exports = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      let user = await User.findOne( { email });
  
      if(user) {
        req.flash('errors', 'User Already Exists');
        return res.redirect('/api/users/register');
      }
  
      user = await new User({  profile: { name: name }, email, password });
  
      await user.save();
      await req.flash('messages', 'You have successfully registered please login using your credentials')
      await res.redirect('/api/users/login');
    } catch (error) {
      req.flash('errors', 'We are sorry we couldn\'t register you at this moment please contact developer if error persists')
      return res.redirect(301, '/api/users/register');
    }
  },
  updateProfile: async (req, res) => {
      
    try {

      const { name, email, aboutme } = req.body; 
      console.log(name, email, aboutme)
        let compareFirstEmailWithAlreadyRegisteredUser = await User.findOne({ email })
        if(compareFirstEmailWithAlreadyRegisteredUser) {
          await req.flash('errors', 'You have inputted an email that is already registered with another user');
          await res.redirect(301, '/api/users/update-profile');
        }
        await User.findById({ _id: req.user._id }).then((userToUpdate) => {
          if(name) {
            userToUpdate.profile.name = name;
          }
          if(email) {
            userToUpdate.email = email;
          }
          if(aboutme) {
            userToUpdate.profile.about = aboutme;
          }
          return userToUpdate;
        }).then((userToUpdateNowSave) => {
          userToUpdateNowSave.save();
        }).catch(err => console.log(err));

            await req.flash('messages', 'You have successfully update your profile information')
            await res.redirect('/api/users/profile');
            
    } catch (error) {
      req.flash('errors', 'We are sorry something went wrong with your inputted data or on our end')
      return res.redirect(301, '/api/users/update-profile');
      // return res.status(500).json({ message: 'failed', error });
    }
    },

  updatePassword: async (req, res) => {

    try {

      const { currPassword, newPassword, verifyNewPassword } = req.body;
      await User.findOne({ _id: req.user._id }).then((userToUpdatePW) => {
        if( !currPassword || !newPassword || !verifyNewPassword) {
          req.flash('errors', 'If you want to update your Password Plese provide your current password and input twice the new one');
          return res.redirect(301, '/api/users/update-profile');
        } else if (newPassword !== verifyNewPassword) {
          req.flash('errors', 'Your new password doesn\'t match with second verification repeat one');
          return res.redirect(301, '/api/users/update-profile');
        } else {
          bcrypt
            .compare(currPassword, userToUpdatePW.password)
            .then((match) => {
              if (!match) {
                req.flash('errors', 'You have inputted incorrect current password please try again');
                return res.redirect(301, '/api/users/update-profile');
              } else {
                userToUpdatePW.password = newPassword;
                userToUpdatePW.save()
                              .then((userWUpdatedPW) => {
                                req.flash('messages', 'You have successfully updated your password please keep it safe');
                                return res.redirect(301, '/api/users/update-profile');
                              })
                              .catch((error) => {
                                console.log('this is save error', error)
                                req.flash('errors', 'Oh no something is wrong on our please contact the developer');
                                return res.redirect(301, '/api/users/update-profile');
                              });
              }
            })
            .catch((error) => {
              console.log('this is bcrypt catch error:', error)
              req.flash('errors', 'Oh no something is wrong on our end, we can\'t update your password at the moment, please contact the developer');
              return res.redirect(301, '/api/users/update-profile');
            });
        }
      })
    } catch (error) {
      console.log('try catch error:', error)
      req.flash('errors', 'Oh no something is wrong on our end, we can\'t update your password at the moment, please contact the developer');
      return res.redirect(301, '/api/users/update-profile');
    }
  },

  reportsHome: async (req, res) => {
    let currUser = await User.findOne( { _id: req.user._id });
    await Project.find({ owner: currUser._id }).populate('tasks.task').exec((err, results) => {
      if (err) {
        console.log('AAA',err);
      } else {
        // console.log(results[0].tasks)
        // return res.json({results});

        let someRandomVariable = true;
        let secondSomeRandomVariable = 'blah-blah';
        let thirdRandomVariable = 5;
        return res.render('main/home', { projectsForChartJsHomeReports: results, moment: moment, randomVar: someRandomVariable, scndRandomVar: secondSomeRandomVariable, thrdRandomVar: thirdRandomVariable });
  
      }
  
    })
  }
  
}