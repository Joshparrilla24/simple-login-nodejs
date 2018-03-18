var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var message = '';
  res.render('index', {message: message, title: 'Express'});
});

module.exports = router;
