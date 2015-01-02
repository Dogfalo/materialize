(function ($) {

  $.fn.materialbox = function () {

    return this.each(function() {

      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 275;
      var outDuration = 225;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');
      var originalWidth;
      var originalHeight;

      origin.wrap(placeholder);
      origin.on('click', function(){

        var placeholder = origin.parent('.material-placeholder');
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var originalWidth = placeholder[0].getBoundingClientRect().width;
        var originalHeight = placeholder[0].getBoundingClientRect().height;

        // If already modal, return to original
        if (overlayActive || doneAnimating === false) {
          returnToOriginal();
          return false;
        }


        origin.velocity("stop");
        $('#materialbox-overlay').velocity("stop");

        // Set states
        doneAnimating = false;
        origin.addClass('active');
        overlayActive = true;

        // Set positioning for placeholder

        placeholder.css('width', originalWidth)
        .css('height', originalHeight)
        .css('position', 'relative')
        .css('top', 0)
        .css('left', 0);

        // Set css on origin
        origin.css('position', 'absolute')
        .css('z-index', 1000)
        .css('will-change', 'left, top');

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
          origin.velocity("stop");
          $('#materialbox-overlay').velocity("stop");
          var placeholder = origin.parent('.material-placeholder');
          var windowWidth = window.innerWidth;
          var windowHeight = window.innerHeight;
          var originalWidth = placeholder[0].getBoundingClientRect().width;
          var originalHeight = placeholder[0].getBoundingClientRect().height;
          // Remove class
          origin.removeClass('active');

          // Reset z-index
          var original_z_index = origin.parent('.material-placeholder').attr('z-index');
          if (!original_z_index) {
            original_z_index = 0;
          }

          $('#materialbox-overlay').fadeOut(outDuration, function(){
            $(this).remove();
            origin.css('z-index', original_z_index);
          });
          // Resize
          origin.velocity({ width: originalWidth}, {duration: outDuration, queue: false, easing: 'easeOutQuad'});
          origin.velocity({ height: originalHeight}, {duration: outDuration, queue: false, easing: 'easeOutQuad'});

          // Reposition Element
          origin.velocity({ left: 0}, {duration: outDuration, queue: false, easing: 'easeOutQuad'});
          origin.velocity({ top: 0 }, {duration: outDuration, queue: false, easing: 'easeOutQuad'});
          origin.css('will-change', '');


          // Remove Caption
          $('.materialbox-caption').velocity({opacity: 0}, {
            duration: outDuration,
            queue: false, easing: 'easeOutQuad',
            complete: function(){
              origin.css({
                height: '',
                position: '',
                top: '',
                left: '',
                width: '',
                'max-width': '',
                'z-index': ''

              });
              console.log(placeholder);
              placeholder.css({
                height: '',
                width: '',
                position: '',
                top: '',
                left: ''
              });
              // Remove Overlay
              overlayActive = false;
              $(this).remove();

            }
          });      }
        });
};
}( jQuery ));