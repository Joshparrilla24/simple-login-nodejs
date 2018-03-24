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
var index = require('./routes/home/index');
var registration = require('./routes/registratioin/index');
var userLogin = require('./routes/session/login/index');
var userLogout = require('./routes/session/logout/index');
var userDash = require('./routes/dashboard/index');
var userProf = require('./routes/profile/index');
var connection = require('./db/db_connect');
var renderer = require('./handler/renderer'); 
global.db = connection;

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
app.get('/signup', registration.SignUp);
app.post('/signup', registration.SignUp);
app.get('/login', userLogin.Login);
app.post('/login', userLogin.Login);
app.get('/home/logout', userLogout.Logout);
app.get('/home/dashboard', userDash.DashBoard);
app.get('/home/profile', userProf.Profile);

app.use(renderer.notFoundError);
app.use(renderer.internalError);

module.exports = app;



