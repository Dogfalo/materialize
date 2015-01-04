(function ($) {

  $.fn.materialbox = function () {

    return this.each(function() {

      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 275;
      var outDuration = 225;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');
      var originalWidth = 0;
      var originalHeight = 0;

      origin.wrap(placeholder);
      origin.on('click', function(){

        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = origin.width();
        var originalHeight = origin.height();

        // If already modal, return to original
        if (doneAnimating === false) {
          return false;
        }
        else if (overlayActive && doneAnimating===true) {
          returnToOriginal();
          return false;
        }

        // Set states
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;

        // Set positioning for placeholder

        placeholder.css('width', placeholder[0].getBoundingClientRect().width)
        .css('height', placeholder[0].getBoundingClientRect().height)
        .css('position', 'relative')
        .css('top', 0)
        .css('left', 0);

        // Set css on origin
        origin.css('position', 'absolute')
        .css('z-index', 1000);
        origin.data('width', originalWidth);
        origin.data('height', originalHeight);

        // Add caption if it exists
        if (origin.data('caption') !== "") {
          var $photo_caption = $('<div class="materialbox-caption"></div');
          $photo_caption.text(origin.data('caption'));
          $('body').append($photo_caption);
        }

        // Add overlay
        var overlay = $('<div></div>');
        overlay.attr('id', 'materialbox-overlay')
          .css('will-change', 'opacity')
          .css('width', $(document).width() + 100) // account for any scrollbar
          .css('height', $(document).height() + 100) // account for any scrollbar
          .css('top', 0)
          .css('left', 0)
          .css('opacity', 0)
          .click(function(){
            if (doneAnimating === true)
            returnToOriginal();
          });
          $('body').append(overlay);
          overlay.animate({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'}
            );

        // Animate caption
        if (origin.data('caption') !== "") {
          $photo_caption.css({ "display": "inline" });
          $photo_caption.velocity({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'})
        }

        // Resize Image
        var ratio = 0;
        var widthPercent = originalWidth / windowWidth;
        var heightPercent = originalHeight / windowHeight;
        var newWidth = 0;
        var newHeight = 0;

        if (widthPercent > heightPercent) {
          ratio = originalHeight / originalWidth;
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        }
        else {
          ratio = originalWidth / originalHeight;
          newWidth = (windowHeight * 0.9) * ratio;
          newHeight = windowHeight * 0.9;
        }

        // Animate image + set z-index
        if(origin.hasClass('responsive-img')) {
          origin.velocity({'max-width': newWidth, 'width': originalWidth}, {duration: 0, queue: false,
            complete: function(){
              origin.css('left', 0)
              .css('top', 0)

              .velocity({ height: newHeight, width: newWidth }, {duration: inDuration, queue: false, easing: 'easeOutQuad'})
              .velocity({ left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2 }, {duration: inDuration, queue: false, easing: 'easeOutQuad'})
              .velocity({ top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2}, {duration: inDuration, queue: false, easing: 'easeOutQuad', complete: function(){doneAnimating = true;} });
            }
          });
        }
        else {
          origin.css('left', 0)
          .css('top', 0)
          .velocity({ height: newHeight, width: newWidth }, {duration: inDuration, queue: false, easing: 'easeOutQuad'})
          .velocity({ left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2 }, {duration: inDuration, queue: false, easing: 'easeOutQuad'})
          .velocity({ top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2}, {duration: inDuration, queue: false, easing: 'easeOutQuad', complete: function(){doneAnimating = true;} });
        }

    }); // End origin on click


      // Return on scroll
      $(window).scroll(function() {
        if (overlayActive ) {
          returnToOriginal();
        }
      });

      // Return on ESC
      $(document).keyup(function(e) {

        if (e.keyCode === 27 && doneAnimating === true) {   // ESC key
          if (overlayActive) {
            returnToOriginal();
          }
        }
      });


      // This function returns the modaled image to the original spot
      function returnToOriginal() {

          doneAnimating = false;

          var placeholder = origin.parent('.material-placeholder');
          var windowWidth = window.innerWidth;
          var windowHeight = window.innerHeight;
          var originalWidth = origin.data('width');
          var originalHeight = origin.data('height');


          $('#materialbox-overlay').fadeOut(outDuration, function(){
            // Remove Overlay
            overlayActive = false;
            $(this).remove();
          });

          // Resize Image
          origin.velocity(
            {
              width: originalWidth,
              height: originalHeight,
              left: 0,
              top: 0
            },
            {
              duration: outDuration,
              queue: false, easing: 'easeOutQuad',

            }
          );

          // Remove Caption + reset css settings on image
          $('.materialbox-caption').velocity({opacity: 0}, {
            duration: outDuration + 225,
            queue: false, easing: 'easeOutQuad',
            complete: function(){
              placeholder.css({
                height: '',
                width: '',
                position: '',
                top: '',
                left: ''
              });

              origin.css({
                height: '',
                position: '',
                top: '',
                left: '',
                width: '',
                'max-width': '',
                position: '',
                'z-index': ''
              });

              // Remove class
              origin.removeClass('active');
              doneAnimating = true;
              $(this).remove();
            }
          });

        }
        });
};
}( jQuery ));