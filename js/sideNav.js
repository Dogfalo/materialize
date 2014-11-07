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

    $.fn.sideNav = function () {
      var $this = $(this);
      var menu_id = $("#"+ $this.attr('data-activates'));

      function removeMenu() {
        $('#sidenav-overlay').animate({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad', 
          complete: function() {
            $(this).remove();
          } });
        menu_id.removeClass('active');
        enable_scroll();
      }

      $this.click(function() {
        if (menu_id.hasClass('active')) {
          removeMenu();
        }
        else {
          disable_scroll();
          menu_id.addClass('active');

          var overlay = $('<div id="sidenav-overlay"></div>');
          overlay.css('width', $(document).width() + 100) // account for any scrollbar
            .css('height', $(document).height() + 100) // account for any scrollbar
            .css('top', 0)
            .css('left', 0)
            .css('opacity', 0)
            .css('will-change', 'opacity')
            .click(function(){
              removeMenu();
              overlay.animate({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad', 
                complete: function() {
                  $(this).remove();
                } });
              
            });
          $('body').append(overlay);
          overlay.animate({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad'}
          );
        }


        return false;
      });


    };
}( jQuery ));