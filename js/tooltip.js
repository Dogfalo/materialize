(function ($) {
    $.fn.tooltip = function (options) {
        var timeout = null,
        counter = null,
        started = false,
        counterInterval = null,
        margin = 5;

      // Defaults
      var defaults = {
        delay: 350
      };

      // Remove tooltip from the activator
      if (options === "remove") {
        this.each(function(){
          $('#' + $(this).attr('data-tooltip-id')).remove();
        });
        return false;
      }

      options = $.extend(defaults, options);


      return this.each(function(){
        var tooltipId = Materialize.guid();
        var origin = $(this);
        origin.attr('data-tooltip-id', tooltipId);

        // Create Text span
        var tooltip_text = $('<span></span>').text(origin.attr('data-tooltip'));

        // Create tooltip
        var newTooltip = $('<div></div>');
        newTooltip.addClass('material-tooltip').append(tooltip_text)
          .appendTo($('body'))
          .attr('id', tooltipId);

        var backdrop = $('<div></div>').addClass('backdrop');
        backdrop.appendTo(newTooltip);
        backdrop.css({ top: 0, left:0 });


       //Destroy previously binded events
      origin.off('mouseenter.tooltip mouseleave.tooltip');
        // Mouse In
      origin.on({
        'mouseenter.tooltip': function(e) {
          var tooltip_delay = origin.data("delay");
          tooltip_delay = (tooltip_delay === undefined || tooltip_delay === '') ? options.delay : tooltip_delay;
          counter = 0;
          counterInterval = setInterval(function(){
            counter += 10;
            if (counter >= tooltip_delay && started === false) {
              started = true;
              newTooltip.css({ display: 'block', left: '0px', top: '0px' });

              // Set Tooltip text
              newTooltip.children('span').text(origin.attr('data-tooltip'));

              // Tooltip positioning
              var originWidth = origin.outerWidth();
              var originHeight = origin.outerHeight();
              var tooltipPosition =  origin.attr('data-position');
              var tooltipHeight = newTooltip.outerHeight();
              var tooltipWidth = newTooltip.outerWidth();
              var tooltipVerticalMovement = '0px';
              var tooltipHorizontalMovement = '0px';
              var scale_factor = 8;
              var targetTop, targetLeft, newCoordinates;

              if (tooltipPosition === "top") {
                // Top Position
                targetTop = origin.offset().top - tooltipHeight - margin;
                targetLeft = origin.offset().left + originWidth/2 - tooltipWidth/2;
                newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

                tooltipVerticalMovement = '-10px';
                backdrop.css({
                  borderRadius: '14px 14px 0 0',
                  transformOrigin: '50% 90%',
                  marginTop: tooltipHeight,
                  marginLeft: (tooltipWidth/2) - (backdrop.width()/2)
                });
              }
              // Left Position
              else if (tooltipPosition === "left") {
                targetTop = origin.offset().top + originHeight/2 - tooltipHeight/2;
                targetLeft =  origin.offset().left - tooltipWidth - margin;
                newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

                tooltipHorizontalMovement = '-10px';
                backdrop.css({
                  width: '14px',
                  height: '14px',
                  borderRadius: '14px 0 0 14px',
                  transformOrigin: '95% 50%',
                  marginTop: tooltipHeight/2,
                  marginLeft: tooltipWidth
                });
              }
              // Right Position
              else if (tooltipPosition === "right") {
                targetTop = origin.offset().top + originHeight/2 - tooltipHeight/2;
                targetLeft = origin.offset().left + originWidth + margin;
                newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);

                tooltipHorizontalMovement = '+10px';
                backdrop.css({
                  width: '14px',
                  height: '14px',
                  borderRadius: '0 14px 14px 0',
                  transformOrigin: '5% 50%',
                  marginTop: tooltipHeight/2,
                  marginLeft: '0px'
                });
              }
              else {
                // Bottom Position
                targetTop = origin.offset().top + origin.outerHeight() + margin;
                targetLeft = origin.offset().left + originWidth/2 - tooltipWidth/2;
                newCoordinates = repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
                tooltipVerticalMovement = '+10px';
                backdrop.css({
                  marginLeft: (tooltipWidth/2) - (backdrop.width()/2)
                });
              }

              // Set tooptip css placement
              newTooltip.css({
                top: newCoordinates.y,
                left: newCoordinates.x
              });

              // Calculate Scale to fill
              scale_factor = tooltipWidth / 8;
              if (scale_factor < 8) {
                scale_factor = 8;
              }
              if (tooltipPosition === "right" || tooltipPosition === "left") {
                scale_factor = tooltipWidth / 10;
                if (scale_factor < 6)
                  scale_factor = 6;
              }

              newTooltip.velocity({ marginTop: tooltipVerticalMovement, marginLeft: tooltipHorizontalMovement}, { duration: 350, queue: false })
                .velocity({opacity: 1}, {duration: 300, delay: 50, queue: false});
              backdrop.css({ display: 'block' })
              .velocity({opacity:1},{duration: 55, delay: 0, queue: false})
              .velocity({scale: scale_factor}, {duration: 300, delay: 0, queue: false, easing: 'easeInOutQuad'});

            }
          }, 10); // End Interval

        // Mouse Out
        },
        'mouseleave.tooltip': function(){
          // Reset State
          clearInterval(counterInterval);
          counter = 0;

          // Animate back
          newTooltip.velocity({
            opacity: 0, marginTop: 0, marginLeft: 0}, { duration: 225, queue: false, delay: 225 }
          );
          backdrop.velocity({opacity: 0, scale: 1}, {
            duration:225,
            delay: 275, queue: false,
            complete: function(){
              backdrop.css('display', 'none');
              newTooltip.css('display', 'none');
              started = false;}
          });
        }
        });
    });
  };

  var repositionWithinScreen = function(x, y, width, height) {
    var newX = x
    var newY = y;

    if (newX < 0) {
      newX = 4;
    } else if (newX + width > window.innerWidth) {
      newX -= newX + width - window.innerWidth;
    }

    if (newY < 0) {
      newY = 4;
    } else if (newY + height > window.innerHeight + $(window).scrollTop) {
      newY -= newY + height - window.innerHeight;
    }

    return {x: newX, y: newY};
  };

  $(document).ready(function(){
     $('.tooltipped').tooltip();
   });
}( jQuery ));
