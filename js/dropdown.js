(function ($) {

  $.fn.dropdown = function (options) {
    var defaults = {
      constrain_width: true, // Constrains width of dropdown to the activator
      hover: true
    }

    options = $.extend(defaults, options);
    this.each(function(){
    var origin = $(this);
    
    // Dropdown menu
    var activates = $("#"+ origin.attr('data-activates'));
    activates.hide(0);

    // Move Dropdown menu to body. This allows for absolute positioning to work
    if ( !(activates.parent().is($('body'))) ) {
      activates.detach();
      $('body').append(activates);
    }


    /*    
      Helper function to position and resize dropdown.
      Used in hover and click handler.
    */    
    function placeDropdown() {
      if (options.constrain_width === true) {
        activates.css('width', origin.outerWidth());
      }
      activates.css('top', origin.offset().top);
      activates.css('left', origin.offset().left);
      activates.show({duration: 250, easing: 'easeOutCubic'});
    }
    function elementOrParentIsFixed(element) {
        var $element = $(element);
        var $checkElements = $element.add($element.parents());
        var isFixed = false;
        $checkElements.each(function(){
            if ($(this).css("position") === "fixed") {
                isFixed = true;
                return false;
            }
        });
        return isFixed;
    }

    if (elementOrParentIsFixed(origin[0])) {
      console.log('fixed it is');
      activates.css('position', 'fixed');
    }


    // Hover
    if (options.hover) {
      // Hover handler to show dropdown
      origin.on('mouseover', function(e){ // Mouse over
        placeDropdown();
      });
      
      // Document click handler        
      activates.on('mouseleave', function(e){ // Mouse out
        activates.hide({duration: 175, easing: 'easeOutCubic'});
      });

    // Click
    } else {
      var open = false;

      // Click handler to show dropdown
      origin.click( function(e){ // Click
        e.preventDefault(); // Prevents button click from moving window
        e.stopPropagation();
        placeDropdown();
        $(document).bind('click.'+ activates.attr('id'), function (e) {
          if (!activates.is(e.target) && (!origin.is(e.target))) {
            activates.hide({duration: 175, easing: 'easeOutCubic'});
            $(document).unbind('click.' + activates.attr('id'));
          }
        });
      });

    } // End else

    // Window Resize Reposition
    $(document).on('resize', function(){

    });
   });
  }; // End dropdown plugin
}( jQuery ));