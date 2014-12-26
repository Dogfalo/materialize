(function ($) {

  $.fn.dropdown = function (options) {
    var defaults = {
      hover: true
    }

    options = $.extend(defaults, options);
    this.each(function(){
    var origin = $(this);
    
    // Dropdown menu
    var temp_activates = $("#"+ origin.attr('data-activates'));
    temp_activates.hide(0);

    // Move Dropdown menu to body. This allows for absolute positioning to work
    var activates = temp_activates.clone();
    $('body').append(activates);
    temp_activates.remove();

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