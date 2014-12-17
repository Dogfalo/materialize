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

      var $transition_time = 500; // 1 second
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
        if (index >= $slides.length) index = 0;
        else if (index < 0) index = $slides.length -1;

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
          moveToSlide($active_index + 1);

        }, $transition_time + $time_between_slides 
      );


      // HammerJS, Swipe navigation

      // Touch Event
      var panning = false;
      var swipeLeft = false;
      var swipeRight = false;

      $this.hammer({
          prevent_default: false
      }).bind('pan', function(e) {
        if (e.gesture.pointerType === "touch") {

          // reset interval
          clearInterval($interval);

          var direction = e.gesture.direction;
          var x = e.gesture.deltaX;
          var y = e.gesture.deltaY;

          console.log(e.gesture.deltaX);
          console.log(direction);

          $curr_slide = $slider.find('.active');
          $curr_slide.velocity({ translateX: x
              }, {duration: 50, queue: false, easing: 'easeOutQuad'});      

          // Swipe Left
          if (direction === 4 && x > ($this.innerWidth() / 2)) {
            swipeRight = true;
          }
          // Swipe Right
          else if (direction === 2 && x < (-1 * $this.innerWidth() / 2)) {
            swipeLeft = true;
          }

          
        }
      
      }).bind('panend', function(e) {
        if (e.gesture.pointerType === "touch") {

          $curr_slide = $slider.find('.active');
          panning = false;
          curr_index = $slider.find('.active').index();

          if (!swipeRight && !swipeLeft) {
            // Return to original spot
            $curr_slide.velocity({ translateX: 0
                }, {duration: 300, queue: false, easing: 'easeOutQuad'});
          }
          else if (swipeLeft) {
            moveToSlide(curr_index + 1);
            $curr_slide.velocity({translateX: -1 * $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad', 
                                  complete: function() {
                                    $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                  } });
          }
          else if (swipeRight) {
            moveToSlide(curr_index - 1);
            $curr_slide.velocity({translateX: $this.innerWidth() }, {duration: 300, queue: false, easing: 'easeOutQuad', 
                                  complete: function() {
                                    $curr_slide.velocity({opacity: 0, translateX: 0}, {duration: 0, queue: false});
                                  } });
          }
          swipeLeft = false;
          swipeRight = false;

          // Restart interval
          clearInterval($interval);
          $interval = setInterval(
            function(){
              $active_index = $slider.find('.active').index();
              if ($slides.length == $active_index + 1) $active_index = 0; // loop to start
              else $active_index += 1;
              
              moveToSlide($active_index);

            }, $transition_time + $time_between_slides 
          );
        }
      });


    });

  };
}( jQuery ));