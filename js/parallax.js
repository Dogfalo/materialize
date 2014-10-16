(function ($) {
    
    var newTooltip;
    var timeout;
    $.fn.parallax = function () {
      // Parallax Scripts
      return this.each(function() {
        var $this = $(this);

        function updateParallax() {
          if (window_width > 480) {
            $(".parallax").each(function () {
              var height = $(this).height();
              var bottom = $(this).offset().top + height;
              var top = $(this).offset().top;
              var windowHeight = $(window).height();
              var scrollTop = $(window).scrollTop();
              var fromTop = 0;
              var isHome = true;

              if (top === 0) { fromTop = scrollTop - top; } 
              else { fromTop = scrollTop - top + windowHeight; }

              if ($("#home").find($(this)).length) { isHome = true; }
              else { isHome = false; }

              if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {   
                var parallax = (fromTop / 3);
                var lessParallax = (fromTop / 6);
                var postParallax = (scrollTop / 3)*-1;
                var videoParallax = height-(fromTop / 2);
                var percent = 1 - (scrollTop / windowHeight);
                if (scrollTop < 0) {
                  parallax = 0;
                  lessParallax = 0;
                  postParallax = 0;
                }


                if (isHome) { 
                  $("#home .carousel, #home .welcome").css('marginTop', lessParallax + "px");
                  $("#home .carousel").css('opacity', percent);
                  $(this).children("img").first().css('top', parallax + "px");
                }
                else if ($("#post").find($(this)).length) { //If Post Page Exists
                  if ($("#post #fullscreen-slider-carousel").length) {
                    $(this).find('> img').css('marginTop', (scrollTop / 3) + "px");
                  }
                  else {
                    $("#post .parallax > img").css('marginTop', parallax + "px");
                  }

                }
                else {
                  if (top === 0) {
                    $(this).children("img").first().css('top', parallax + "px");
                    $(this).children("video").first().css('bottom', videoParallax + "px");
                  } 
                  else {
                    var newParallax = parallax - ($(this).children("img").first().height() / 2);
                    $(this).children("img").first().css('top', newParallax + "px");
                    $(this).children("video").first().css('bottom', videoParallax + "px");
                  }
                }
              }

            });
          }
        }
        updateParallax();
        
        $(window).scroll(function() {
          updateParallax();
          var top = $(window).scrollTop();
          $(".carousel").each(function () {
            var bottom = $(this).offset().top + $(this).height();
            if (top > bottom) {
              $(this).carousel('pause');
            }
            else {
              $(this).carousel('cycle');
            }
          });
        });

      });

    };
}( jQuery ));