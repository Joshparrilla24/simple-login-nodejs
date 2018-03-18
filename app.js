var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    sessVal = require('./sess');

var app = express();

// API routes
var router = express.Router();  
//api starts with /api
app.use('/api', router);

var connection = require('./db/db_connect');
var user = require('./models/user');



//API user get method
router.get('/users/:id',function(req, res, next){
  if(req.params.id){
    user.byId(req.params.id,function(err, rows){
      if(err){
        res.json(err);
      }
      res.json(rows);
    })
  }else{
    user.all(function(err, rows){
      if(err){
        res.json(err);
      }
      res.json(rows);
    });
  }
});

//API user post method
router.post('/user', function(req, res, next){
  user.add(req.body.user, function(err,count){
    console.log(req.body);
    if(err){
      res.json(err);
    }
    res.json(req.body.user);
  });

});

var index = require('./routes/index'),
    users = require('./routes/users');



// //test route
// router.get('/', function(req, res){
//   res.json({message: 'Welcome to our API'});
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessVal));


app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
