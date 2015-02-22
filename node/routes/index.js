var express = require('express');
var router = express.Router();
var Firebase = require('firebase');
var fire = new Firebase('https://shining-fire-1739.firebaseio.com/');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Callback for image uploading
var cb;

// Save the most recent image url
// Example: POST /upload {
//   imgUrl: 'http://i.imgur.com/w3ydSZ0.jpg',
//   name: 'bunny'
// }
var mostRecentImage;
var mostRecentName;
router.post('/upload', function (req, res) {
  console.log('uploading');
  mostRecentImage = req.body.imgUrl;
  mostRecentName = req.body.name;
  (function(res){
    cb = function(rects) {
      var data = {
        name: mostRecentName,
        rects: rects
      };
      fire.child(mostRecentName).set(data);
      res.send(rects);
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

// Serve site
router.get('/:sitename', function (req, res) {
  var sitename = req.params.sitename;
  res.render('index');
});

module.exports = router;
