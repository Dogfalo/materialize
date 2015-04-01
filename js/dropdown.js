(function ($) {

  // Add posibility to scroll to selected option
  // usefull for select for example
  $.fn.scrollTo = function(elem) {
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top + $(elem).offset().top);
    return this;
  };

  $.fn.dropdown = function (option) {
    var defaults = {
      inDuration: 300,
      outDuration: 225,
      constrain_width: true, // Constrains width of dropdown to the activator
      hover: false,
      gutter: 0, // Spacing from edge
      belowOrigin: false
    }

    this.each(function(){
    var origin = $(this);
    var options = $.extend({}, defaults, option);

    // Dropdown menu
    var activates = $("#"+ origin.attr('data-activates'));

    function updateOptions() {
      if (origin.data('induration') != undefined)
        options.inDuration = origin.data('inDuration');
      if (origin.data('outduration') != undefined)
        options.outDuration = origin.data('outDuration');
      if (origin.data('constrainwidth') != undefined)
        options.constrain_width = origin.data('constrainwidth');
      if (origin.data('hover') != undefined)
        options.hover = origin.data('hover');
      if (origin.data('gutter') != undefined)
        options.gutter = origin.data('gutter');
      if (origin.data('beloworigin') != undefined)
        options.belowOrigin = origin.data('beloworigin');
    }

    updateOptions();

    // Attach dropdown to its activator
    if (origin.hasClass('select-dropdown')) {
      origin.after(activates)
    }
    else {
      origin.append(activates);
    }




    /*
      Helper function to position and resize dropdown.
      Used in hover and click handler.
    */
    function placeDropdown() {
      // Check html data attributes
      updateOptions();

      // Constrain width
      if (options.constrain_width == true) {
        activates.css('width', origin.outerWidth());
      }
      var offset = 0;
      if (options.belowOrigin == true) {
        offset = origin.height();
      }

      // Handle edge alignment
      var offsetLeft = origin.offset().left;

      var width_difference = 0;
      var gutter_spacing = options.gutter;


      if (offsetLeft + activates.innerWidth() > $(window).width()) {
        width_difference = origin.innerWidth() - activates.innerWidth();
        gutter_spacing = gutter_spacing * -1;
      }
      // If fixed placement
      if (Materialize.elementOrParentIsFixed(origin[0])) {
        activates.css({
          top: 0 + offset,
          left: 0 + width_difference + gutter_spacing
        });
      }
      // If relative placement
      else {

        activates.css({
          position: 'absolute',
          top: 0 + offset,
          left: 0 + width_difference + gutter_spacing
        });

      }

      // Show dropdown
      activates.stop(true, true).css('opacity', 0)
        .slideDown({
        queue: false,
        duration: options.inDuration,
        easing: 'easeOutCubic',
        complete: function() {
          $(this).css('height', '');
        }
      })
        .animate( {opacity: 1}, {queue: false, duration: options.inDuration, easing: 'easeOutSine'});


    }


    function hideDropdown() {
      activates.fadeOut(options.outDuration);
    }

    activates.on('hover', function(e) {
      e.stopPropagation();
    });

    // Hover
    if (options.hover) {
      origin.unbind('click.' + origin.attr('id'));
      // Hover handler to show dropdown
      origin.on('mouseenter', function(e){ // Mouse over
        placeDropdown();
      });

      origin.on('mouseleave', function(e){ // Mouse out
        activates.stop(true, true);
        hideDropdown();
      });

    // Click
    } else {
      var open = false;

      // Click handler to show dropdown
      origin.unbind('click.' + origin.attr('id'));
      origin.bind('click.'+origin.attr('id'), function(e){
        // Handles case for select plugin
        if (origin.hasClass('select-dropdown')) {
          return false;
        }
        if ( origin[0] == e.currentTarget && ($(e.target).closest('.dropdown-content').length === 0) ) {
          e.preventDefault(); // Prevents button click from moving window
          placeDropdown();
          open = true;

        }
        // If origin is clicked and menu is open, close menu
        else {
          if (open === true) {
            hideDropdown();
            $(document).unbind('click.' + activates.attr('id'));
            open = false;
          }
        }
        // If menu open, add click close handler to document
        if (open === true) {
          $(document).bind('click.'+ activates.attr('id'), function (e) {
            if (!activates.is(e.target) && !origin.is(e.target) && (!origin.find(e.target).length > 0) ) {
              hideDropdown();
              $(document).unbind('click.' + activates.attr('id'));
            }
          });
        }
      });

    } // End else

    // Listen to open and close event - useful for select component
    origin.on('open', placeDropdown);
    origin.on('close', hideDropdown);


   });
  }; // End dropdown plugin

  $(document).ready(function(){
    $('.dropdown-button').dropdown();
  });
}( jQuery ));
