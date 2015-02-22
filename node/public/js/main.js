var gun = Gun('http://localhost:3000/gun').load('testing').path('rects');

gun.map(function(val, i) {
  console.log(val, i);
  //var elem = $('#mainBody').append('<div id="'+i+'" class="absolute" style="text-align: center;'+boxString(i)+rgbString(i)+'">'+json.rects[i].text+'</div>'); 
  var elem = $('#' + i).length? $('#' + i) : $('<div id="'+i+'" class="absolute">' + val.text +'</div>').appendTo('#mainBody'); 
  this.path('box').on(function(pos) {
    var css = boxString(pos);
    elem.css(css);
  });
  this.path('color').on(function(pos) {
    var css = rgbString(pos);
    elem.css(css);
  });
});

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
