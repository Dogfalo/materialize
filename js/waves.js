
/*!
 * Waves v0.5.3
 * http://fian.my.id/Waves 
 * 
 * Copyright 2014 Alfiana E. Sibuea and other contributors 
 * Released under the MIT license 
 * https://github.com/fians/Waves/blob/master/LICENSE 
 */

;(function(window) {
    'use strict';

    var Waves = Waves || {};
    var $$ = document.querySelectorAll.bind(document);

    // Find exact position of element
    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {

        var docElem, win,
            box = {top: 0, left: 0},
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {

        var style = '';

        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }

        return style;
    }

    var Effect = {

        // Effect delay
        duration: 700,

        show: function(e) {
            
            // Disable right click
            if (e.button === 2) {
              return false;
            }
          
            var el = this;

            // Create ripple
            var ripple = document.createElement('div');
            ripple.className = 'waves-ripple';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos         = offset(el);
            var relativeY   = (e.pageY - pos.top);
            var relativeX   = (e.pageX - pos.left);
            var scale       = 'scale('+((el.clientWidth / 100) * 2.5)+')';
            // var scale = 'scale(15)';
          
            // Support for touch devices
            if ('touches' in e) {
              relativeY   = (e.touches[0].pageY - pos.top);
              relativeX   = (e.touches[0].pageX - pos.left);
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                'top': relativeY+'px',
                'left': relativeX+'px'
            };
            
            ripple.className = ripple.className + ' waves-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('waves-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity   = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration']    = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration']      = Effect.duration + 'ms';
            rippleStyle['transition-duration']         = Effect.duration + 'ms';

            ripple.setAttribute('style', convertStyle(rippleStyle));

        },

        hide: function() {
            
            var el = this;

            var width = el.clientWidth * 1.4;
            
            // Get first ripple
            var ripple = null;

            var childrenLength = el.children.length;

            for (var a = 0; a < childrenLength; a++) {
                if (el.children[a].className.indexOf('waves-ripple') !== -1) {
                    ripple = el.children[a];
                    continue;
                }
            }

            if (!ripple) {
                return false;
            }

            var relativeX   = ripple.getAttribute('data-x');
            var relativeY   = ripple.getAttribute('data-y');
            var scale       = ripple.getAttribute('data-scale');

            // Get delay beetween mousedown and mouse leave
            var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
            var delay = 500 - diff;

            if (delay < 0) {
                delay = 0;
            }

            // Fade out ripple after delay
            setTimeout(function() {

                var style = {
                    'top': relativeY+'px',
                    'left': relativeX+'px',
                    'opacity': '0',

                    // Duration
                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    'transform': scale,
                };

                ripple.setAttribute('style', convertStyle(style));

                setTimeout(function() {

                    try {
                        el.removeChild(ripple);
                    } catch(e) {
                        return false;
                    }

                    
                }, Effect.duration);

            }, delay);

        },

        // Little hack to make <input> can perform waves effect
        wrapInput: function(elements) {

            for (var a = 0; a < elements.length; a++) {

                var el = elements[a];

                if (el.tagName.toLowerCase() === 'input') {

                    var parent = el.parentNode;

                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
                        return false;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' waves-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);
                    
                    el.className = 'waves-button-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);

                }
                
            }
        }
    };

    Waves.displayEffect = function(options) {

        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }
        
        //Wrap input inside <i> tag
        Effect.wrapInput($$('.waves-effect'));

        Array.prototype.forEach.call($$('.waves-effect'), function(i) {

        if ('ontouchstart' in window) {
          i.addEventListener('mouseup', Effect.hide, false);                      i.addEventListener('touchstart', Effect.show, false);
          i.addEventListener('mouseleave', Effect.hide, false);                   i.addEventListener('touchend',   Effect.hide, false);
          i.addEventListener('touchcancel',   Effect.hide, false);
        } else {
          i.addEventListener('mousedown', Effect.show, false);
          i.addEventListener('mouseup', Effect.hide, false);
          i.addEventListener('mouseleave', Effect.hide, false);
        }

        });

    };

    window.Waves = Waves;

    $(document).ready(function() {
      Waves.displayEffect();
    });

})(window);