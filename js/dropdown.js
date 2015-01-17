(function ($) {

  $.fn.dropdown = function (options) {
    var defaults = {
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Constrains width of dropdown to the activator
      hover: true
    }

    options = $.extend(defaults, options);
    this.each(function(){
    var origin = $(this);

    // Dropdown menu
    var activates = $("#"+ origin.attr('data-activates'));

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
      var dropdownRealHeight = activates.height();
      if (options.constrain_width === true) {
        activates.css('width', origin.outerWidth());
      }
      if (elementOrParentIsFixed(origin[0])) {
        activates.css({
          display: 'block',
          position: 'fixed',
          height: 0,
          top: origin.offset().top - $(window).scrollTop(),
          left: origin.offset().left
        });
      }
      else {
        activates.css({
          display: 'block',
          top: origin.offset().top,
          left: origin.offset().left,
          height: 0
        });
      }
      activates.velocity({opacity: 1}, {duration: options.inDuration, queue: false, easing: 'easeOutQuad'})
      .velocity(
      {
        height: dropdownRealHeight
      },
      {duration: options.inDuration,
        queue: false,
        easing: 'easeOutCubic',
        complete: function(){
          activates.css('overflow-y', 'auto')
        }
      });
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




    // Hover
    if (options.hover) {
      // Hover handler to show dropdown
      origin.on('mouseover', function(e){ // Mouse over
        placeDropdown();
      });

      // Document click handler
      activates.on('mouseleave', function(e){ // Mouse out
        activates.velocity(
          {
            opacity: 0
          },
          {
            duration: options.outDuration,
            easing: 'easeOutQuad',
            complete: function(){
              activates.css({
                display: 'none',
                'overflow-y': ''
              });
            }
          });
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
            activates.velocity({
              opacity: 0
            },
            {
              duration: options.outDuration,
              easing: 'easeOutQuad',
              complete: function(){
                activates.css({
                  display: 'none',
                  'overflow-y': ''
                });
              }
            });
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