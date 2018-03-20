var express = require('express');
var router = express.Router();
var user = require('./user');

router.get('/signup',user.SignUp);

module.exports = router;