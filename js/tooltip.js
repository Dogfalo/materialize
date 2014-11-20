(function ($) {
    
    var newTooltip;
    var timeout;
    $.fn.tooltip = function () {
      var origin = $(this);
      
      var margin = 15;
      
      // Create tooltip
      var newTooltip = $('<div></div');
      newTooltip.addClass('material-tooltip').text(origin.attr('data-tooltip'));
      newTooltip.appendTo(origin);
      
      var backdrop = $('<div></div').addClass('backdrop');
      backdrop.appendTo(newTooltip);
      backdrop.css({ top: 0,
                    left:0,
              marginLeft: (newTooltip.outerWidth()/2) - (backdrop.width()/2) });
      
      this.hover(function() {
        newTooltip.css({ display: 'block' });

        //    Bottom Position
      newTooltip.css({top: origin.offset().top + origin.outerHeight() + margin,
              left: origin.offset().left + origin.outerWidth()/2 - newTooltip.outerWidth()/2 });
        
        
        newTooltip.velocity({ opacity: 1}, { duration: 300, queue: false });
        backdrop.css({ display: 'block', easing: 'easeOutQuart' })
        .velocity({opacity:1},{duration: 100, queue: false})
        .velocity({scale: 15}, {duration: 350, delay: 100, queue: false, easing: 'easeOutQuart'});
              
      }, function(){
        newTooltip.velocity({
          opacity: 0}, { duration: 200, queue: false });
        
        backdrop.velocity({
          opacity: 0}, { duration: 200, queue: false, complete: function(){backdrop.velocity({scale: 1},{duration:0, queue: false})} });

      });
    }
    
}( jQuery ));