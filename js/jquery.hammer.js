(function(factory) {
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'hammerjs'], function($, Hammer) {
      factory($, Hammer);
      // fix waves effect when used with require,
      // both waves and require use the same event so only one fires,
      // the waves event listener never gets called, so that's why we are doing it manually
      Waves.displayEffect();
    });
  } else if (typeof exports === 'object') {
    factory(require('jquery'), require('hammerjs'));
  } else {
    factory(jQuery, Hammer);
  }
}(function($, Hammer) {
  function hammerify(el, options) {
    var $el = $(el);
    if(!$el.data("hammer")) {
      $el.data("hammer", new Hammer($el[0], options));
    }
  }

  $.fn.hammer = function(options) {
    return this.each(function() {
      hammerify(this, options);
    });
  };

  // extend the emit method to also trigger jQuery events
  Hammer.Manager.prototype.emit = (function(originalEmit) {
    return function(type, data) {
      originalEmit.call(this, type, data);
      $(this.element).trigger({
        type: type,
        gesture: data
      });
    };
  })(Hammer.Manager.prototype.emit);
}));
