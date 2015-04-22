var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// add formidable
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
//Other stuff
var routes = require('./routes/index');
var users = require('./routes/users');
var uploads = require('./routes/uploads');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// file upload formidable
app.post('/upload', function (req, res) {
    var form = new formidable.IncomingForm();
    
    
    form.parse(req, function (err, fields, files) {
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
    });

    form.on('end', function(fields, files) {
        var temp_path = this.openedFiles[0].path;
        
        var file_name = this.openedFiles[0].name;
        
        var new_location = 'public/images/'; 
        console.log(new_location + file_name);
        
        fs.copy(temp_path, new_location + file_name, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('success');
            }
        });
    }); 
});

// show upload form
app.get('/upload', function (req, res) {
    res.render('upload');
});

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/images/logo.svg'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
//formidable try to add to add
app.use('/uploads', uploads)

// db 
var mongoose = require('mongoose');
mongoose.connect('mongodb://orsacchiotto80@hotmail.com:18081980Mr@ds061751.mongolab.com:61751/heroku_app35620707');


// tell the application which route / controller to use for product requests
var products = require('./routes/products');
app.use('/', products);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
