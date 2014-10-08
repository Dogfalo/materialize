(function ($) {
  $.fn.dropdown = function () {
    var origin = $(this);
    $("#"+ origin.attr('data-activates')).hide(0);
    
    // Click handler for list container
    this.click(function(e){
      e.stopPropagation();
      var activates = $("#"+ origin.attr('data-activates'));
      // If menu is present, either choose a selection or dismiss
      if (activates.is(":visible")) {
        console.log('here');
      }
      else {
        activates.show(100);
        
        // Add onClick handlers to the list items
        activates.on('click', '>', function(e) {
          var item = $(this);
          console.log(item.text());
          origin.text(item.text());
          // After click, close menu
          activates.hide(100);
          // Unbind handlers
          activates.find("*").off('click');
          
        });
        
        // Add outside div handler to detect dismissal click
        $(document).click(function (e) {
          if (!activates.is(e.target) && activates.has(e.target).length === 0) {
            activates.find("*").off();
            activates.hide(100);
            $(document).off(e);
            
          }
        });
      };
      
    });
  };
}( jQuery ));