(function ($) {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
        e.preventDefault();
      e.returnValue = false;
    }

    function keydown(e) {
      for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
          preventDefault(e);
          return;
        }
      }
    }

    function wheel(e) {
      preventDefault(e);
    }

    function disable_scroll() {
      if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
      }
      window.onmousewheel = document.onmousewheel = wheel;
      document.onkeydown = keydown;
    }

    function enable_scroll() {
      if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
      }
      window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    }

    $.fn.sideNav = function (options) {
      var defaults = {
        menuWidth: 240,
        activationWidth: 70,
        edge: 'left'
      }
      options = $.extend(defaults, options);

      $(this).each(function(){
        var $this = $(this);
        var menu_id = $("#"+ $this.attr('data-activates'));
        if (options.edge != 'left') {
          menu_id.addClass('right');
        }

        function removeMenu() {
          $('#sidenav-overlay').animate({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
            complete: function() {
              $(this).remove();
            } });

          if (options.edge === 'left') {
            menu_id.velocity({left: -1 * (options.menuWidth + 10)}, {duration: 300, queue: false, easing: 'easeOutQuad'});
          }
          else {
            menu_id.velocity({right: -1 * (options.menuWidth + 10)}, {duration: 300, queue: false, easing: 'easeOutQuad'});
          }
          enable_scroll();
        }

        // Touch Event
        var panning = false;
        var menuOut = false;

        $('nothing').hammer({
          prevent_default: false
        }).bind('pan', function(e) {

          if (e.gesture.pointerType === "touch") {

            var direction = e.gesture.direction;
            var x = e.gesture.center.x;
            var y = e.gesture.center.y;

            if (panning) {
              if (!$('#sidenav-overlay').length) {
                var overlay = $('<div id="sidenav-overlay"></div>');
                overlay.css('opacity', 0)
                .click(function(){
                  panning = false;
                  menuOut = false;
                  removeMenu();

                  if (options.edge === 'left') {
                    menu_id.velocity({left: -1 * options.menuWidth}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                  }
                  else {
                    menu_id.velocity({right: -1 * options.menuWidth}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                  }
                  overlay.animate({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
                    complete: function() {
                      $(this).remove();
                    } });


                });
                $('body').append(overlay);
              }


              if (x > options.menuWidth) { x = options.menuWidth; }
              else if (x < 0) { x = 0; }
              else if (x < (options.menuWidth / 2)) { menuOut = false; }
              else if (x >= (options.menuWidth / 2)) { menuOut = true; }

              if (options.edge === 'left') {
                menu_id.velocity({left: (-1 * options.menuWidth) + x}, {duration: 50, queue: false, easing: 'easeOutQuad'});
              }
              else {
                menu_id.velocity({right: (-1 * options.menuWidth) + x}, {duration: 50, queue: false, easing: 'easeOutQuad'});
              }

                // Percentage overlay
                var overlayPerc = x / options.menuWidth;
                $('#sidenav-overlay').velocity({opacity: overlayPerc }, {duration: 50, queue: false, easing: 'easeOutQuad'});
              }
              else {
                if (menuOut) {
                  if ((e.gesture.center.x > (options.menuWidth - options.activationWidth)) && direction === 2) {
                    panning = true;
                  }
                }
                else {
                  if ((e.gesture.center.x < options.activationWidth) && direction === 4) {
                    panning = true;
                  }
                }
              }
            }
          }).bind('panend', function(e) {
            if (e.gesture.pointerType === "touch") {

              panning = false;
              if (menuOut) {
                menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 1 }, {duration: 50, queue: false, easing: 'easeOutQuad'});
              }
              else {
                menu_id.velocity({left: -240}, {duration: 300, queue: false, easing: 'easeOutQuad'});
                $('#sidenav-overlay').velocity({opacity: 0 }, {duration: 50, queue: false, easing: 'easeOutQuad',
                  complete: function () {
                    $(this).remove();
                  }});
              }
            }
          });

          $this.click(function() {
            if (menu_id.hasClass('active')) {
              menuOut = false;
              panning = false;
              removeMenu();
            }
            else {
              disable_scroll();
              if (options.edge === 'left') {
                menu_id.velocity({left: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
              }
              else {
                menu_id.velocity({right: 0}, {duration: 300, queue: false, easing: 'easeOutQuad'});
              }

              var overlay = $('<div id="sidenav-overlay"></div>');
              overlay.css('opacity', 0)
              .click(function(){
                menuOut = false;
                panning = false;
                removeMenu();
                overlay.animate({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad',
                  complete: function() {
                    $(this).remove();
                  } });

              });
              $('body').append(overlay);
              overlay.animate({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad',
                complete: function () {
                  menuOut = true;
                  panning = false;
                }
              });
            }

            return false;
          });
});

};
}( jQuery ));