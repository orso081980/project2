// list dependencies
var express = require('express');
var router = express.Router();

// add db & model dependencies
var mongoose = require('mongoose');
var Product = require('../models/product');
var formidable = require('formidable');
var fs = require('fs-extra');
var util = require('util');

// interpret GET /products - show product listing */
router.get('/products', function (req, res, next) {

    // retrieve all products using the product model; returns either an error or list of products
    Product.find(function (err, products) {
        // if we have an error
        if (err) {
            res.render('error', { error: err });
        }
        else {
            // no error, show the views/products.jade and pass the query results to that view
            res.render('products', { products: products });
            console.log(products);
        }
    });
});

// GET intepret GET /products/edit/:id - show single product edit form */
router.get('/products/edit/:id', function (req, res, next) {
    //store the id from the url in a variable
    var id = req.params.id;

    //use the product model to look up the product with this id    
    Product.findById(id, function (err, product) {
        if (err) {
            res.send('Product ' + id + ' not found');
        }
        else {
            res.render('edit', { product: product });
        }
    });
});

// POST /products/edit/:id - update selected product */
router.post('/products/edit/:id', function (req, res, next) {
    var id = req.body.id;

    var product = {
        _id: req.body.id,
        venue: req.body.venue,
        day: req.body.selectpick,
        price: req.body.price,
        description: req.body.description,
        rating: req.body.rating,
        type: req.body.type
    };

    Product.update({ _id: id}, product, function(err) {
        if (err) {
            res.send('Product ' + req.body.id + ' not updated. Error: ' + err);
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/products');
            res.end();
        }
    });
});

// GET /products/add - show product input form
router.get('/products/add', function (req, res, next) {
    res.render('add');
});

// POST /products/add - save new product
router.post('/products/add', function (req, res, next) {

    console.log("hey...what's happening here...........")
    var title;
    console.log('inside post venue      ' +req.body.venue);

    var form = new formidable.IncomingForm();
    var productAdd;

    form.parse(req, function(err, fields, files) {

        productAdd = {
            venue: fields.venue,
            day: fields.selectpick,
            price: fields.price,
            description: fields.description,
            rating: fields.rating,
            uploadFilename: files.upload.name,
            type: fields.type 
        }
        console.log('inside the form parse===>' + productAdd);
    });
    
    form.on('end', function(fields, files) {

        var temp_path = this.openedFiles[0].path;
        
        var file_name = this.openedFiles[0].name;

        console.log('uploaded file ====>' + file_name);
        
        var new_location = 'public/uploads/'; 
        console.log(new_location + file_name);
        
        fs.copy(temp_path, new_location + file_name, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('upload successful....creating the product into the database');

                console.log('creating the product===>' + productAdd);
                // use the Product model to insert a new product
                Product.create(productAdd, function (err, Product) {
                    if (err) {
                        console.log(err);
                        res.render('error', { error: err }) ;
                    }
                    else {
                        console.log('Product saved ' + Product);
                        res.render('added', { product: Product.title });
                    }
                });
            }// end of else statement
        }); // end of copy
    });
});

// API GET products request handler
router.get('/api/products', function (req, res, next) {
    Product.find(function (err, products) {
        if (err) {
            res.send(err);
        } 
        else {
            res.send(products);
        }
    });
});

/* GET product delete request - : indicates id is a variable */    
router.get('/products/delete/:id', function (req, res, next) {
    //store the id from the url into a variable
    var id = req.params.id;

    //use our product model to delete
    Product.remove({ _id: id }, function (err, product) {
        if (err) {
            res.send('Product ' + id + ' not found');
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/products');
            res.end();
        }
    });
});

// POST /products/req - retrieve a row from database */


// make controller public
module.exports = router;