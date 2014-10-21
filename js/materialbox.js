(function ($) {
  $.fn.materialbox = function () {
    var overlayActive = false;
    var origin = $(this);
    var placeholder = $('<div></div>').addClass('material-placeholder');
    
    origin.wrap(placeholder);
    origin.on('click', function(e){
        // If already modal, do nothing
       if ($('#materialbox-overlay').length != 0) {
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
      overlayActive = true;
      overlay.animate({opacity: 1}, {duration: 550, queue: false, easing: 'easeOutQuint'}
      );
      
      // Reposition Element AND Animate image + set z-index
      var originalWidth = origin.innerWidth();
      var originalHeight =  origin.innerHeight();
      origin.css('left', 0)
        .css('top', 0)
        .css('cursor', 'default')
        .css('z-index', 10000)
        .css('will-change', 'left, top')
        .animate({ left: $(document).scrollLeft() + window.innerWidth/2 - origin.parent('.material-placeholder').offset().left - origin.innerWidth()/2 }, {duration: 550, queue: false, easing: 'easeOutQuint'})
        .animate({ top: $(document).scrollTop() + window.innerHeight/2 - origin.parent('.material-placeholder').offset().top - origin.innerHeight()/2 }, {duration: 550, queue: false, easing: 'easeOutQuint'});

    });
    
    // Return on scroll
    $(window).scroll(function() {
      console.log(overlayActive);
      if ($('#materialbox-overlay').length != 0) {
        returnToOriginal();    
      }
    });
    
    
    // This function returns the modaled image to the original spot
    function returnToOriginal() {
        // Remove Overlay
        overlayActive = false;
        $('#materialbox-overlay').fadeOut(350, function(){$(this).remove()});
        // Reposition Element
        origin.animate({ left: 0}, {duration: 350, queue: false, easing: 'easeOutQuint'});
        origin.animate({ top: 0 }, {duration: 350, queue: false, easing: 'easeOutQuint'});
        // Reset z-index
        origin.css('z-index', origin.parent('.material-placeholder').attr('z-index'))
        .css('will-change', '')
        .css('cursor', 'pointer');  
    };
    
  };
}( jQuery ));