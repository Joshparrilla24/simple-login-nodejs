var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    sessVal = require('./sess');

var app = express();

var router = express.Router(); 
router.use(bodyParser.json()); 

//api starts with /api
app.use('/api', router);
var connection = require('./db/db_connect');
global.db = connection;

var userRepo = require('./repository/user');

// // API routes
// router.get('/user/:id', userRepo.ById);
// router.get('/users', userRepo.All);
// router.post('/user', userRepo.Add);
// router.put('/user/:id', userRepo.Update);
// router.delete('/user/:id', userRepo.Delete);

var index = require('./routes/home/index'),
    users = require('./routes/signup/users');

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

app.use('/', index);
app.use(users);

var renderer = require('./handler/renderer'); 

app.use(renderer.notFoundError);
app.use(renderer.internalError);

module.exports = app;



