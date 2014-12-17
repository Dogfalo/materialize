(function ($) {
    
  $.fn.slider = function (options) {
    var defaults = {
      full_width: true,
      indicators: true
    }
    options = $.extend(defaults, options);

    return this.each(function() {

      // For each slider, we want to keep track of
      // which slide is active and its associated content
      var $this = $(this);
      var $slider = $this.find('ul.slides').first();
      var $slides = $slider.find('li');
      var $active_index = $slider.find('.active').index();
      var $active;
      if ($active_index != -1) { $active = $slides.eq($active_index); }

      var $transition_time = 1000; // 1 second
      var $time_between_slides = 4000; // 4 seconds

      // Make slider full width
      if (options.full_width) { $this.addClass('full-width'); }

      // dynamically add indicators
      if (options.indicators) {
        var $indicators = $('<ul class="indicators"></ul>');
        $slides.each(function( index ) {
          var $indicator = $('<li class="indicator-item"></li>');

          // Handle clicks on indicators
          $indicator.click(function () {
            var $parent = $slider.parent();
            var curr_index = $parent.find($(this)).index();
            moveToSlide(curr_index);

            // reset interval
            clearInterval($interval);
            $interval = setInterval(
              function(){
                $active_index = $slider.find('.active').index();
                if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
                else $active_index += 1;
                
                moveToSlide($active_index);

              }, $transition_time + $time_between_slides 
            );
          });
          $indicators.append($indicator);
        });
        $this.append($indicators);
        $indicators = $this.find('ul.indicators').find('li.indicator-item');
      }

      if ($active) {
        $active.show();
      }
      else {
        console.log("false");
        $slides.first().addClass('active').velocity({opacity: 1}, {duration: $transition_time, queue: false, easing: 'easeOutQuad'});

        $active_index = 0;
        $active = $slides.eq($active_index);

        // Update indicators
        if (options.indicators) {
          $indicators.eq($active_index).addClass('active');
        }
      }

      // Adjust height to current slide
      $active.find('img').load(function() {
        // Handler for .load() called.
        $slider.height($active.height());
      });

      // This function will transition the slide to any index of the next slide
      function moveToSlide(index) {
        $active_index = $slider.find('.active').index();
        $active = $slides.eq($active_index);

        $active.removeClass('active');
        $active.velocity({opacity: 0}, {duration: $transition_time, queue: false, easing: 'easeOutQuad'});

        // Update indicators
        if (options.indicators) {
          $indicators.eq($active_index).removeClass('active');
        }
        
        $slides.eq(index).velocity({opacity: 1}, {duration: $transition_time, queue: false, easing: 'easeOutQuad'});
        $slides.eq(index).addClass('active');
        $slider.height($active.height());


        // Update indicators
        if (options.indicators) {
          $indicators.eq(index).addClass('active');
        }
      }

      // auto scroll 
      $interval = setInterval(
        function(){
          $active_index = $slider.find('.active').index();
          if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
          else $active_index += 1;
          
          moveToSlide($active_index);

        }, $transition_time + $time_between_slides 
      );


      // HammerJS, Swipe navigation

      // Touch Event
      var panning = false;
      var menuOut = false;

      $this.hammer({
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
                    menu_id.velocity({left: -1 * options.menuWidth}, {duration: 300, queue: false, easing: 'easeOutQuad'});
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

              menu_id.velocity({left: (-1 * options.menuWidth) + x}, {duration: 50, queue: false, easing: 'easeOutQuad'});
              
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


    });

  };
}( jQuery ));