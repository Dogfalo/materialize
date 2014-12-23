(function ($) {
  function reveal(event) {
    $(event.data.card).find(event.data.element).velocity(
      { translateY: "-100%" }, {
      duration: event.data.duration,
      queue: false,
      easing: "easeOutQuad",
      // Handle revealed card event
      complete: function() {
        if (typeof(event.data.ready) === "function") {
          event.data.ready();
        }
      }
    });
  }

  function unreveal(event) {
    $(event.data.card).find(event.data.element).velocity({translateY: 0}, {
      duration: event.data.duration,
      queue: false,
      easing: "easeOutQuad",
      complete: function() {
        if (typeof(event.data.complete) === "function") {
          event.data.complete();
        }
      }
    });
  }

  $.fn.extend({
    reveal: function(options) {
      var trigger = this;
      var card = $(trigger).hasClass(".card") ? trigger : $(trigger).closest(".card");

      var defaults = {
        duration: 300,
        element: ".card-reveal",
        closeButton: ".mdi-navigation-close",
        hover: false,
        ready: undefined,
        complete: undefined
      }

      // Override defaults
      options = $.extend(defaults, options);

      if (options.hover) {
        // trigger on hover
        $(trigger).on("mouseenter", {
          card: card,
          element: options.element,
          duration: options.duration,
          ready: options.ready
        }, reveal);

        $(options.element).on("mouseleave", {
          card: card,
          element: options.element,
          duration: options.duration,
          complete: options.complete
        }, unreveal);
      }
      else {
        // trigger on click
        $(trigger).on("click", {
          card: card,
          element: options.element,
          duration: options.duration,
          ready: options.ready
        }, reveal);

        $(options.closeButton).on("click", {
          card: card,
          element: options.element,
          duration: options.duration,
          complete: options.complete
        }, unreveal);
      }
    }
  });
}( jQuery ));
