(function($) {
  var _stack = 0,
  _lastID = 0,
  _generateID = function() {
    _lastID++;
    return 'materialize-modal-overlay-' + _lastID;
  };

  var methods = {
    init : function(options) {
      var defaults = {
        opacity: 0.5,
        in_duration: 350,
        out_duration: 250,
        ready: undefined,
        complete: undefined,
        dismissible: true,
        starting_top: '4%',
        ending_top: '10%'
      };

      // Override defaults
      options = $.extend(defaults, options);

      return this.each(function() {
        var $modal = $(this);
        var modal_id = $(this).attr("id") || '#' + $(this).data('target');

        var closeModal = function() {
          var overlayID = $modal.data('overlay-id');
          var $overlay = $('#' + overlayID);
          $modal.removeClass('open');

          // Enable scrolling
          $('body').css({
            overflow: '',
            width: ''
          });

          $modal.find('.modal-close').off('click.close');
          $(document).off('keyup.modal' + overlayID);

          $overlay.velocity( { opacity: 0}, {duration: options.out_duration, queue: false, ease: "easeOutQuart"});


          // Define Bottom Sheet animation
          if ($modal.hasClass('bottom-sheet')) {
            $modal.velocity({bottom: "-100%", opacity: 0}, {
              duration: options.out_duration,
              queue: false,
              ease: "easeOutCubic",
              // Handle modal ready callback
              complete: function() {
                $overlay.css({display:"none"});

                // Call complete callback
                if (typeof(options.complete) === "function") {
                  options.complete();
                }
                $overlay.remove();
                _stack--;
              }
            });
          }
          else {
            $modal.velocity(
              { top: options.starting_top, opacity: 0, scaleX: 0.7}, {
              duration: options.out_duration,
              complete:
                function() {

                  $(this).css('display', 'none');
                  // Call complete callback
                  if (typeof(options.complete) === "function") {
                    options.complete();
                  }
                  $overlay.remove();
                  _stack--;
                }
              }
            );
          }
        };

        var openModal = function() {
          var $body = $('body');
          var oldWidth = $body.innerWidth();
          $body.css('overflow', 'hidden');
          $body.width(oldWidth);

          if ($modal.hasClass('open')) {
            return;
          }

          var overlayID = _generateID();
          var $overlay = $('<div class="modal-overlay"></div>');
          lStack = (++_stack);

          // Store a reference of the overlay
          $overlay.attr('id', overlayID).css('z-index', 1000 + lStack * 2);
          $modal.data('overlay-id', overlayID).css('z-index', 1000 + lStack * 2 + 1);
          $modal.addClass('open');

          $("body").append($overlay);

          if (options.dismissible) {
            $overlay.click(function() {
              closeModal();
            });
            // Return on ESC
            $(document).on('keyup.modal' + overlayID, function(e) {
              if (e.keyCode === 27) {   // ESC key
                closeModal();
              }
            });
          }

          $modal.find(".modal-close").on('click.close', function(e) {
            closeModal();
          });

          $overlay.css({ display : "block", opacity : 0 });

          $modal.css({
            display : "block",
            opacity: 0
          });

          $overlay.velocity({opacity: options.opacity}, {duration: options.in_duration, queue: false, ease: "easeOutCubic"});
          $modal.data('associated-overlay', $overlay[0]);

          // Define Bottom Sheet animation
          if ($modal.hasClass('bottom-sheet')) {
            $modal.velocity({bottom: "0", opacity: 1}, {
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
          }
          else {
            $.Velocity.hook($modal, "scaleX", 0.7);
            $modal.css({ top: options.starting_top });
            $modal.velocity({top: options.ending_top, opacity: 1, scaleX: '1'}, {
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
          }

        };

        // Close Handlers
        console.log('a[href="#' + modal_id + '"], [data-target="' + modal_id + '"]');
        $(document).on('click', 'a[href="#' + modal_id + '"], [data-target="' + modal_id + '"]', function(e) {
          console.log("CLICK");
          options.starting_top = ($(this).offset().top - $(window).scrollTop()) /1.15;
          openModal();
          e.preventDefault();
        }); // done set on click

        $(this).on('openModal', function() {
          var modal_id = $(this).attr("href") || '#' + $(this).data('target');
          openModal();
        });

        $(this).on('closeModal', function() {
          closeModal();
        });
      }); // done return
    },
    open : function() {
      $(this).trigger('openModal');
    },
    open : function() {
      $(this).trigger('closeModal');
    }
  };

  $.fn.modal = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.modal' );
    }
  };
})(jQuery);
