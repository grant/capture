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

var myURL = document.URL;
var siteid = stripQueryStringAndHashFromPath(myURL);

var json;
fire.child(siteid).once('value', function(snap) {
  json = snap.val();

  var rgbString = function(rectIndex) {
    return 'background-color: rgb(' + json[rectIndex].color.r+','+json[rectIndex].color.g+','+json[rectIndex].color.b+ ');';
  }

  var boxString = function(rectIndex) {
    var box = json[rectIndex].box;
    box.left*=100;
    box.top*=100;
    box.right*=100;
    box.bottom*=100;

    return 'margin-left:'+box.left+'%;margin-top:'+box.top+'%;width:'+(box.right-box.left)+'%;height:'+(box.bottom-box.top)+'%;';
  }
  console.log(json);
  $.each(json, function(i, val) {
    $('#mainBody').append('<div id="'+i+'" class="absolute" style="text-align: center;'+boxString(i)+rgbString(i)+'">'+json[i].text+'</div>');
  });

  $('.absolute').click(function() {
    var clickedId = $(this).attr('id');
    var currentRgb = json[clickedId].color; //rgb array
    var currentText = json[clickedId].text;

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
