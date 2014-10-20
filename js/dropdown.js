(function ($) {
  $.fn.dropdown = function () {
    var origin = $(this);
    
  
    var activates = $("#"+ origin.attr('data-activates'));
    console.log(origin.offset());
    var topMargin = 5;
    activates.hide(0);

    
    // Click handler for list container
    origin.on('mouseover', function(e){ // Mouse over
      activates.css('width', origin.innerWidth());
      activates.css('top', origin.offset().top + topMargin);
      activates.css('left', origin.offset().left);
      activates.show(0, {queue: false});
    });
    
//    // Doucment click handler        
    origin.on('mouseout', function(e){ // Mouse out
          activates.hide(50, {queue: false});
    });
    
    
  };
}( jQuery ));