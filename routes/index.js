var express = require('express');
var router = express.Router();

var sendHTML = require('../adapters/send-html').sendHTML;

/* GET home page. */
router.get('/', function(req, res, next) {
  sendHTML('main', res, next);
});

module.exports = router;
