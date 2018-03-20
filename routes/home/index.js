var express = require('express');
var router = express.Router();
var callback = require('./home');

/* GET home page. */
router.get('/', callback.Index);

module.exports = router;
