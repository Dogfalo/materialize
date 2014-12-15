(function ($) {

  $.fn.dropdown = function (options) {
    var defaults = {
      hover: true
    }

    options = $.extend(defaults, options);
    
    this.each(function(){
    

    var origin = $(this);
    
    var activates = $("#"+ origin.attr('data-activates')); // Dropdown menu

    activates.hide(0);


    if (defaults.hover) {
      // Click handler for list container
      origin.on('mouseover', function(e){ // Mouse over
        activates.css('width', origin.outerWidth());
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
        activates.show({duration: 200, easing: 'easeOutCubic'});
      });
      
      // Document click handler        
      activates.on('mouseleave', function(e){ // Mouse out
        activates.hide({duration: 175, easing: 'easeOutCubic'});
      });
      

      
    } else {
      var open = false;

      // Click handler for list container
      origin.click( function(e){ // Click
        e.preventDefault();
        e.stopPropagation();
        activates.css('width', origin.outerWidth());
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
        activates.show({duration: 200, easing: 'easeOutCubic'});

        $(document).bind('click.'+ activates.attr('id'), function (e) {
          if (!activates.is(e.target) && (!origin.is(e.target))) {
            activates.hide({duration: 175, easing: 'easeOutCubic'});
            $(document).unbind('click.' + activates.attr('id'));
          }

        });
      });
      
      
    }

    // Window Resize Reposition
    $(document).on('resize', function(){
      if (origin.is(':visible')) {
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
      }
    });
   }); 
  };
}( jQuery ));