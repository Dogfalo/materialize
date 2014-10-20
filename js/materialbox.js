(function ($) {
  $.fn.materialbox = function () {
    var origin = $(this);
    var placeholder = $('<div></div>');
    
    origin.wrap(placeholder);
    origin.on('click', function(e){
      // Set positioning for placeholder
      origin.parent().css('width', origin.innerWidth());
      origin.parent().css('height', origin.innerHeight());
      origin.parent().css('top', origin.offset().top);
      origin.parent().css('left', origin.offset().left);
      // Animate image
      origin.css('position', 'fixed');
      origin.animate({ left: '50%'}, {duration: 200, queue: false});
      origin.animate({marginLeft: -1*origin.innerWidth()/2}, {duration:200, queue: false});
    });
  };
}( jQuery ));