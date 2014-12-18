(function ($) {
    
    var newTooltip;
    var timeout;
    var counter;
    var started;
    var counterInterval;
    $.fn.tooltip = function (options) {
      var margin = 5;
      started = false;

      // Defaults
      var defaults = {
        delay: 350
      }
      options = $.extend(defaults, options);
      
      return this.each(function(){
        var origin = $(this);
      
      // Create tooltip
      var newTooltip = $('<div></div');
      newTooltip.addClass('material-tooltip').text(origin.attr('data-tooltip'));
      newTooltip.appendTo($('body'));
      
      var backdrop = $('<div></div').addClass('backdrop');
      backdrop.appendTo(newTooltip);
      backdrop.css({ top: 0, left:0, marginLeft: (newTooltip.outerWidth()/2) - (backdrop.width()/2) });
      

      // Mouse In
      $(this).hover(function(e) {
        e.stopPropagation();
        counter = 0;
        counterInterval = setInterval(function(){
          counter += 50;
          if (counter >= defaults.delay && started == false) {
            started = true
            newTooltip.css({ display: 'block' });

            // Bottom Position
            newTooltip.css({top: origin.offset().top + origin.outerHeight() + margin,
                  left: origin.offset().left + origin.outerWidth()/2 - newTooltip.outerWidth()/2 });

            // Calculate Scale to fill
            scale_factor = newTooltip.width() / 8;
            if (scale_factor < 8)
              scale_factor = 8;

            newTooltip.velocity({ opacity: 1, marginTop: '+10px'}, { duration: 350, queue: false });
            backdrop.css({ display: 'block' })
            .velocity({opacity:1},{duration: 75, delay: 0, queue: false})
            .velocity({scale: scale_factor}, {duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'});
          }
        }, 50); // End Interval

      // Mouse Out
      }, function(){
        // Reset State
        clearInterval(counterInterval);
        counter = 0;

        // Animate back
        newTooltip.velocity({
          opacity: 0, marginTop: '-10px'}, { duration: 225, queue: false, delay: 275 }
        );
        backdrop.velocity({opacity: 0, scale: 1}, {
          duration:225,
          delay: 275, queue: false,
          complete: function(){
            backdrop.css('display', 'none');
            newTooltip.css('display', 'none');
            started = false;}
        });
      });
    });
  }
}( jQuery ));