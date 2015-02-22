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

function getRandomColor (i) {
  var allcolors = [
                  [255,255,255],
                  [0,0,0],
                  [26,188,156],
                  [46,204,113],
                  [52,152,219],
                  [155,89,182],
                  [241,196,15],
                  [230,126,34],
                  [231,76,60],
                  [52,73,9],
                  ]
  return allcolors[i];
  
  // return {
  //   r: Math.round(Math.random() * 255),
  //   g: Math.round(Math.random() * 255),
  //   b: Math.round(Math.random() * 255)
  // }
}

var active;
var darkcolors = ['rgb(0, 0, 0)', 'rgb(52, 73, 94)', 'rgb(231, 76, 60)', 'rgb(155, 89, 182)', 'rgb(52, 152, 219)'];
var blurredbgs = ["url('images/blur01.jpg')", 
                  "url('images/blur02.jpg')", 
                  "url('images/blur03.jpg')", 
                  "url('images/blur04.jpg')", 
                  "url('images/blur05.jpg')", 
                  "url('images/blur06.jpg')", 
                  "url('images/blur07.jpg')", 
                  "url('images/blur08.jpg')", 
                  "url('images/blur09.jpg')", 
                  ];
var randombg;

var json;
fire.child(siteid).once('value', function(snap) {
  json = snap.val();
  var rects = json.rects;
  var aspectRatio = json.aspectRatio;
  var currentRectId;

  // Set aspect ratio
  $('#mainBody').css({
    height: (100 / aspectRatio) + 'vw'
    // 'max-width': (100 * aspectRatio) + 'vh'
  });

  var rgbString = function(rectIndex) {
    var color = rects[rectIndex].color;
    var bg = rects[rectIndex].bg;
    if (!color && !bg) {
      color = getRandomColor(rectIndex);
      fire.child(siteid).child('rects').child(rectIndex).child('color').set(color);
    }
    if (bg) {
      return 'background-image: ' + bg + '; background-size: 100%;' ;
    }
    if (color) {
      return 'background-color: rgb(' + [color[0], color[1], color[2]].join(', ') + ');';
    }
  };

  var boxString = function(rectIndex) {
    var box = rects[rectIndex].box;
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
    $('#mainBody').append('<div id="'+i+'" class="absolute editable" style="'+boxString(i)+rgbString(i)+'">'+rect.text+'</div>');
  });

  // Click rect
  $('.absolute').click(function() {
    var clickedId = $(this).attr('id');
    currentRectId = clickedId;
    var currentRgb = rects[clickedId].color; //rgb array
    var currentText = rects[clickedId].text;

    console.log('click');
    active = $(this);
    $("#edit").fadeIn(200);


    // var newText = prompt("Change Text");
    // var newText = 

    // fire.child('rects').child(clickedId).child('text').set(newText);

    if (newText) {
      $('#'+clickedId).text(newText);
      // fire.child(json + '.' + clickedId)
    }
    // alert('clickedId: ' + clickedId + '\ncurrentRgb: ' + currentRgb + '\ncurrentText: ' + currentText);
  });
  $(".color").click(function(){
      var color = $(this).css("background-color");
      if(jQuery.inArray(color, darkcolors) != -1){
        active.css("color", "white");
      }
      else{
        active.css("color", "#222");
      }
      var colorArray = color.substring(4,color.length-1);
      colorArray=eval('[' + colorArray + ']');

      fire.child(siteid).child('rects').child(currentRectId).child('color').set(colorArray);
      fire.child(siteid).child('rects').child(currentRectId).child('bg').set(null);

      active.css("background-color", color);
      active.css('background-image', 'none');
  });

  $(".bgimage").click(function(){
      randombg = blurredbgs[Math.floor(blurredbgs.length * Math.random())];
      active.css('background-image', randombg);
      active.css('background-size', '100%');
      active.css("color", "white");

      fire.child(siteid).child('rects').child(currentRectId).child('bg').set(randombg);
      // fire.child(siteid).child('rects').child(currentRectId).child('background-size').set('100%');
      // fire.child(siteid).child('rects').child(currentRectId).child('color').set([255,255,255]);

  });

  $(".submit").click(function(){
    textVal = $('#newText').val();
    fire.child(siteid).child('rects').child(currentRectId).child('color').set(textVal);
    console.log(textVal);
    $("#edit").fadeOut(300);
  });
});

function stripQueryStringAndHashFromPath(url) {
  return url.split("?")[0].split("#")[0];
}

// 
// $(document).ready(function(){
    

//     $(".editable").click(function(){

//     });

    

// });