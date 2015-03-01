(function(factory) {
    if (typeof define === 'function' && define.amd == false) {
        // hammerjs will already be publicly available
        define(['jquery'], function($) {
          if (typeof Hammer !== 'undefined') {
            factory($, Hammer);
          } else {
            console.error('Hammer isn\'t found globaly, if you want to use it please append it');
          }
          // fix waves effect when used with require,
          // both waves and require use the same event so only one fires,
          // the waves event listener never gets called, so that's why we are doing it manually
          if (typeof Waves !== 'undefined') {
            Waves.displayEffect();
          } else {
            console.error('Waves isn\'t loaded, if you want to use it please append it');
          }
        });
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else if (typeof define === 'function' && define.amd) {
        // just for backup, might never be used
        // if it was needed explicitly and used with requirejs
        define(['jquery', 'hammerjs'], function($, Hammer) {
          factory($, Hammer);
          // fix waves effect when used with require,
          // both waves and require use the same event so only one fires,
          // the waves event listener never gets called, so that's why we are doing it manually
          Waves.displayEffect();
        });
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
