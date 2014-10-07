(function ($) {
    
    var newTooltip;
    var timeout;
    $.fn.tooltip = function () {
        var origin;
        this.hover(function() {
            // on mouseover
            origin = $(this);
            timeout = setTimeout(function(){
              newTooltip = $('<div></div>');
              newTooltip.text($(origin).attr('title'))
              .addClass("material-tooltip");

              $('body').append(newTooltip);
              // Get cardinal position of tooltip
              var location = origin.attr('data-tooltip');

              // Set position of tooltip
              var leftPos;
              var topPos;
              var margin = 15;
              if (location === 'bottom') {              
                leftPos = $(origin).offset().left + $(origin).outerWidth()/2 - newTooltip.outerWidth()/2;
                topPos = $(origin).offset().top + margin;
              }
              else if (location === 'top') {
                leftPos = $(origin).offset().left + $(origin).outerWidth()/2 - newTooltip.outerWidth()/2;
                topPos = $(origin).offset().top - $(origin).outerHeight() - newTooltip.outerHeight() - margin;
              }
              else if (location === 'left') {
                leftPos = $(origin).offset().left - newTooltip.outerWidth() - margin;
                topPos = $(origin).offset().top - $(origin).outerHeight()/2 - newTooltip.outerHeight()/2;
              }
              else if (location === 'right') {
                leftPos = $(origin).offset().left + $(origin).outerWidth() + margin;
                topPos = $(origin).offset().top - $(origin).outerHeight()/2 - newTooltip.outerHeight()/2;
              }

              newTooltip.css({top: topPos, left: leftPos});
              // Animation
              newTooltip.fadeIn(100);
              origin.removeAttr('title');
            },200);
        }, function(){
            clearTimeout(timeout);
            origin.attr('title', newTooltip.text());
            newTooltip.fadeOut(100, function(){
                newTooltip.remove();});
        });
    };
}( jQuery ));