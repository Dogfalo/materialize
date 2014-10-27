(function ($) {
  $.fn.collapsible = function(options) {
    var defaults = {
        accordion: true
    };

    options = $.extend(defaults, options);
    var $this = $(this);
    
    var $panel_headers = $(this).find('.collapsible-header');
  
    if (defaults.accordion) {

      $panel_headers.each(function () {
        $(this).click(function () {
          $(this).parent().toggleClass('active');
          $panel_headers.not($(this)).parent().removeClass('active');
        });
      });

    }
    else {
      $panel_headers.each(function () {
        $(this).click(function () {
          $(this).parent().toggleClass('active');
        });
      });
    }


    
    
  };
}( jQuery ));