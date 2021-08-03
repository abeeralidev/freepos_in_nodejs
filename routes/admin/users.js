var express = require('express');
var router = express.Router();
// var users = require('../views/users.ejs')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("admin/users", { title: 'Express' });
});

module.exports = router;
