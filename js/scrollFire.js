(function($) {

  // Input: Array of JSON objects {selector, offset, callback}

  scrollFire = function(options) {
    $(window).scroll(function () {
      var windowScroll = $(window).scrollTop() + $(window).height();

      $.each( options, function( i, value ){
        var selector = value.selector,
            offset = value.offset,
            callback = value.callback;

        var elementOffset = $(selector).offset().top;

        if (windowScroll > (elementOffset + offset)) {
          if ($(selector).data('done') === undefined) {
            var callbackFunc = new Function(callback);
            callbackFunc();

            $(selector).data('done', true);
          }
        }

      });
    });
  }

})(jQuery);