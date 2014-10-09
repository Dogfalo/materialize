(function ($) {
  $.fn.dropdown = function () {
    var origin = $(this);
    
  
    var activates = $("#"+ origin.attr('data-activates'));
    var topMargin = 5;
    activates.hide(0);
    activates.css('width', origin.innerWidth());
    activates.css('top', origin.offset().top + topMargin);
    activates.css('left', origin.offset().left);
    
    // Click handler for list container
    origin.on('click', function(e){ // Mouse over
      e.stopPropagation();
      activates.show(100);
    });
    
    // Doucment click handler        
    $(document).click(function (e) {
          if (!activates.is(e.target) && activates.has(e.target).length === 0) {
            activates.hide(100);
          }
    });
    
    
  };
}( jQuery ));