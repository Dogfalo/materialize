(function ($) {

  var $dragTarget = $('<div class="drag-target"></div>'),
    $overlay = $('<div id="sidenav-overlay"></div>'),
    // Touch Event
    panning = false,
    menuOut = false,
    hideMenu = function () {};

  var methods = {
    init : function(options) {
      var defaults = {
        menuWidth: 240,
        edge: 'left',
        closeOnClick: false
      };

      options = $.extend(defaults, options);

      $(this).each(function(){
        var $this = $(this),
          $menu = $("#"+ $this.attr('data-activates'));

        // Set to width
        if (options.menuWidth !== defaults.menuWidth) {
          $menu.css('width', options.menuWidth);
        }

        // Add Touch Area
        $('body').append($dragTarget);

        if (options.edge == 'left') {
          $menu.css('transform', 'translateX(-100%)');
          $dragTarget.css({'left': 0}); // Add Touch Area
        } else {
          $menu.addClass('right-aligned') // Change text-alignment to right
            .css('transform', 'translateX(100%)');
          $dragTarget.css({'right': 0}); // Add Touch Area
        }

        // If fixed sidenav, bring menu out
        if ($menu.hasClass('fixed')) {

          if (window.innerWidth > 992) {
            $menu.css('transform', 'translateX(0)');
          }

          // Window resize to reset on large screens fixed
          $(window).resize(function() {
            if (window.innerWidth > 992) {
              // Close menu if window is resized bigger than 992 and user has fixed sidenav
              if ($('#sidenav-overlay').length !== 0 && menuOut) {
                hideMenu(true);
              } else {
                $menu.css('transform', 'translateX(0%)');
              }
            }
            else if (menuOut === false){
              $menu.css('transform', (options.edge === 'left') ? 'translateX(-100%)' : 'translateX(100%)');
            }

          });
        }

        // if closeOnClick, then add close event for all a tags in side sideNav
        if (options.closeOnClick) {
          $menu.on("click.itemclick", "a:not(.collapsible-header)", function(){
            if (window.innerWidth < 992 ) {
              hideMenu();
            }
          });
        }

        hideMenu = function (restoreNav) {
          var restore = function() {
              if (restoreNav) {
                // Restore Fixed sidenav
                $menu.removeAttr('style');
                $menu.css('width', options.menuWidth);
              }
            },
            translateX = options.edge === 'left' ? '-100%' : '100%',
            dragCss = {
              width: '',
              left: options.edge === 'left' ? '0' : '',
              right: options.edge === 'left' ? '' : '0'
            };

          panning = false;
          menuOut = false;
          // Reenable scrolling
          $('body').css('overflow', '');

          $overlay.velocity({
            opacity: 0
          }, {
            duration: 200,
            queue: false,
            easing: 'easeOutQuad',
            complete: function() {
              $(this).remove();
            }
          });

          $dragTarget.css(dragCss);

          $menu.velocity(
            {'translateX': translateX},
            { duration: 200,
              queue: false,
              easing: 'easeOutCubic',
              complete: restore
            }
          );
        };

        $dragTarget.on('click', function(){
          hideMenu();
        });

        $dragTarget.hammer({
          prevent_default: false
        })
        .bind('pan', function(e) {

          if (e.gesture.pointerType == "touch") {

            var direction = e.gesture.direction;
            var x = e.gesture.center.x;
            var y = e.gesture.center.y;
            var velocityX = e.gesture.velocityX;

            // Disable Scrolling
            $('body').css('overflow', 'hidden');

            // If overlay does not exist, create one and if it is clicked, close menu
            if ($overlay.length === 0) {
              $overlay.css('opacity', 0).click( function(){
                hideMenu();
              });
              $('body').append($overlay);
            }

            // Keep within boundaries
            if (options.edge === 'left') {
              if (x > options.menuWidth) { x = options.menuWidth; }
              else if (x < 0) { x = 0; }
            }

            if (options.edge === 'left') {
              // Left Direction
              if (x < (options.menuWidth / 2)) { menuOut = false; }
              // Right Direction
              else if (x >= (options.menuWidth / 2)) { menuOut = true; }
              $menu.css('transform', 'translateX(' + (x - options.menuWidth) + 'px)');
            }
            else {
              // Left Direction
              if (x < (window.innerWidth - options.menuWidth / 2)) {
                menuOut = true;
              }
              // Right Direction
              else if (x >= (window.innerWidth - options.menuWidth / 2)) {
               menuOut = false;
             }
              var rightPos = (x - options.menuWidth / 2);
              if (rightPos < 0) {
                rightPos = 0;
              }

              $menu.css('transform', 'translateX(' + rightPos + 'px)');
            }


            // Percentage overlay
            var overlayPerc;
            if (options.edge === 'left') {
              overlayPerc = x / options.menuWidth;
              $overlay.velocity({opacity: overlayPerc }, {duration: 10, queue: false, easing: 'easeOutQuad'});
            }
            else {
              overlayPerc = Math.abs((x - window.innerWidth) / options.menuWidth);
              $overlay.velocity({opacity: overlayPerc }, {duration: 10, queue: false, easing: 'easeOutQuad'});
            }
          }

        })
        .bind('panend', function(e) {

          if (e.gesture.pointerType == "touch") {
            var velocityX = e.gesture.velocityX;
            var x = e.gesture.center.x;
            var leftPos = x - options.menuWidth;
            var rightPos = x - options.menuWidth / 2;
            if (leftPos > 0 ) {
              leftPos = 0;
            }
            if (rightPos < 0) {
              rightPos = 0;
            }
            panning = false;

            if (options.edge === 'left') {
              // If velocityX <= 0.3 then the user is flinging the menu closed so ignore menuOut
              if ((menuOut && velocityX <= 0.3) || velocityX < -0.5) {
                if (leftPos != 0) {
                  $menu.velocity({'translateX': [0, leftPos]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                }

                // $menu.css({'translateX': 0});
                $overlay.velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
                $dragTarget.css({width: '50%', right: 0, left: ''});
              }
              else if (!menuOut || velocityX > 0.3) {
                // Enable Scrolling
                $('body').css('overflow', '');
                // Slide menu closed
                $menu.velocity({'translateX': [-1 * options.menuWidth - 10, leftPos]}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                $overlay.velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
                  complete: function () {
                    $(this).remove();
                  }});
                $dragTarget.css({width: '10px', right: '', left: 0});
              }
            }
            else {
              if ((menuOut && velocityX >= -0.3) || velocityX > 0.5) {
                $menu.velocity({'translateX': [0, rightPos]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                $overlay.velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
                $dragTarget.css({width: '50%', right: '', left: 0});
              }
              else if (!menuOut || velocityX < -0.3) {
                // Enable Scrolling
                $('body').css('overflow', '');
                // Slide menu closed
                $menu.velocity({'translateX': [options.menuWidth + 10, rightPos]}, {duration: 200, queue: false, easing: 'easeOutQuad'});
                $overlay.velocity({opacity: 0 }, {duration: 200, queue: false, easing: 'easeOutQuad',
                  complete: function () {
                    $(this).remove();
                  }});
                $dragTarget.css({width: '10px', right: 0, left: ''});
              }
            }

          }
        });

        // Click on toggle menu button!
        $this.click(function() {
          if (menuOut === true) {
            menuOut = false;
            panning = false;
            return hideMenu();
          }

          // Disable Scrolling
          // Push current drag target on top of DOM tree
          $('body')
          .css('overflow', 'hidden')
          .append($dragTarget);

          if (options.edge === 'left') {
            $dragTarget.css({width: '50%', right: 0, left: ''});
            $menu.velocity({'translateX': [0, -1 * options.menuWidth]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
          }
          else {
            $dragTarget.css({width: '50%', right: '', left: 0});
            $menu.velocity({'translateX': [0, options.menuWidth]}, {duration: 300, queue: false, easing: 'easeOutQuad'});
          }

          $overlay.css('opacity', 0)
          .click(function(){
            menuOut = false;
            panning = false;
            hideMenu();
            $overlay.velocity({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
              complete: function() {
                $(this).remove();
              } });

          });
          $('body').append($overlay);
          $overlay.velocity({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad',
            complete: function () {
              menuOut = true;
              panning = false;
            }
          });

          return false;
        });

      });

    },
    destroy: function () {
      hideMenu();
      $dragTarget.off();
      $dragTarget.data("hammer").destroy();
      $dragTarget.remove();
      $(this).off('click');
      $overlay.remove();
    },
    show : function() {
      this.trigger('click');
    },
    hide : function() {
      $overlay.trigger('click');
    }
  };

  $.fn.sideNav = function(methodOrOptions) {
    if ( methods[methodOrOptions] ) {
      return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      // Default to "init"
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.sideNav' );
    }
  }; // Plugin end
}( jQuery ));
