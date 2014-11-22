(function ($) {
  $.fn.dropdown = function () {
    var origin = $(this);

    var activates = $("#"+ origin.attr('data-activates'));

    activates.hide(0);

    origin.on('click', openDropdown);

    activates.on('click', closeDropdown);
    activates.on('mouseleave', closeDropdown);

    // Window Resize Reposition
    $(window).on('resize', function(){
      if (origin.is(':visible')) {
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
      }
    });

    function openDropdown(e) {
      activates.css('width', origin.innerWidth());
      activates.css('top', origin.offset().top);
      activates.css('left', origin.offset().left);
      activates.show({duration: 200, easing: 'easeOutCubic'});
    }

    function closeDropdown(e) {
      activates.hide({ duration: 150, easing: 'easeOutCubic' });
    }
  };
}( jQuery ));