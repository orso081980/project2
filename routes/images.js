var express = require('express');
var router = express.Router();

/* GET /upload-image - display upload form */
router.get('/upload-image', function (req, res, next) {
    res.render('upload-image');
});

module.exports = router;

