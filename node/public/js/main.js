// var gun = Gun(location + 'gun').load('testing').path('rects');

var fire = new Firebase('https://shining-fire-1739.firebaseio.com/');

var json = {
  rects: {
    0: {
      box: {
        left: 0.0,
        top: 0.0,
        right: 1.0,
        bottom: 1.0
      },
      color: {
        r: 255,
        g: 255,
        b: 255
      }
    },
    1: {
    box: {
        left: 0.0,
        top: 0.0,
        right: 1,
        bottom: 0.1
      },
      color: {
        r: 100,
        g: 30,
        b: 200
      }
      // text: 'NAV BAR'
    },
    2: {
      box: {
        left: 0.1,
        top: 0.2,
        right: 0.3,
        bottom: 0.6
      },
      color: {
        r: 0,
        g: 150,
        b: 0
      }
      // text: 'hello there'
    },
    3: {
      box: {
        left: 0.4,
        top: 0.2,
        right: 0.6,
        bottom: 0.6
      },
      color: {
        r: 0,
        g: 150,
        b: 0
      }
      // text: 'hello there'
    },
    4: {
      box: {
        left: 0.7,
        top: 0.2,
        right: 0.9,
        bottom: 0.6
      },
      color: {
        r: 0,
        g: 150,
        b: 0
      }
      // text: 'hello there'
    }
  }
};

fire.set(json);

var temp = fire.child('rect/2/box/left');

console.log(temp);


// myDataRef.on('child_added', function(snapshot) {
//   //We'll fill this in later.
// });



// gun.map(function(val, i) {
//   console.log(val, i);
//   //var elem = $('#mainBody').append('<div id="'+i+'" class="absolute" style="text-align: center;'+boxString(i)+rgbString(i)+'">'+json.rects[i].text+'</div>'); 
//   var elem = $('#' + i).length? $('#' + i) : $('<div id="'+i+'" class="absolute">' + val.text +'</div>').appendTo('#mainBody'); 
//   this.path('box').on(function(pos) {
//     var css = boxString(pos);
//     elem.css(css);
//   });
//   this.path('color').on(function(pos) {
//     var css = rgbString(pos);
//     elem.css(css);
//   });
// });


var rgbString = function(color) {
  return {'background-color': 'rgb(' + color.r+','+color.g+','+color.b + ')'};
}
var boxString = function(box) {
  box.left*=100;
  box.top*=100;
  box.right*=100;
  box.bottom*=100;

  console.log(box);

  return {'margin-left': box.left+'%', 'margin-top': box.top+'%', 'width': (box.right-box.left)+'%', 'height': (box.bottom-box.top)+'%'};
}

$(document).on('click', '.absolute', function() {
  var clickedId = $(this).attr('id');
  // var currentRgb = json.rects[clickedId].color; //rgb array
  // var currentText = json.rects[clickedId].text;

  var newText = prompt("Change Text");

  if (newText) {
    gun.path(clickedId).set({text: newText});
    $('#'+clickedId).text(newText);
  }
  // alert('clickedId: ' + clickedId + '\ncurrentRgb: ' + currentRgb + '\ncurrentText: ' + currentText);
});
