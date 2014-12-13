(function($) {
  $.fn.extend({
    openModal: function(options) {
      debugger
      var modal = this;
      var overlay = $("<div id='lean_overlay'></div>");
      $("body").append(overlay);

      var defaults = {
        opacity: 0.5,
        in_duration: 300,
        out_duration: 200,
        ready: undefined,
        complete: undefined
      }

      // Override defaults
      options = $.extend(defaults, options);

      $("#lean_overlay").click(function() {
        closeModal(modal);
      });

      $(modal).find(".modal_close").click(function(e) {
        e.preventDefault();
        closeModal(modal);
      });


      $("#lean_overlay").css({ display : "block", opacity : 0 });

      $(modal).css({
        display : "block",
        top: "4%",
        opacity: 0
      });

      $("#lean_overlay").velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: "easeOutCubic"});

      $(modal).velocity({top: "10%", opacity: 1}, {
        duration: options.in_duration,
        queue: false,
        ease: "easeOutCubic",
        // Handle modal ready callback
        complete: function() {
          if (typeof(options.ready) === "function") {
            options.ready();
          }
        }
      });

      function closeModal(modal_id) {
        $("#lean_overlay").velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});
        $(modal_id).fadeOut(options.out_duration, function() {
          $(modal_id).css({ top: 0});
          $("#lean_overlay").css({display:"none"});

          // Call complete callback
          if (typeof(options.complete) === "function") {
            options.complete();
          }
        });
      }
    }
  });
  
  $.fn.extend({
    leanModal: function(options) {
      return this.each(function() {
        // Close Handlers
        $(this).click(function(e) {
          var modal_id = $(this).attr("href");
          $(modal_id).openModal(options);
          e.preventDefault();
        }); // done set on click
      }); // done return
    }
  });
})(jQuery);
