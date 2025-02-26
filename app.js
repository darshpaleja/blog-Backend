var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
require('dotenv').config()

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/blogCategory');
var blogRouter = require('./routes/blog');
var commentRouter = require('./routes/comment');
var bookmarkRouter = require('./routes/bookmark')
var likeRouter = require('./routes/likeRoutes')

var app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL , { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('connected to databasee');
})
.catch((err) => {
  console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/blog', blogRouter);
app.use('/comment', commentRouter);
app.use('/bookmark' , bookmarkRouter)
app.use('/like' , likeRouter)


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
