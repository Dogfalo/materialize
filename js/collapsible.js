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
          if ($(this).parent().hasClass('active')){
            $(this).siblings('.collapsible-body').stop(true,false).slideDown({ duration: 300, easing: "easeOutCubic", queue: false});
          }
          else{
            $(this).siblings('.collapsible-body').stop(true,false).slideUp({ duration: 300, easing: "easeOutCubic", queue: false});
          }
          $panel_headers.not($(this)).parent().removeClass('active');
          $panel_headers.not($(this)).parent().children('.collapsible-body').stop(true,false).slideUp({ duration: 300, easing: "easeOutCubic", queue: false});
        });
      });

    }
    else {
      $panel_headers.each(function () {
        $(this).click(function () {
          $(this).parent().toggleClass('active');
          if ($(this).parent().hasClass('active')){
            $(this).siblings('.collapsible-body').stop(true,false).slideDown({ duration: 300, easing: "easeOutCubic", queue: false});
          }
          else{
            $(this).siblings('.collapsible-body').stop(true,false).slideUp({ duration: 300, easing: "easeOutCubic", queue: false});
          }
        });
      });
    }
  };
}( jQuery ));