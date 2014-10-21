(function ($) {
  $.fn.materialbox = function () {
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
        .css('top', origin.offset().top)
        .css('left', origin.offset().left)
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
        .click(function(){
          returnToOriginal();
        })
      $('body').append(overlay);
      overlay.animate({opacity: 1}, {duration: 550, queue: false, easing: 'easeOutQuart'}
      );
      
      // Reposition Element AND Animate image + set z-index
      var originalWidth = origin.innerWidth();
      var originalHeight =  origin.innerHeight();
      origin.css('left', origin.parent('.material-placeholder').offset().left)
        .css('top', origin.parent('.material-placeholder').offset().top)
        .css('cursor', 'default')
        .css('z-index', 10000)
        .css('will-change', 'margin-left, margin-top')
        .animate({ marginLeft: $(document).scrollLeft() + window.innerWidth/2 - origin.parent('.material-placeholder').innerWidth()/2 - origin.parent('.material-placeholder').offset().left}, {duration: 550, queue: false, easing: 'easeOutQuart'})
        .animate({ marginTop: $(document).scrollTop() + window.innerHeight/2 - origin.parent('.material-placeholder').innerHeight()/2 - origin.parent('.material-placeholder').offset().top}, {duration: 550, queue: false, easing: 'easeOutQuart'});

    });
    
    // Return on scroll
    $(window).scroll(function() {
      if ($('#materialbox-overlay').length != 0) {
        returnToOriginal();    
      }
    });
    
    
    // This function returns the modaled image to the original spot
    function returnToOriginal() {
        // Remove Overlay
        $('#materialbox-overlay').fadeOut(350, function(){$(this).remove()});
        // Reposition Element
        origin.animate({ marginLeft: 0}, {duration: 350, queue: false, easing: 'easeOutQuart'});
        origin.animate({ marginTop: 0}, {duration: 350, queue: false, easing: 'easeOutQuart'});
        // Reset z-index
        origin.css('z-index', origin.parent('.material-placeholder').attr('z-index'))
        .css('will-change', '')
        .css('cursor', 'pointer');
    };
    
  };
}( jQuery ));