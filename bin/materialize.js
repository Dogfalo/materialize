










;/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */;(function ($) {
  $.fn.collapsible = function(options) {
    var defaults = {
        accordion: true
    };

    options = $.extend(defaults, options);
    var $this = $(this);
    
    var $panel_headers = $(this).find('.collapsible-header');
  
    if (defaults.accordion) {

      $panel_headers.each(function () {
        $(this).click(function () {
          $(this).parent().toggleClass('active');
          console.log($(this).siblings('.collapsible-body'));
          $(this).siblings('.collapsible-body').slideToggle({ duration: 300, easing: "easeOutCubic", queue: false});
          $panel_headers.not($(this)).parent().removeClass('active');
          $panel_headers.not($(this)).parent().children('.collapsible-body').slideUp({ duration: 300, easing: "easeOutCubic", queue: false});
        });
      });

    }
    else {
      $panel_headers.each(function () {
        $(this).click(function () {
          $(this).parent().toggleClass('active');
          $(this).siblings('.collapsible-body').slideToggle({ duration: 300, easing: "easeOutCubic", queue: false});
        });
      });
    }


    
    
  };
}( jQuery ));(function ($) {
  $.fn.dropdown = function () {
    var origin = $(this);
    
  
    var activates = $("#"+ origin.attr('data-activates'));

    activates.hide(0);

    
    // Click handler for list container
    origin.on('mouseover', function(e){ // Mouse over
      activates.css('width', origin.innerWidth());
      activates.css('top', origin.offset().top);
      activates.css('left', origin.offset().left);
      activates.show({duration: 200, easing: 'easeOutCubic'});
    });
    
    // Doucment click handler        
    activates.on('mouseleave', function(e){ // Mouse out
          activates.hide({duration: 150, easing: 'easeOutCubic'});
    });
    
    // Window Resize Reposition
    $(window).on('resize', function(){
      if (origin.is(':visible')) {
        activates.css('top', origin.offset().top);
        activates.css('left', origin.offset().left);
      }
    });
    
    
  };
}( jQuery ));(function($){
 
    $.fn.extend({ 
         
        leanModal: function(options) {
 
            var defaults = {
                top: 100,
                overlay: 0.5
            }
            
            var overlay = $("<div id='lean_overlay'></div>");
            
            $("body").append(overlay);
                 
            options =  $.extend(defaults, options);
 
            return this.each(function() {
            
                var o = options;
               
                $(this).click(function(e) {
              
              	var modal_id = $(this).attr("href");

				$("#lean_overlay").click(function() { 
                     close_modal(modal_id);                    
                });
                
                $(modal_id).find('.modal_close').click(function(e) { 
                    e.preventDefault();
                    close_modal(modal_id);
                    // setTimeout( function(){ close_modal(modal_id); },200 );               
                });
                         	
              	var modal_height = $(modal_id).outerHeight();
        	  	var modal_width = $(modal_id).outerWidth();

        		$('#lean_overlay').css({ 'display' : 'block', opacity : 0 });

        		$('#lean_overlay').fadeTo(200,o.overlay);

        		$(modal_id).css({ 
        		
        			'display' : 'block',
        			'position' : 'fixed',
        			'opacity' : 0,
        			'z-index': 11000,
        			'left' : 50 + '%',
        			'margin-left' : -(modal_width/2) + "px"
        		
        		});

        		$(modal_id).animate({"top" : o.top + "px"
                            , opacity: 1}, {duration: 300, easing: 'easeOutExpo'});

                e.preventDefault();
                		
              	});
             
            });

			function close_modal(modal_id){

        		$("#lean_overlay").fadeOut(200);

                $(modal_id).fadeOut(200, function() {
                    $(this).css('top', 0);
                });
                
        		// $(modal_id).css({ 'display' : 'none' });
			
			}
    
        }
    });
     
})(jQuery);(function ($) {

  $.fn.materialbox = function () {

    return this.each(function() {

      var overlayActive = false;
      var doneAnimating = true;
      var inDuration = 250;
      var outDuration = 200;
      var origin = $(this);
      var placeholder = $('<div></div>').addClass('material-placeholder');
      var originalWidth = origin.width();
      var originalHeight = origin.height(); 

      origin.wrap(placeholder);
      origin.on('click', function(){
        

        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        
          // If already modal, do nothing
         if (overlayActive || doneAnimating === false) {
           returnToOriginal();
           return false;
         }
        
        // add active class
        origin.addClass('active');
        originalWidth = origin.width();
        originalHeight = origin.height();

        
        // Set positioning for placeholder
        origin.parent('.material-placeholder').css('width', origin.innerWidth())
          .css('height', originalHeight)
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
          });
        $('body').append(overlay);
        overlay.animate({opacity: 1}, {duration: inDuration, queue: false, easing: 'easeOutQuad'}
        );
        
        // Set states
        overlayActive = true;
        doneAnimating = false;

        
        // Resize Image      
        var ratio = originalWidth / originalHeight;
        var widthPercent = originalWidth / windowWidth;
        var heightPercent = originalWidth / windowHeight;
        var newWidth = 0;
        var newHeight = 0;

        if (widthPercent > heightPercent) {
          newWidth = windowWidth * 0.9;
          newHeight = windowWidth * 0.9 * ratio;
        }
        else {
          newWidth = (windowHeight * 0.9) * ratio;
          newHeight = windowHeight * 0.9;
        }

        console.log(originalWidth, originalHeight, ratio, newHeight, newWidth);

        // Reposition Element AND Animate image + set z-index
        origin.css('left', 0)
          .css('top', 0)
          .css('z-index', 1000)
          .css('will-change', 'left, top')
          .animate({ height: newHeight, width: newWidth }, {duration: inDuration, queue: false, easing: 'easeOutQuad'})
          .animate({ left: $(document).scrollLeft() + windowWidth/2 - origin.parent('.material-placeholder').offset().left - newWidth/2 }, {duration: inDuration, queue: false, easing: 'easeOutQuad'})
          .animate({ top: $(document).scrollTop() + windowHeight/2 - origin.parent('.material-placeholder').offset().top - newHeight/ 2}, {duration: inDuration, queue: false, easing: 'easeOutQuad', complete: function(){doneAnimating = true;} });
        });

      
      // Return on scroll
      $(window).scroll(function() {
        if (overlayActive) {
          returnToOriginal();    
        }
      });
      
      // Return on ESC
      $(document).keyup(function(e) {

        if (e.keyCode === 27) {   // ESC key
          if (overlayActive) {
            returnToOriginal();    
          }
        }
      });
      
      
      // This function returns the modaled image to the original spot
      function returnToOriginal() {
          // Reset z-index
          var original_z_index = origin.parent('.material-placeholder').attr('z-index');
          if (!original_z_index) {
            original_z_index = 0;
          }
          // Remove Overlay
          overlayActive = false;
          $('#materialbox-overlay').fadeOut(outDuration, function(){ 
            $(this).remove(); 
            origin.css('z-index', original_z_index);
          });
          // Resize
          origin.animate({ width: originalWidth}, {duration: outDuration, queue: false, easing: 'easeOutQuad'});
          origin.animate({ height: originalHeight}, {duration: outDuration, queue: false, easing: 'easeOutQuad'});

          // Reposition Element
          origin.animate({ left: 0}, {duration: outDuration, queue: false, easing: 'easeOutQuad'});
          origin.animate({ top: 0 }, {duration: outDuration, queue: false, easing: 'easeOutQuad'});
          origin.css('will-change', '');
          // add active class
          origin.removeClass('active');
      }
    });
  };
}( jQuery ));
(function ($) {

    $.fn.parallax = function () {
      var window_width = $(window).width();
      // Parallax Scripts
      return this.each(function() {
        var $this = $(this);
        $this.addClass('parallax');

        function updateParallax() {
          if (window_width > 480) {
            var height = $this.height();
            var bottom = $this.offset().top + height;
            var top = $this.offset().top;
            var windowHeight = $(window).height();
            var scrollTop = $(window).scrollTop();
            var fromTop = scrollTop + top - (windowHeight / 2);

            if ((bottom > scrollTop) && (top < (scrollTop + windowHeight))) {   
              var parallax = fromTop / 3;
              
              $this.children("img").first().css('top', parallax + "px");
            }

          }
        }
        updateParallax();
        
        $(window).scroll(function() {
          updateParallax();
        });

      });

    };
}( jQuery ));/**
 * Extend jquery with a scrollspy plugin.
 * This watches the window scroll and fires events when elements are scrolled into viewport.
 *
 * throttle() and getTime() taken from Underscore.js
 * https://github.com/jashkenas/underscore
 *
 * @author Copyright 2013 John Smart
 * @license https://raw.github.com/thesmart/jquery-scrollspy/master/LICENSE
 * @see https://github.com/thesmart
 * @version 0.1.2
 */
