// var gun = Gun(location + 'gun').load('testing').path('rects');

var fire = new Firebase('https://shining-fire-1739.firebaseio.com/');

// var json = {
//   rects: {
//     0: {
//       box: {
//         left: 0.0,
//         top: 0.0,
//         right: 1.0,
//         bottom: 1.0
//       },
//       color: {
//         r: 255,
//         g: 255,
//         b: 255
//       }
//     },
//     1: {
//     box: {
//         left: 0.0,
//         top: 0.0,
//         right: 1,
//         bottom: 0.1
//       },
//       color: {
//         r: 100,
//         g: 30,
//         b: 200
//       }
//       // text: 'NAV BAR'
//     },
//     2: {
//       box: {
//         left: 0.1,
//         top: 0.2,
//         right: 0.3,
//         bottom: 0.6
//       },
//       color: {
//         r: 0,
//         g: 150,
//         b: 0
//       }
//       text: 'hello there'
//     },
//     3: {
//       box: {
//         left: 0.4,
//         top: 0.2,
//         right: 0.6,
//         bottom: 0.6
//       },
//       color: {
//         r: 0,
//         g: 150,
//         b: 0
//       }
//       text: 'hello there'
//     },
//     4: {
//       box: {
//         left: 0.7,
//         top: 0.2,
//         right: 0.9,
//         bottom: 0.6
//       },
//       color: {
//         r: 0,
//         g: 150,
//         b: 0
//       }
//       text: 'hello there'
//     }
//   }
// };

// fire.set(json);

var myURL = window.location.pathname;
var siteid = stripQueryStringAndHashFromPath(myURL);

function getRandomColor () {
  return {
    r: Math.round(Math.random() * 255),
    g: Math.round(Math.random() * 255),
    b: Math.round(Math.random() * 255)
  }
}

var json;
fire.child(siteid).once('value', function(snap) {
  json = snap.val();
  var rects = json.rects;
  var aspectRatio = json.aspectRatio;
  // Set aspect ratio
  $('#mainBody').css({
    height: (100 / aspectRatio) + 'vw',
    'max-width': (100 * aspectRatio) + 'vh'
  });

  var rgbString = function(rectIndex) {
    var color = rects[rectIndex].color;
    if (!color) {
      color = getRandomColor();
    }
    return 'background-color: rgb(' + [color.r, color.g, color.b].join(', ') + ');';
  };

  var boxString = function(rectIndex) {
    var box = rects[rectIndex];
    var x = box[0] * 100;
    var y = box[1] * 100;
    var width = box[2] * 100;
    var height = box[3] * 100;

    return [
      'margin-left:'+x+'%',
      'margin-top:'+y+'%',
      'width:'+width+'%',
      'height:'+height+'%;'
    ].join(';');
  };

  $.each(rects, function(i, rect) {
    if (!rect.text) {
      rect.text = '';
    }
    $('#mainBody').append('<div id="'+i+'" class="absolute" style="text-align: center;'+boxString(i)+rgbString(i)+'">'+rect.text+'</div>');
  });

  $('.absolute').click(function() {
    var clickedId = $(this).attr('id');
    var currentRgb = rects[clickedId].color; //rgb array
    var currentText = rects[clickedId].text;

    var newText = prompt("Change Text");

    fire.child('rects').child(clickedId).child('text').set(newText);

    if (newText) {
      $('#'+clickedId).text(newText);
      // fire.child(json + '.' + clickedId)
    }
    // alert('clickedId: ' + clickedId + '\ncurrentRgb: ' + currentRgb + '\ncurrentText: ' + currentText);
  });
});

function stripQueryStringAndHashFromPath(url) {
  return url.split("?")[0].split("#")[0];
}
