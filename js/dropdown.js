(function ($) {
  $.fn.dropdown = function () {
    var origin = $(this);
    
  
    var activates = $("#"+ origin.attr('data-activates'));

    activates.hide(0);

    
    // Click handler for list container
    origin.on('mouseover', function(e){ // Mouse over
      activates.css('width', origin.innerWidth());
      activates.css('top', origin.offset().top);
      activates.css('left', origin.offset().left);
      activates.show({duration: 200, easing: 'easeOutCubic'});
    });
    
    // Doucment click handler        
    activates.on('mouseleave', function(e){ // Mouse out
          activates.hide({duration: 150, easing: 'easeOutCubic'});
    });
    
    // Window Resize Reposition
    $(window).on('resize', function(){
      if (origin.is(':visible')) {
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
      }
    });
    
    
  };
}( jQuery ));