(function($) {

	var jWindow = $(window);
	var elements = [];
	var elementsInView = [];
	var isSpying = false;
	var ticks = 0;
	var unique_id = 1;
	var offset = {
		top : 0,
		right : 0,
		bottom : 0,
		left : 0,
	}

	/**
	 * Find elements that are within the boundary
	 * @param {number} top
	 * @param {number} right
	 * @param {number} bottom
	 * @param {number} left
	 * @return {jQuery}		A collection of elements
	 */
	function findElements(top, right, bottom, left) {
		var hits = $();
		$.each(elements, function(i, element) {
			if (element.height() > 0) {
				var elTop = element.offset().top,
					elLeft = element.offset().left,
					elRight = elLeft + element.width(),
					elBottom = elTop + element.height();

				var isIntersect = !(elLeft > right ||
					elRight < left ||
					elTop > bottom ||
					elBottom < top);

				if (isIntersect) {
					hits.push(element);
				}				
			}
		});

		return hits;
	}


	/**
	 * Called when the user scrolls the window
	 */
	function onScroll() {
		// unique tick id
		++ticks;

		// viewport rectangle
		var top = jWindow.scrollTop(),
			left = jWindow.scrollLeft(),
			right = left + jWindow.width(),
			bottom = top + jWindow.height();

		// determine which elements are in view
		var intersections = findElements(top+offset.top, right+offset.right, bottom+offset.bottom, left+offset.left);
		$.each(intersections, function(i, element) {

			var lastTick = element.data('scrollSpy:ticks');
			if (typeof lastTick != 'number') {
				// entered into view
				element.triggerHandler('scrollSpy:enter');
			}

			// update tick id
			element.data('scrollSpy:ticks', ticks);
		});

		// determine which elements are no longer in view
		$.each(elementsInView, function(i, element) {
			var lastTick = element.data('scrollSpy:ticks');
			if (typeof lastTick == 'number' && lastTick !== ticks) {
				// exited from view
				element.triggerHandler('scrollSpy:exit');
				element.data('scrollSpy:ticks', null);
			}
		});

		// remember elements in view for next tick
		elementsInView = intersections;
	}

	/**
	 * Called when window is resized
	*/
	function onWinSize() {
		jWindow.trigger('scrollSpy:winSize');
	}

	/**
	 * Get time in ms
   * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @type {function}
	 * @return {number}
	 */
	var getTime = (Date.now || function () {
		return new Date().getTime();
	});

	/**
	 * Returns a function, that, when invoked, will only be triggered at most once
	 * during a given window of time. Normally, the throttled function will run
	 * as much as it can, without ever going more than once per `wait` duration;
	 * but if you'd like to disable the execution on the leading edge, pass
	 * `{leading: false}`. To disable execution on the trailing edge, ditto.
	 * @license https://raw.github.com/jashkenas/underscore/master/LICENSE
	 * @param {function} func
	 * @param {number} wait
	 * @param {Object=} options
	 * @returns {Function}
	 */
	function throttle(func, wait, options) {
		var context, args, result;
		var timeout = null;
		var previous = 0;
		options || (options = {});
		var later = function () {
			previous = options.leading === false ? 0 : getTime();
			timeout = null;
			result = func.apply(context, args);
			context = args = null;
		};
		return function () {
			var now = getTime();
			if (!previous && options.leading === false) previous = now;
			var remaining = wait - (now - previous);
			context = this;
			args = arguments;
			if (remaining <= 0) {
				clearTimeout(timeout);
				timeout = null;
				previous = now;
				result = func.apply(context, args);
				context = args = null;
			} else if (!timeout && options.trailing !== false) {
				timeout = setTimeout(later, remaining);
			}
			return result;
		};
	};

	/**
	 * Enables ScrollSpy using a selector
	 * @param {jQuery|string} selector  The elements collection, or a selector
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
	$.scrollSpy = function(selector, options) {
		var visible = [];
		selector = $(selector);
		selector.each(function(i, element) {
			elements.push($(element));
			$(element).data("scrollSpy:id", i);
			// Smooth scroll to section
		  $('a[href^=#' + $(element).attr('id') + ']').click(function(e) {
		    e.preventDefault();
		    console.log("click");
		    var offset = $(this.hash).offset().top + 1;
		    $('html, body').animate({ scrollTop: offset }, {duration: 400, easing: 'easeOutCubic'});
		  });		
		});
		options = options || {
			throttle: 100
		};

		offset.top = options.offsetTop || 0;
		offset.right = options.offsetRight || 0;
		offset.bottom = options.offsetBottom || 0;
		offset.left = options.offsetLeft || 0;

		var throttledScroll = throttle(onScroll, options.throttle || 100);
		var readyScroll = function(){
			$(document).ready(throttledScroll);
		};

		if (!isSpying) {
			jWindow.on('scroll', readyScroll);
			jWindow.on('resize', readyScroll);
			isSpying = true;
		}

		// perform a scan once, after current execution context, and after dom is ready
		setTimeout(readyScroll, 0);


		selector.on('scrollSpy:enter', function() {
			visible = $.grep(visible, function(value) {
	      return value.height() != 0;
	    });

			var $this = $(this);

			if (visible[0]) {
				$('a[href^=#' + visible[0].attr('id') + ']').removeClass('active');
				if ($this.data('scrollSpy:id') < visible[0].data('scrollSpy:id')) {
					visible.unshift($(this));
				}
				else {
					visible.push($(this));				
				}
			}
			else {
				visible.push($(this));				
			}

			$('a[href^=#' + visible[0].attr('id') + ']').addClass('active');
		});
		selector.on('scrollSpy:exit', function() {
			visible = $.grep(visible, function(value) {
	      return value.height() != 0;
	    });

			if (visible[0]) {
				$('a[href^=#' + visible[0].attr('id') + ']').removeClass('active');
				var $this = $(this);
				visible = $.grep(visible, function(value) {
	        return value.attr('id') != $this.attr('id');
	      });
			}
			$('a[href^=#' + visible[0].attr('id') + ']').addClass('active');
		});

		return selector;
	};

	/**
	 * Listen for window resize events
	 * @param {Object=} options						Optional. Set { throttle: number } to change throttling. Default: 100 ms
	 * @returns {jQuery}		$(window)
	 */
	$.winSizeSpy = function(options) {
		$.winSizeSpy = function() { return jWindow; }; // lock from multiple calls
		options = options || {
			throttle: 100
		};
		return jWindow.on('resize', throttle(onWinSize, options.throttle || 100));
	};

	/**
	 * Enables ScrollSpy on a collection of elements
	 * e.g. $('.scrollSpy').scrollSpy()
	 * @param {Object=} options	Optional.
											throttle : number -> scrollspy throttling. Default: 100 ms
											offsetTop : number -> offset from top. Default: 0
											offsetRight : number -> offset from right. Default: 0
											offsetBottom : number -> offset from bottom. Default: 0
											offsetLeft : number -> offset from left. Default: 0
	 * @returns {jQuery}
	 */
	$.fn.scrollSpy = function(options) {
		return $.scrollSpy($(this), options);
	};

})(jQuery);(function ($) {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    var keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;  
    }

    function keydown(e) {
        for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                preventDefault(e);
                return;
            }
        }
    }

    function wheel(e) {
      preventDefault(e);
    }

    function disable_scroll() {
      if (window.addEventListener) {
          window.addEventListener('DOMMouseScroll', wheel, false);
      }
      window.onmousewheel = document.onmousewheel = wheel;
      document.onkeydown = keydown;
    }

    function enable_scroll() {
        if (window.removeEventListener) {
            window.removeEventListener('DOMMouseScroll', wheel, false);
        }
        window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
    }

    $.fn.sideNav = function () {
      var $this = $(this);
      var menu_id = $("#"+ $this.attr('data-activates'));

      function removeMenu() {
        $('#sidenav-overlay').animate({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad', 
          complete: function() {
            $(this).remove();
          } });
        menu_id.removeClass('active');
        enable_scroll();
      }

      $this.click(function() {
        if (menu_id.hasClass('active')) {
          removeMenu();
        }
        else {
          disable_scroll();
          menu_id.addClass('active');

          var overlay = $('<div id="sidenav-overlay"></div>');
          overlay.css('width', $(document).width() + 100) // account for any scrollbar
            .css('height', $(document).height() + 100) // account for any scrollbar
            .css('top', 0)
            .css('left', 0)
            .css('opacity', 0)
            .css('will-change', 'opacity')
            .click(function(){
              removeMenu();
              overlay.animate({opacity: 0}, {duration: 300, queue: false, easing: 'easeOutQuad', 
                complete: function() {
                  $(this).remove();
                } });
              
            });
          $('body').append(overlay);
          overlay.animate({opacity: 1}, {duration: 300, queue: false, easing: 'easeOutQuad'}
          );
        }


        return false;
      });


    };
}( jQuery ));(function ($) {
    
  $.fn.tabs = function () {

    return this.each(function() {

    // For each set of tabs, we want to keep track of
    // which tab is active and its associated content
    var $this = $(this);
    var window_width = $(window).width();

    $this.width('100%');
    // Set Tab Width for each tab
    var $num_tabs = $(this).children('li').length;
    $this.children('li').each(function() {
      $(this).width((100/$num_tabs)+'%');
    });
    var $active, $content, $links = $this.find('li.tab a');
    var $tabs_width = $this.width();
    var $tab_width = $this.find('li').first().outerWidth();
    var $index = 0;
    
    // If the location.hash matches one of the links, use that as the active tab.
    // If no match is found, use the first link as the initial active tab.
    $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
    $active.addClass('active');
    $index = $links.index($active);
    if ($index < 0) {
      $index = 0;
    }
      console.log("Resize index", $index, $links);

    $content = $($active[0].hash);
    
    // append indicator then set indicator width to tab width
    $this.append('<div class="indicator"></div>');
    var $indicator = $this.find('.indicator');
    if ($this.is(":visible")) {
      $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
      $indicator.css({"left": $index * $tab_width});
    }
    $(window).resize(function () {
      $tabs_width = $this.width();
      $tab_width = $this.find('li').first().outerWidth();    
      if ($index < 0) {
        $index = 0;
      }  
      if ($tab_width !== 0 && $tabs_width !== 0) {
        $indicator.css({"right": $tabs_width - (($index + 1) * $tab_width)});
        $indicator.css({"left": $index * $tab_width});
      }
    });

    // Hide the remaining content
    $links.not($active).each(function () {
      $(this.hash).hide();
    });
    
    // Bind the click event handler
    $this.on('click', 'a', function(e){
      $tabs_width = $this.width();
      $tab_width = $this.find('li').first().outerWidth();

      // Make the old tab inactive.
      $active.removeClass('active');
      $content.hide();
    
      // Update the variables with the new link and content
      $active = $(this);
      $content = $(this.hash);
      $links = $this.find('li.tab a');
    
      // Make the tab active.
      $active.addClass('active');
      var $prev_index = $index;
      $index = $links.index($(this));
      if ($index < 0) {
        $index = 0;
      }
      // Change url to current tab
      window.location.hash = $active.attr('href');
      if (location.hash) {
        window.scrollTo(0, 0);
      }
      
      $content.show();

      // Update indicator
      if (($index - $prev_index) >= 0) {
        $indicator.animate({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 325, queue: false, easing: 'easeOutQuad'});
        setTimeout(function(){
          $indicator.animate({"left": $index * $tab_width}, {duration: 300, queue: false, easing: 'easeOutQuad'});
        }, 50);
      }
      else {
        $indicator.animate({"left": $index * $tab_width}, {duration: 325, queue: false, easing: 'easeOutQuad'});
        setTimeout(function(){
          $indicator.animate({"right": $tabs_width - (($index + 1) * $tab_width)}, {duration: 300, queue: false, easing: 'easeOutQuad'});
        }, 20);
      }
    
      // Prevent the anchor's default click action
      e.preventDefault();
    });
  });

  };
}( jQuery ));function toast(message, displayLength) {
    if ($('#toast-container').length == 0) {
        // create notification container
        var container = $('<div></div>')
            .attr('id', 'toast-container');
        $('body').append(container);
    }
    
    // Select and append toast
    var container = $('#toast-container')
    var newToast = createToast(message);
    container.append(newToast);
    
    newToast.animate({"top" : "+35px"
                    , "opacity": 0}, 0);
    newToast.animate({"top" : "0px"
                            , opacity: 1}, {duration: 200, easing: 'easeOutExpo'});
        newToast.delay(displayLength)
        .animate({"opacity": 0}, {duration: 200, easing: 'easeInExpo'})
        .slideUp(200, function(){
            $(this).remove();
        });
    
    
    function createToast(message) {
        var toast = $('<div></div>');
        toast.addClass('toast');
        var text = $('<span></span>');
        text.text(message);
        toast.append(text);
        return toast;
    }
};(function ($) {
    
    var newTooltip;
    var timeout;
    $.fn.tooltip = function () {
        var origin;
        
    };
}( jQuery ));
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
        duration: 500,

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
            var relativeY   = (e.pageY - pos.top) - 10;
            var relativeX   = (e.pageX - pos.left) - 10;
            // var scale       = 'scale('+((el.clientWidth / 100) * 2.5)+')';
            var scale = 'scale(15)';

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
                    var dimensionStyle = 'width:'+el.offsetWidth+'px;height:'+el.clientHeight+'px;';

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', dimensionStyle+elementStyle);
                    
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

            i.addEventListener('mousedown', Effect.show, false);
            i.addEventListener('mouseup', Effect.hide, false);
            i.addEventListener('mouseleave', Effect.hide, false);

        });

    };

    window.Waves = Waves;
    Waves.displayEffect();

})(window);