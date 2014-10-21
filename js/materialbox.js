(function ($) {
  $.fn.materialbox = function () {
    var overlayActive = false;
    var doneAnimating = true;
    var origin = $(this);
    var placeholder = $('<div></div>').addClass('material-placeholder');
    
    origin.wrap(placeholder);
    origin.on('click', function(e){
        // If already modal, do nothing
       if (overlayActive || doneAnimating == false) {
        return;
       }
      
      
      // Set positioning for placeholder
      origin.parent('.material-placeholder').css('width', origin.innerWidth())
        .css('height', origin.innerHeight())
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
        })
      $('body').append(overlay);
      overlay.animate({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad'}
      );
      
      // Set states
      overlayActive = true;
      doneAnimating = false;
      
      // Reposition Element AND Animate image + set z-index
      var originalWidth = origin.innerWidth();
      var originalHeight =  origin.innerHeight();
      origin.css('left', 0)
        .css('top', 0)
        .css('cursor', 'default')
        .css('z-index', 10000)
        .css('will-change', 'left, top')
        .animate({ left: $(document).scrollLeft() + window.innerWidth/2 - origin.parent('.material-placeholder').offset().left - origin.innerWidth()/2 }, {duration: 300, queue: false, easing: 'easeOutQuad'})
        .animate({ top: $(document).scrollTop() + window.innerHeight/2 - origin.parent('.material-placeholder').offset().top - origin.innerHeight()/2 }, {duration: 300, queue: false, easing: 'easeOutQuad', complete: function(){doneAnimating = true;} });

    });
    
    // Return on scroll
    $(window).scroll(function() {
      if (overlayActive) {
        returnToOriginal();    
      }
    });
    
    // Return on ESC
    $(document).keyup(function(e) {

      if (e.keyCode == 27) {   // ESC key
        if (overlayActive) {
        returnToOriginal();    
      }
      }
    });
    
    
    // This function returns the modaled image to the original spot
    function returnToOriginal() {
        // Remove Overlay
        overlayActive = false;
        $('#materialbox-overlay').fadeOut(275, function(){$(this).remove()});
        // Reposition Element
        origin.animate({ left: 0}, {duration: 275, queue: false, easing: 'easeInOutQuad'});
        origin.animate({ top: 0 }, {duration: 275, queue: false, easing: 'easeInOutQuad'});
        // Reset z-index
        origin.css('z-index', origin.parent('.material-placeholder').attr('z-index'))
        .css('will-change', '')
        .css('cursor', 'pointer');  
    };
    
  };
}( jQuery ));