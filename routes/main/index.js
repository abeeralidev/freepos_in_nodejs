var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('main/index', { title: 'Express' });
});
router.get('/about', function(req, res, next) {
  res.render('main/about', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
  res.render('main/contact', { title: 'Express' });
});
router.get('/download', function(req, res, next) {
  res.render('main/download', { title: 'Express' });
});
router.get('/forum', function(req, res, next) {
  res.render('main/forum', { title: 'Express' });
});
router.get('/services', function(req, res, next) {
  res.render('main/services', { title: 'Express' });
});
router.get('/team', function(req, res, next) {
  res.render('main/team', { title: 'Express' });
});
router.get('/users', function(req, res, next) {
  res.render('main/users', { title: 'Express' });
});
router.get('/', function(req, res, next) {
  res.render('main/index', { title: 'Express' });
});






module.exports = router;
