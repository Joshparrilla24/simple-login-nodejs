var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var sessVal = require('./sess');
var app = express();
var router = express.Router(); 
// router.use(bodyParser.json()); 
var index = require('./routes/home/index');
var users = require('./routes/registration');
var connection = require('./db/db_connect');
var renderer = require('./handler/renderer'); 
global.db = connection;

//api starts with /api
// app.use('/api', router);

// var userRepo = require('./repository/user');

// // API routes
// router.get('/user/:id', userRepo.ById);
// router.get('/users', userRepo.All);
// router.post('/user', userRepo.Add);
// router.put('/user/:id', userRepo.Update);
// router.delete('/user/:id', userRepo.Delete);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessVal));

app.get('/',index);
app.get('/signup',users.SignUp);
app.post('/signup',users.SignUp);
app.get('/login', users.Login);
app.post('/login', users.Login);
app.get('/home/dashboard', users.DashBoard);
app.get('/home/logout', users.Logout);
app.get('/home/profile', users.Profile);

app.use(renderer.notFoundError);
app.use(renderer.internalError);

module.exports = app;



