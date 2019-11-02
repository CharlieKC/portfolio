var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var bodyParser= require('body-parser')



var indexRouter = require('./routes/index');
var classifierRouter = require('./routes/classifier');
var poseRouter = require('./routes/pose')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(favicon('public/favicon_io/favicon.ico'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/classifier', classifierRouter)
app.use('/pose', poseRouter)


module.exports = app;
