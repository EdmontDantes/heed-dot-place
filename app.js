// bring all the packages via 
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
let MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const passport = require('passport');
const methodOverride = require('method-override');


// bring passport strategy
require('./lib/passport');

// bring in dotenv variables package all of these variables are stored in .env root dir
require('dotenv').config();

// declare fallback port or use env port first
const port = process.env.PORT || 3000;

//get all Projects by bringing Project Model and utils middleware
const Project = require('./routes/projects/models/Project'); // this one is extra line that is just in case if our middleware fails to look model in it from itself
const { getAllProjects } = require('./routes/projects/utils/getAllProjects');

// connect to mongoDB via mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('Mongodb Connected');
  })
  .catch((err) => console.log(`Mongo err: ${err}`));

// bring it route controllers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users/userRoutes');
const usersProjectsRouter = require('./routes/projects/projectRoutes');
const usersTasksRouter = require('./routes/tasks/taskRoutes');




// declare usage of express framework
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// bring in Morgan installed as Developer package should be deleted for production later
app.use(morgan('dev'));

// use json configuration for express framework
app.use(express.json());
app.use(express.urlencoded(
  { extended: false }
));

// bring in cookie parser
app.use(cookieParser());

// use public dir via path
app.use(express.static(path.join(__dirname, 'public')));

// use method-override package to modify use of http verbs in html forms
app.use(methodOverride('_method'));

// use getAllProjects utils middleware declared above
app.use(getAllProjects);

// use session setup here
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
      url: process.env.MONGO_URI,
      mongooseConnection: mongoose.connection,
      autoReconnect: true,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000}
  })
);

// use connect-flash package for displaying messages in views
app.use(flash());

// use passport to initialize and session on passport middleware to modify session
app.use(passport.initialize());
app.use(passport.session());

// declare local variables to be used globally throughout the application
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.errors = req.flash('errors');
  res.locals.perrors = req.flash('perrors');
  res.locals.messages = req.flash('messages');
  res.locals.success = req.flash('success');
  next();
});


// base routes

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/users/projects', usersProjectsRouter);
app.use('api/users/projects/tasks', usersTasksRouter);

// app.use((req, res, next) => {
//   if(req.accepts('html')) {
//     return res.render('main/404page')
//   }
//   next()
// });

// log out the listening port on which app is running
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
