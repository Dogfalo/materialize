(function ($) {
  $.fn.collapsible = function(options) {
    var defaults = {
        accordion: true
    };

    options = $.extend(defaults, options);


    return this.each(function() {

      var $this = $(this);

      var $panel_headers = $(this).find('.collapsible-header');

      // Accordion Open
      function accordionOpen(object) {
        object.parent().toggleClass('active');
        if (object.parent().hasClass('active')){
          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false});
        }
        else{
          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false});
        }
        $panel_headers.not(object).parent().removeClass('active');
        $panel_headers.not(object).parent().children('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false});
      }

      // Collapsible Open
      function collapsibleOpen(object) {
        object.parent().toggleClass('active');
        if (object.parent().hasClass('active')){
          object.siblings('.collapsible-body').stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false});
        }
        else{
          object.siblings('.collapsible-body').stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false});
        }
      }

      if (defaults.accordion) {

        $panel_headers.each(function () {
          $(this).click(function () {
            accordionOpen($(this));
          });
        });

        // Open first active
        accordionOpen($panel_headers.filter('.active').first());
      }
      else {
        $panel_headers.each(function () {

          // Open any bodies that have the active class
          if ($(this).hasClass('active')) {
            collapsibleOpen($(this));
          }

          $(this).click(function () {
            collapsibleOpen($(this));
          });
        });
      }

    });
  };
}( jQuery ));