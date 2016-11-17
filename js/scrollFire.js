(function($) {

  var timerInterval = 100;
  var handlers = [];
  var listening = false;

  function startScrollListener() {
    var didScroll = false;
    var scrollListener = function () {
      didScroll = true;
    };
    var timer = setInterval(funciton () {
      if (didScroll) {
        didScroll = false;

        var windowScroll = window.pageYOffset + window.innerHeight;

        for (var i = 0, len = handlers.length; i < len; ++i) {
          // Get options from each line
          var value = handlers[i];
          var selector = value.selector,
              offset = value.offset || 0,
              callback = value.callback;
          var currentElement = document.querySelector(selector);

          if (currentElement !== null) {
            var elementOffset = currentElement.getBoundingClientRect().top + window.pageYOffset;

            if (windowScroll > (elementOffset + offset)) {
              if (typeof(callback) === 'function') {
                callback.call(this, currentElement);
              } else if (typeof(callback) === 'string') {
                var callbackFunc = new Function(callback);
                callbackFunc(currentElement);
              }

              handlers.splice(i, 1);
              len = len - 1;
              i = i - 1;
            }
          }
        }

        if (!handlers.length) {
          // stop listening if no more handlers
          clearTimeout(timer);
          window.removeEventListener('scroll', scrollListener);
        }
      }
    }, timerInterval);

    window.addEventListener('scroll', scrollListener);

    listening = true;
  }


  // Input: Array of JSON objects {selector, offset, callback}

  Materialize.scrollFire = function scrollFire(options) {
    handlers.push.apply(handlers, options || []);

    listening || startScrollListener();
  };

})(jQuery);
