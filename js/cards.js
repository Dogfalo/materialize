(function ($) {
  $.fn.extend({
    reveal: function(options) {
      var trigger = this;
      var card = $(trigger).hasClass(".card") ? trigger : $(trigger).closest(".card");

      var defaults = {
        duration: 300,
        element: ".card-reveal",
        closeButton: ".mdi-navigation-close",
        ready: undefined,
        complete: undefined
      }

      // Override defaults
      options = $.extend(defaults, options);

      $(trigger).on("click", function() {
        $(card).find(options.element).velocity({translateY: "-100%"}, {
          duration: options.duration,
          queue: false,
          easing: "easeOutQuad",
          // Handle revealed card event
          complete: function() {
            if (typeof(options.ready) === "function") {
              options.ready();
            }
          }
        });
      });

      $(options.closeButton).on("click", function() {
        $(card).find(options.element).velocity({translateY: 0}, {
          duration: options.duration,
          queue: false,
          easing: "easeOutQuad",
          complete: function() {
            if (typeof(options.complete) === "function") {
              options.complete();
            }
          }
        });
      });
    }
  });
}( jQuery ));
