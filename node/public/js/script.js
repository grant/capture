$(document).ready(function(){
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

    $(".editable").click(function(){
        active = $(this);
        $("#edit").fadeIn(200);
    });

    $(".color").click(function(){
        var color = $(this).css("background-color");
        if(jQuery.inArray(color, darkcolors) != -1){
          active.css("color", "white");
        }
        else{
          active.css("color", "#222");
        }
        active.css("background-color", color);
        active.css('background-image', 'none');
    });

    $(".bgimage").click(function(){
        var blurredbg = blurredbgs[Math.floor(blurredbgs.length * Math.random())];
        active.css('background-image', blurredbg);
        active.css('background-size', '100%');
        active.css("color", "white");
    });

    $(".submit").click(function(){
        $("#edit").fadeOut(300);
    });

});