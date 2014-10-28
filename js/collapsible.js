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
          console.log($(this).siblings('.collapsible-body'));
          $(this).siblings('.collapsible-body').slideToggle({ duration: 400, easing: "easeOutCubic", queue: false});
          $panel_headers.not($(this)).parent().removeClass('active');
          $panel_headers.not($(this)).parent().children('.collapsible-body').slideUp({ duration: 400, easing: "easeOutCubic", queue: false});
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