const createError = require('http-errors');
const express = require('express');
const db = require('./model');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const listRoutes = require('./routes/listRoutes');
const healthCheckRoutes = require('./routes/healthRoutes');
const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
db.sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync")
})

// app.use('/', indexRouter);
app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/health', healthCheckRoutes);
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
