var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();

router.use(bodyParser.json());

var user = require('../models/user');

//API user get method by id
router.get('/user/:id',function(req, res, next){
  if(req.params.id){
    user.byId(req.params.id,function(err, rows){
      if(err){
        res.json(err);
      }
      res.json(rows);
    });
  }
});

// API user get all users 
router.get('/users',function(req,res, next){
  user.all(function(err, rows){
    if(err){
      res.json(err);
    }
    res.json(rows);
  });
});

//API user post method
router.post('/user', function(req, res, next){
  user.add(req.body.user, function(err,count){
    if(err){
      res.json(err);
    }
    res.json(req.body.user);
  });
});

//API user update
router.put('/user/:id', function(req, res, next){
  if(req.params.id){
    user.update(req.params.id,req.body.user,function(err, rows){
      if(err){
        res.json(err);
      }
      res.json(rows);
    });
  }
});

//API user delete
router.delete('/user/:id', function(req, res, next){
  if(req.params.id){
    user.delete(req.params.id,function(err,count){
      if(err){
        res.json(err);
      }
      res.json(count);
    });
  }
});

module.exports = router;