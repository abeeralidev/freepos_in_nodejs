var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');


var indexRouter = require('./routes/main/index');
var usersRouter = require('./routes/main/users');
var forumRouter = require('./routes/main/forum');
var teamRouter = require('./routes/main/team');
var downloadRouter = require('./routes/main/download');

var adminindexRouter = require('./routes/admin/index');
var admindownloadRouter = require('./routes/admin/download');
var adminforumRouter = require('./routes/admin/forum');
var adminteamRouter = require('./routes/admin/team');
var adminusersRouter = require('./routes/admin/users');

const port = 8015



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressLayouts);


app.use('/', indexRouter);
app.use('/download', downloadRouter);
app.use('/forum', forumRouter);
app.use('/team', teamRouter);
app.use('/users', usersRouter);

app.use('/admin', adminindexRouter);
app.use('/admin/download', admindownloadRouter);
app.use('/admin/forum', adminforumRouter);
app.use('/admin/team', adminteamRouter);
app.use('/admin/users', adminusersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})