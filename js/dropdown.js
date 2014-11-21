(function ($) {

  $.fn.dropdown = function (options) {
    var defaults = {
      hover: true
    }
    options = $.extend(defaults, options);

    var origin = $(this);    
  
    var activates = $("#"+ origin.attr('data-activates'));

    activates.hide(0);


    if (defaults.hover) {
      // Click handler for list container
      origin.on('mouseover', function(e){ // Mouse over
        activates.css('width', origin.innerWidth());
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
        activates.show({duration: 200, easing: 'easeOutCubic'});
      });
      
      // Document click handler        
      activates.on('mouseleave', function(e){ // Mouse out
        activates.hide({duration: 150, easing: 'easeOutCubic'});
      });
      

      
    } else {
      var open = false;

      // Click handler for list container
      origin.click( function(e){ // Mouse over
        e.preventDefault();
        activates.css('width', origin.innerWidth());
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
        activates.show({duration: 200, easing: 'easeOutCubic'});

        $(document).bind('click', function (e) {

          if (!activates.is(e.target) && !origin.is(e.target)) {
            activates.hide({duration: 150, easing: 'easeOutCubic'});
            $(document).unbind('click');
          }

        });
      });
      
      
    }

    // Window Resize Reposition
    $(window).on('resize', function(){
      if (origin.is(':visible')) {
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
      }
    });
    
  };
}( jQuery ));