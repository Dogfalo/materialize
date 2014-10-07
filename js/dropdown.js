(function ($) {
  $.fn.dropdown = function () {
    var origin = $(this);
    $("#"+ origin.attr('data-activates')).hide(0);
    this.click(function(){
      var activates = $("#"+ origin.attr('data-activates'));
      // If menu is present, either choose a selection or dismiss
      if (activates.is(":visible")) {
        
      }
      else {
        activates.show(100);
        
        activates.on('click', '>', function() {
          var item = $(this);
          console.log(item.text());
          origin.text(item.text());
          // after click, close menu
          activates.hide(100);
        });
      };
      
    });
  };
}( jQuery ));