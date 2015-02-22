var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Save the most recent image url
var mostRecentImage;
router.get('/upload', function (req, res) {
  mostRecentImage = req.body.imgUrl;
});

// Image
router.get('/poll', function (req, res) {
  if (mostRecentImage) {
    app.send({
      imgUrl: mostRecentImage
    });
  } else {
    app.send({});
  }
});

// Send the image rects
var rects;
router.post('/rects', function (req, res) {
  rects = req.body.rects;
});


module.exports = router;
