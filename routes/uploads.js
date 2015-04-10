var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Upload = require('../models/upload');

// add formidable & other utils for upload
var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');

/* GET /upload-image - display upload form */
router.get('/upload-image', function (req, res, next) {
    res.render('upload-image');
});

/* POST /upload-image - process file upload */
router.post('/upload-image', function (req, res, next) {
    var form = new formidable.IncomingForm();
    
    form.parse(req, function (err, fields, files) {
        
//        res.writeHead(200, {'content-type': 'text/plain'});
//        res.write('received upload:\n\n');
//        res.end(util.inspect({fields: fields, files: files}));
    });

    var title;
    
    form.on('field', function(name, value) {
        if (name == 'title') {
            title = value;
        }
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
                Upload.create({
                    title: title,
                    fileName: file_name
                }, function (err, Upload) {
                    if (err) {
                        console.log(err);
                        res.render('error', { error: err });
                    }
                    else {
                        console.log('Upload saved ' + Upload);
                        res.statusCode = 302
                        res.setHeader('Location', 'http://' + req.headers['host'] + '/uploads/gallery');
                        res.end();
                    }
                }); //end create    
            } //end else
        }); // end fs.copy
    }); // end form.on
}); // end post

/* GET /gallery - show upload gallery */
router.get('/gallery', function (req, res, next) {
    Upload.find(function (err, uploads) {
        if(err) {
            res.render('error', { error: err });
        }
        else {
            res.render('gallery', { uploads: uploads });
        }        
    });
});

module.exports = router;

