const User = require('../models/User');

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
      return res.status(500).json({ message: 'failed', error });
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
    }
}