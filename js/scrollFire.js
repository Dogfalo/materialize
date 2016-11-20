(function($) {

  /* Input: options - Array of JSON objects {selector, offset, callback}
            evaluateOnLoad - Override that tells scrollfire to evaluate items 
                              on page load.
  */
  Materialize.scrollFire = function(options, evaluateOnLoad) {

    var didScroll = false || evaluateOnLoad;

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
              var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

              if (windowScroll > (elementOffset + offset)) {
                if (value.done !== true) {
                  if (typeof(callback) === 'function') {
                    callback.call(this, currentElement);
                  } else if (typeof(callback) === 'string') {
                    var callbackFunc = new Function(callback);
                    callbackFunc(currentElement);
                  }
                  value.done = true;
                }
              }
            }
          }
      }
    }, 100);
  };

})(jQuery);
