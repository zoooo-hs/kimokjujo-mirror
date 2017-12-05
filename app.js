var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var loginRouter = require('./routes/login-router');
var signupRouter = require('./routes/signup-router');
var newplanRouter = require('./routes/newplan-router');
var mainPageRouter = require('./routes/main-page-router');
var historyRouter = require('./routes/history-router');
var logoutRouter = require('./routes/logout-router');
var historiesRouter = require('./routes/histories-router');
var fundListRouter = require('./routes/fund-list-router');
var fundRouter = require('./routes/fund-router');
var actorTrendRouter = require('./routes/actor-trend-router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);
app.use('/signup', signupRouter);
app.use('/new-plan', newplanRouter);
app.use('/main', mainPageRouter);
app.use('/history', historyRouter);
app.use('/histories', historiesRouter);
app.use('/fund-list', fundListRouter);
app.use('/fund', fundRouter);
app.use('/actor-trend', actorTrendRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
