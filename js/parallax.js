(function ($) {

    $.fn.parallax = function () {
      var window_width = $(window).width();
      // Parallax Scripts
      return this.each(function(i) {
        var $this = $(this);
        $this.addClass('parallax');

        function updateParallax(initial) {
          if (window_width > 480) {
            var container_height = $this.height();
            var img_height = $this.children("img").height();
            var parallax_dist = img_height - container_height;
            var bottom = $this.offset().top + container_height;
            var top = $this.offset().top;
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();
            var windowBottom = scrollTop + windowHeight;
            var percentScrolled = (windowBottom - top) / (container_height + windowHeight);
            var parallax = -1 * parallax_dist * percentScrolled;      

            if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) { 
              if (initial) {
                $this.children("img").first().stop().animate({bottom: parallax + "px"}, {duration: 300, queue: false, easing: 'easeInOutCubic'});
              }
              else {
                $this.children("img").first().css('bottom', parallax + "px");
              }
            }

          }
        }
        updateParallax(true);
        
        $(window).scroll(function() {
          updateParallax(false);
        });

      });

    };
}( jQuery ));