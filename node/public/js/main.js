var json = {
  rects: [{
    box: {
      left: 0.0,
      top: 0.0,
      right: 1.0,
      bottom: 1.0,
    },
    color: [255,255,255]
  },{
    box: {
      left: 0.0,
      top: 0.0,
      right: 1,
      bottom: 0.1,
    },
    color: [100, 30, 200],
    text: 'NAV BAR'
  }, {
    box: {
      left: 0.1,
      top: 0.2,
      right: 0.3,
      bottom: 0.6,
    },
    color: [0, 150, 0],
    text: 'hello there'
  }, {
    box: {
      left: 0.4,
      top: 0.2,
      right: 0.6,
      bottom: 0.6,
    },
    color: [0, 150, 0],
    text: 'hello there'
  }, {
    box: {
      left: 0.7,
      top: 0.2,
      right: 0.9,
      bottom: 0.6,
    },
    color: [0, 150, 0],
    text: 'hello there'
  }],
}

var rgbString = function(rectIndex) {
  return 'background-color: rgb(' + json.rects[rectIndex].color[0]+','+json.rects[rectIndex].color[1]+','+json.rects[rectIndex].color[2] + ');';
}
var boxString = function(rectIndex) {
  var box = json.rects[rectIndex].box;
  box.left*=100;
  box.top*=100;
  box.right*=100;
  box.bottom*=100;

  return 'margin-left:'+box.left+'%;margin-top:'+box.top+'%;width:'+(box.right-box.left)+'%;height:'+(box.bottom-box.top)+'%;';
}

for (i=0; i<json.rects.length; i++) {
  $('#mainBody').append('<div id="'+i+'" class="absolute" style="text-align: center;'+boxString(i)+rgbString(i)+'">'+json.rects[i].text+'</div>'); 
}

$('.absolute').click(function() {
  var clickedId = $(this).attr('id');
  var currentRgb = json.rects[clickedId].color; //rgb array
  var currentText = json.rects[clickedId].text;

  var newText = prompt("Change Text");

  if (newText) {
    $('#'+clickedId).text(newText);
  }
  // alert('clickedId: ' + clickedId + '\ncurrentRgb: ' + currentRgb + '\ncurrentText: ' + currentText);
});
