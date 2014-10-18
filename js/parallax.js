(function ($) {

    $.fn.parallax = function () {
      var window_width = $(window).width();
      // Parallax Scripts
      return this.each(function() {
        var $this = $(this);
        $this.addClass('parallax');

        function updateParallax() {
          if (window_width > 480) {
            var height = $this.height();
            var bottom = $this.offset().top + height;
            var top = $this.offset().top;
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            var fromTop = scrollTop + top - (windowHeight / 2);

            if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {   
              var parallax = fromTop / 3;
              
              $this.children("img").first().css('top', parallax + "px");
            }

          }
        }
        updateParallax();
        
        $(window).scroll(function() {
          updateParallax();
        });

      });

    };
}( jQuery ));