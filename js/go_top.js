(function($){

  $.fn.go_top = function(params){
    var defaults = {
      "top":200,
      "in":200,
      "out":200,
      "duration":400,
    };

    var options = jQuery.extend(defaults, params);
    var go_top = $(this);

    go_top.css({
      "position":"fixed",
      "bottom":"1em",
      "right":"1em",
      "width":"50px",
      "height":"50px",
      "text-decoration":"none",
      "display":"none"
    });

    /*go_top.hover(function(){
      $(this).css({
        "background":"url('imgs/up2.png') no-repeat",
        "background-size":"contain"
      });
    },function(){
      $(this).css({
        "background":"url('imgs/up1.png') no-repeat",
        "background-size":"contain"
      });
    });*/

    $(window).scroll(function() {
      if ($(this).scrollTop() > options.top) {
        go_top.fadeIn(options.in);
      } else {
        go_top.fadeOut(options.out);
      }
    });

    return go_top.click(function(event) {
      event.preventDefault();
      $('html, body').animate({scrollTop: 0}, options.duration);
    });
  };

}( jQuery ));
