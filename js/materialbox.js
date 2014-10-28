(function ($) {

  $.fn.materialbox = function () {

    return this.each(function() {

      var overlayActive = false;
      var doneAnimating = true;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');

      var originalWidth = origin.width();
      var originalHeight = origin.height();  
      console.log(origin, originalHeight, originalWidth);
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      
      origin.wrap(placeholder);
      origin.on('click', function(){
          // If already modal, do nothing
         if (overlayActive || doneAnimating === false) {
           returnToOriginal();
           return false;
         }
        
        // add active class
        origin.addClass('active');
        originalWidth = origin.width();
        originalHeight = origin.height();

        
        // Set positioning for placeholder
        origin.parent('.material-placeholder').css('width', origin.innerWidth())
          .css('height', originalHeight)
          .css('position', 'relative')
          .css('top', 0)
          .css('left', 0)
          .css('z-index', origin.attr('z-indez'));

        
        origin.css('position', 'absolute');
        
        // Add overlay
        var overlay = $('<div></div>');
        overlay.attr('id', 'materialbox-overlay')
          .css('width', $(document).width() + 100) // account for any scrollbar
          .css('height', $(document).height() + 100) // account for any scrollbar
          .css('top', 0)
          .css('left', 0)
          .css('opacity', 0)
          .css('will-change', 'opacity')
          .click(function(){
            returnToOriginal();
          });
        $('body').append(overlay);
        overlay.animate({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad'}
        );
        
        // Set states
        overlayActive = true;
        doneAnimating = false;

        
        // Resize Image      
        var ratio = originalWidth / originalHeight;
        var widthPercent = originalWidth / windowWidth;
        var heightPercent = originalWidth / windowHeight;
        var newWidth = 0;
        var newHeight = 0;

        if (widthPercent > heightPercent) {
          newWidth = windowWidth * 0.8;
          newHeight = windowWidth * 0.8 * ratio;
        }
        else {
          newWidth = (windowHeight * 0.8) * ratio;
          newHeight = windowHeight * 0.8;
        }

        console.log(originalWidth, originalHeight, ratio, newHeight, newWidth);

        // Reposition Element AND Animate image + set z-index
        origin.css('left', 0)
          .css('top', 0)
          .css('z-index', 10000)
          .css('will-change', 'left, top')
          .animate({ height: newHeight, width: newWidth }, {duration: 300, queue: false, easing: 'easeOutQuad'})
          .animate({ left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2 }, {duration: 300, queue: false, easing: 'easeOutQuad'})
          .animate({ top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2}, {duration: 300, queue: false, easing: 'easeOutQuad', complete: function(){doneAnimating = true;} });
        });

      
      // Return on scroll
      $(window).scroll(function() {
        if (overlayActive) {
          returnToOriginal();    
        }
      });
      
      // Return on ESC
      $(document).keyup(function(e) {

        if (e.keyCode === 27) {   // ESC key
          if (overlayActive) {
            returnToOriginal();    
          }
        }
      });
      
      
      // This function returns the modaled image to the original spot
      function returnToOriginal() {
          // Reset z-index
          var original_z_index = origin.parent('.material-placeholder').attr('z-index');
          if (!original_z_index) {
            original_z_index = 1;
          }
          // Remove Overlay
          overlayActive = false;
          $('#materialbox-overlay').fadeOut(275, function(){ 
            $(this).remove(); 
            origin.css('z-index', original_z_index);
          });
          // Resize
          origin.animate({ width: originalWidth}, {duration: 275, queue: false, easing: 'easeInOutQuad'});
          origin.animate({ height: originalHeight}, {duration: 275, queue: false, easing: 'easeInOutQuad'});

          // Reposition Element
          origin.animate({ left: 0}, {duration: 275, queue: false, easing: 'easeInOutQuad'});
          origin.animate({ top: 0 }, {duration: 275, queue: false, easing: 'easeInOutQuad'});
          origin.css('will-change', '');
          // add active class
          origin.removeClass('active');
      }
    });
  };
}( jQuery ));
