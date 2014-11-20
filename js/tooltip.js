(function ($) {
    
    var newTooltip;
    var timeout;
    $.fn.tooltip = function () {
      var origin = $(this);
      // Create tooltip
      var newTooltip = $('<div></div');
      newTooltip.addClass('material-tooltip')
        .css({ top: origin.offset().top,
              left: origin.offset().left })
        .text(origin.attr('data-tooltip'))
        .appendTo(origin);
      
      var backdrop = $('<div></div').addClass('backdrop');
      backdrop.appendTo(newTooltip);
      backdrop.css({ top: 0,
                    left:0,
              marginLeft: (newTooltip.outerWidth()/2) - (backdrop.width()/2) });
      
      this.hover(function() {
        newTooltip.css({ display: 'block' })
        .velocity({ opacity: 1}, { duration: 300, queue: false });
        backdrop.css({ display: 'block' })
        .velocity({opacity:1},{duration: 100, queue: false})
        .velocity({scale: 17}, {duration: 300, delay: 50, queue: false, easing: 'easeInOut'});
              
      }, function(){
        newTooltip.velocity({
          opacity: 0}, { duration: 150, queue: false });
        
        backdrop.velocity({
          opacity: 0, scale:1}, { duration: 150, queue: false });

      });
    }
}( jQuery ));