$(document).ready(function(){
    var active;
    var darkcolors = ['rgb(0, 0, 0)', 'rgb(52, 73, 94)', 'rgb(231, 76, 60)', 'rgb(155, 89, 182)', 'rgb(52, 152, 219)'];

    $(".editable").click(function(){
        active = $(this);
        $("#edit").show();
    });

    $(".color").click(function(){
        var color = $(this).css("background-color");
        if(jQuery.inArray(color, darkcolors) != -1){
          active.css("color", "white");
        }
        else{
          console.log(color);
          active.css("color", "#222");
        }
        active.css("background-color", color);
    });

    $(".submit").click(function(){
        $("#edit").hide();
    });

});