var express = require('express');
var router = express.Router();

/* GET home page. */  
  router.get('/', function(req, res, next) {
    res.render('main/index', { title: 'Express' });
  });
  router.get('/features', function(req, res, next) {
    res.render('main/features', { title: 'Express' });
  });
  router.get('/screenshots', function(req, res, next) {
    res.render('main/screenshots', { title: 'Express' });
  });
  router.get('/whomadethis', function(req, res, next) {
    res.render('main/whomadethis', { title: 'Express' });
  });
  router.get('/support', function(req, res, next) {
    res.render('main/support', { title: 'Express' });
  });
  router.get('/faq', function(req, res, next) {
    res.render('main/faq', { title: 'Express' });
  });
  router.get('/download', function(req, res, next) {
    res.render('main/download', { title: 'Express' });
  });
  router.get('/contactus', function(req, res, next) {
    res.render('main/contactus', { title: 'Express' });
  });
  router.get('/signup', function(req, res, next) {
    res.render('main/account/signup', { title: 'Express' });
  });
  router.get('/login', function(req, res, next) {
    res.render('main/account/login', { title: 'Express' });
  });
  router.get('/accountrecover', function(req, res, next) {
    res.render('main/account/accountrecover', { title: 'Express' });
  });
  router.get('/termsandconditions', function(req, res, next) {
    res.render('main/termsandconditions', { title: 'Express' });
  });
  router.get('/faq', function(req, res, next) {
    res.render('main/faq', { title: 'Express' });
  });
  







module.exports = router;
