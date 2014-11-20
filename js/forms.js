(function ($) {
   

  // Text based inputs
  var text_inputs = $('input[type=text], input[type=password], input[type=email]');  

  text_inputs.focus(function () {
    $(this).siblings('label').addClass('active');
  });

  text_inputs.blur(function () {
    if ($(this).val().length === 0) {
      $(this).siblings('label').removeClass('active');      
    }
  });


  // Range Input
  var range_input = $('input[type=range]');
  var range_mousedown = false;

  range_input.each(function () {
    var thumb = $('<span class="thumb"><span class="value"></span></span>');
    $(this).after(thumb);
  });

  range_input.on("mousedown", function() {
    range_mousedown = true;
  });
  range_input.on("mouseup", function() {
    range_mousedown = false;
  });

  range_input.on("mousemove", function(e) {
    if (range_mousedown) {
      var left = e.pageX - $(this).offset().left;
      var width = $(this).outerWidth();

      if (left < 0) {
        left = 0;
      }
      else if (left > width) {
        left = width;
      }
      console.log(left);
      $(this).siblings('.thumb').addClass('active').css('left', left);
      $(this).siblings('.thumb').find('.value').html($(this).val());      
    }
  });
  range_input.on("mouseout", function() {
    $(this).siblings('.thumb').removeClass('active');
  });


}( jQuery ));