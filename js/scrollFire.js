(function($) {

  // Input: Array of JSON objects {selector, offset, callback}

  Materialize.scrollFire = function(options) {

    var didScroll = false;

    window.addEventListener("scroll", function() {
      didScroll = true;
    });

    // Rate limit to 100ms
    setInterval(function() {
      if(didScroll) {
          didScroll = false;

          var windowScroll = window.pageYOffset + window.innerHeight;

          for (var i = 0 ; i < options.length; i++) {
            // Get options from each line
            var value = options[i];
            var selector = value.selector,
                offset = value.offset,
                callback = value.callback;

            var currentElement = document.querySelector(selector);
            if ( currentElement !== null) {
              var elementOffset = currentElement.getBoundingClientRect().top + document.body.scrollTop;

              if (windowScroll > (elementOffset + offset)) {
                if (value.done != true) {
                  var callbackFunc = new Function(callback);
                  callbackFunc();
                  value.done = true;
                }
              }
            }
          };
      }
    }, 100);


    // $(window).scroll(function () {
    //   var windowScroll = $(window).scrollTop() + $(window).height();

    //   $.each( options, function( i, value ){
    //     var selector = value.selector,
    //         offset = value.offset,
    //         callback = value.callback;

    //     if ($(selector).length != 0) {
    //       var elementOffset = $(selector).offset().top;

    //       if (windowScroll > (elementOffset + offset)) {
    //         if (value.done != true) {
    //           var callbackFunc = new Function(callback);
    //           callbackFunc();
    //           value.done = true;
    //         }
    //       }
    //     }

    //   });
    // });

  }

})(jQuery);