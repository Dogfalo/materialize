(function ($) {
    var timeout;
    var counter;
    var started;
    var counterInterval;
    $.fn.tooltip = function (options) {
      var margin = 5;
      var newTooltip;
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

            // Tooltip positioning
            var originWidth = origin.outerWidth();
            var originHeight = origin.outerHeight();
            var tooltipPosition =  origin.attr('data-position');
            var tooltipHeight = newTooltip.outerHeight();
            var tooltipWidth = newTooltip.outerWidth();
            var tooltipVerticalMovement = '0px';
            var tooltipHorizontalMovement = '0px';

            if (tooltipPosition === "top") {
            // Top Position
            newTooltip.css({
              top: origin.offset().top - tooltipHeight - margin,
              left: origin.offset().left + originWidth/2 - tooltipWidth/2
            });
            tooltipVerticalMovement = '-10px';
            }
            // Left Position
            else if (tooltipPosition === "left") {
              newTooltip.css({
                top: origin.offset().top + originHeight/2 - tooltipHeight/2,
                left: origin.offset().left - tooltipWidth - margin
              });
              tooltipHorizontalMovement = '-10px';
            }
            // Right Position
            else if (tooltipPosition === "right") {
              newTooltip.css({
                top: origin.offset().top + originHeight/2 - tooltipHeight/2,
                left: origin.offset().left + originWidth + margin
              });
              tooltipHorizontalMovement = '+10px';
            }
            else {
            // Bottom Position
            newTooltip.css({
              top: origin.offset().top + origin.outerHeight() + margin,
              left: origin.offset().left + originWidth/2 - tooltipWidth/2
            });
            tooltipVerticalMovement = '+10px';
            }

            // Calculate Scale to fill
            scale_factor = newTooltip.width() / 8;
            if (scale_factor < 8)
              scale_factor = 8;

            
            newTooltip.velocity({ opacity: 1, marginTop: tooltipVerticalMovement, marginLeft: tooltipHorizontalMovement}, { duration: 350, queue: false });
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
          opacity: 0, marginTop: 0, marginLeft: 0}, { duration: 225, queue: false, delay: 275 }
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