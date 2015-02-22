var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Callback for image uploading
var cb;

// Save the most recent image url
// Example: POST /upload { imgUrl: `http://i.imgur.com/w3ydSZ0.jpg` }
var mostRecentImage;
router.post('/upload', function (req, res) {
  console.log('uploading');
  mostRecentImage = req.body.imgUrl;
  (function(res){
    cb = function(rects) {
      res.send(rects);
      console.log('done');
    };
  })(res);
});

// Image
router.get('/poll', function (req, res) {
  if (mostRecentImage) {
    res.send({
      imgUrl: mostRecentImage
    });
    mostRecentImage = null;
  } else {
    res.send({});
  }
});

// Send the image rects
var rects;
router.post('/rects', function (req, res) {
  rects = JSON.parse(req.body.data);
  cb(rects);
  res.send('good');
});

module.exports = router;
