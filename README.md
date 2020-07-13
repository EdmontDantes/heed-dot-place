# heed-dot-place
![heed.place logo](logo.png)
# Project&#39;s Name: heed.place

Description: a web app that utilizes pomodoro technique timer functionality with task management. Users will be able to utilize the web app for their needs of recording their tasks and using provided pomodoro technique timer to complete said tasks. Tasks will be created with Categories(in this case app will call it projects), full CRUD for Projects and it&#39;s corresponding tasks will be implemented. Each user will have their own data recording separate from others. Non registered users will be only able to utilize pomodoro timer with adding simple task name that will live in their cookies , once cookies are cleared their data is cleared as well, only registered users will have ability to record their data in the apps database.

# Technologies to be used:

- Bootstrap frontend framework - [https://getbootstrap.com/](https://getbootstrap.com/)
- Nodje.js javascript runtime - [https://nodejs.org/](https://nodejs.org/)
- Express javascript framework - [https://expressjs.com/](https://expressjs.com/)
- EJS embedded javascript template engine - [https://ejs.co/](https://ejs.co/)
- Passportjs authentication middleware for Nodje.js - [http://www.passportjs.org/](http://www.passportjs.org/)
  - Passport-local Strategy - [https://github.com/jaredhanson/passport-local](https://github.com/jaredhanson/passport-local)

- Bcryptjs for hashing/salting password for security - [https://github.com/dcodeIO/bcrypt.js/](https://github.com/dcodeIO/bcrypt.js/)
- Easytimer.js library for countdown/timer - [https://github.com/albert-gonzalez/easytimer.js](https://github.com/albert-gonzalez/easytimer.js)
- Chart.js for displaying progress reports to users via visual representation of data - [https://www.chartjs.org/](https://www.chartjs.org/)
- MongoDB document-based database - [https://www.mongodb.com/](https://www.mongodb.com/)
- Mongoose - elegant Mongodb object modeling for Node.js - [https://mongoosejs.com/](https://mongoosejs.com/)
- Connect-mongo npm package to use session and connect to database in session - [https://www.npmjs.com/package/connect-mongo](https://www.npmjs.com/package/connect-mongo)
- Express-Validator set of middleware for validating users&#39; login data and functions - [https://express-validator.github.io/docs/](https://express-validator.github.io/docs/)
- Connect-flash for messages display for users - [https://www.npmjs.com/package/connect-flash](https://www.npmjs.com/package/connect-flash)
- Express-session session middleware for cookies - [https://www.npmjs.com/package/express-session](https://www.npmjs.com/package/express-session)
- Momentjs for converting unixTimeStamps to Human-Readable time - [https://momentjs.com/](https://momentjs.com/)
- Method-override npm package to stay faithful to Restful API specification of GET, POST, PUT, DELETE http verbs - [https://www.npmjs.com/package/method-override](https://www.npmjs.com/package/method-override)

# Assets Used:
musical alert ringtones for end of pomodoro, short and long break sounds are generously created and provided by Wolf Asylum artist - https://wolfasylum.com/

# General Planned out Structure for the project :

## Express routes:

1. Base route &#39;/&#39; - renders main/index
2. Base route &#39;/api/users&#39;
3. &#39;/register&#39; get
4. &#39;/register&#39; post
5. &#39;/login&#39; get
6. &#39;/login&#39; post
7. &#39;/profile&#39; get
8. &#39;/update-profile&#39; get
9. &#39;/update-profile&#39; put
10. &#39;/update-password&#39; put
11. Base route &#39;/api/users/projects&#39;
12. &#39;/projects&#39; get
13. &#39;/create-project&#39; post
14. &#39;/update-project&#39; get
15. &#39;/update-project&#39; put
16. &#39;/delete-projects&#39; del
17. Base route &#39;/api/users/projects/tasks&#39;
18. &#39;/tasks&#39; get
19. &#39;/create-task&#39; post
20. &#39;/update-task&#39; put
21. &#39;/delete-task&#39; delete

### Total routes excluding base routes: 17

## DataBase Models:

1. Users
2. Projects
3. Tasks

### Total models referenced to each other: 3

# TimeTable for completing the project in 14 days:

Day 1. Scaffolding the project, with setting up all the files, building models, and basic route functionality.

Day 2. Build basic front end scaffolding with bootstrap front-end framework

Day 3. Build a basic users functionality implementing and testing with bootstrap front-end

Day 4. Build routes for profile, update-profile, update-password and test it

Day 5. Build projects routes

Day 6. Build front-end for projects and tasks

Day 7. Build tasks routes.

Day 8-10. Test extensively and focus on front-end functionality including aler

Day 11-12. Start working on implementing a new Reports feature inside of front-end and backend for using Chart.js visual representation of data of users.

Day 13-14. Finish Quality Control and Deploy for production on Heroku web hosting.