var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Express' });
});
router.get('/download', function(req, res, next) {
  res.render('admin/download', { title: 'Express' });
});
router.get('/forum', function(req, res, next) {
  res.render('admin/forum', { title: 'Express' });
});
router.get('/team', function(req, res, next) {
  res.render('admin/team', { title: 'Express' });
});
router.get('/users', function(req, res, next) {
  res.render('admin/users', { title: 'Express' });
});
router.get('/blog', function(req, res, next) {
  res.render('admin/blog', { title: 'Express' });
});

module.exports = router;
