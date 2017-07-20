/*!
 * ClockPicker v0.0.7 (http://weareoutman.github.io/clockpicker/)
 * Copyright 2014 Wang Shenwei.
 * Licensed under MIT (https://github.com/weareoutman/clockpicker/blob/gh-pages/LICENSE)
 *
 * Further modified
 * Copyright 2015 Ching Yaw Hao.
 */

(function(){
	var $ = window.jQuery,
			$win = $(window),
			$doc = $(document);

	// Can I use inline svg ?
	var svgNS = 'http://www.w3.org/2000/svg',
		  svgSupported = 'SVGAngle' in window && (function() {
			  var supported,
				el = document.createElement('div');
				el.innerHTML = '<svg/>';
				supported = (el.firstChild && el.firstChild.namespaceURI) == svgNS;
				el.innerHTML = '';
				return supported;
			})();

	// Can I use transition ?
	var transitionSupported = (function() {
		var style = document.createElement('div').style;
		return 'transition' in style ||
					 'WebkitTransition' in style ||
				   'MozTransition' in style ||
					 'msTransition' in style ||
					 'OTransition' in style;
	})();

	// Listen touch events in touch screen device, instead of mouse events in desktop.
	var touchSupported = 'ontouchstart' in window,
			mousedownEvent = 'mousedown' + ( touchSupported ? ' touchstart' : ''),
			mousemoveEvent = 'mousemove.clockpicker' + ( touchSupported ? ' touchmove.clockpicker' : ''),
			mouseupEvent = 'mouseup.clockpicker' + ( touchSupported ? ' touchend.clockpicker' : '');

	// Vibrate the device if supported
	var vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

	function createSvgElement(name) {
		return document.createElementNS(svgNS, name);
	}

	function leadingZero(num) {
		return (num < 10 ? '0' : '') + num;
	}

	// Get a unique id
	var idCounter = 0;
	function uniqueId(prefix) {
		var id = ++idCounter + '';
		return prefix ? prefix + id : id;
	}

	// Clock size
	var dialRadius = 135,
			outerRadius = 105,
			// innerRadius = 80 on 12 hour clock
			innerRadius = 80,
			tickRadius = 20,
			diameter = dialRadius * 2,
			duration = transitionSupported ? 350 : 1;

	// Popover template
	var tpl = [
		'<div class="clockpicker picker">',
			'<div class="picker__holder">',
				'<div class="picker__frame">',
					'<div class="picker__wrap">',
						'<div class="picker__box">',
							'<div class="picker__date-display">',
								'<div class="clockpicker-display">',
									'<div class="clockpicker-display-column">',
										'<span class="clockpicker-span-hours text-primary"></span>',
										':',
										'<span class="clockpicker-span-minutes"></span>',
									'</div>',
									'<div class="clockpicker-display-column clockpicker-display-am-pm">',
										'<div class="clockpicker-span-am-pm"></div>',
									'</div>',
								'</div>',
							'</div>',
							'<div class="picker__container__wrapper">',
								'<div class="picker__calendar-container">',
									'<div class="clockpicker-plate">',
										'<div class="clockpicker-canvas"></div>',
										'<div class="clockpicker-dial clockpicker-hours"></div>',
										'<div class="clockpicker-dial clockpicker-minutes clockpicker-dial-out"></div>',
									'</div>',
									'<div class="clockpicker-am-pm-block">',
									'</div>',
								'</div>',
								'<div class="picker__footer">',
								'</div>',
							'</div>',
						'</div>',
					'</div>',
				'</div>',
			'</div>',
		'</div>'
	].join('');

	// ClockPicker
	function ClockPicker(element, options) {
		var popover = $(tpl),
				plate = popover.find('.clockpicker-plate'),
				holder = popover.find('.picker__holder'),
				hoursView = popover.find('.clockpicker-hours'),
				minutesView = popover.find('.clockpicker-minutes'),
				amPmBlock = popover.find('.clockpicker-am-pm-block'),
				isInput = element.prop('tagName') === 'INPUT',
				input = isInput ? element : element.find('input'),
				label = $("label[for=" + input.attr("id") + "]"),
				self = this;

		this.id = uniqueId('cp');
		this.element = element;
		this.holder = holder;
		this.options = options;
		this.isAppended = false;
		this.isShown = false;
		this.currentView = 'hours';
		this.isInput = isInput;
		this.input = input;
		this.label = label;
		this.popover = popover;
		this.plate = plate;
		this.hoursView = hoursView;
		this.minutesView = minutesView;
		this.amPmBlock = amPmBlock;
		this.spanHours = popover.find('.clockpicker-span-hours');
		this.spanMinutes = popover.find('.clockpicker-span-minutes');
		this.spanAmPm = popover.find('.clockpicker-span-am-pm');
		this.footer = popover.find('.picker__footer');
		this.amOrPm = "PM";

		// Setup for for 12 hour clock if option is selected
		if (options.twelvehour) {
			if (!options.ampmclickable) {
				this.spanAmPm.empty();
				$('<div id="click-am">AM</div>').appendTo(this.spanAmPm);
				$('<div id="click-pm">PM</div>').appendTo(this.spanAmPm);
			}
			else {
				this.spanAmPm.empty();
				$('<div id="click-am">AM</div>').on("click", function() {
					self.spanAmPm.children('#click-am').addClass("text-primary");
					self.spanAmPm.children('#click-pm').removeClass("text-primary");
					self.amOrPm = "AM";
				}).appendTo(this.spanAmPm);
				$('<div id="click-pm">PM</div>').on("click", function() {
					self.spanAmPm.children('#click-pm').addClass("text-primary");
					self.spanAmPm.children('#click-am').removeClass("text-primary");
					self.amOrPm = 'PM';
				}).appendTo(this.spanAmPm);
			}
		}

		// Add buttons to footer
		$('<button type="button" class="btn-flat picker__clear" tabindex="' + (options.twelvehour? '3' : '1') + '">' + options.cleartext + '</button>').click($.proxy(this.clear, this)).appendTo(this.footer);
		$('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour? '3' : '1') + '">' + options.canceltext + '</button>').click($.proxy(this.hide, this)).appendTo(this.footer);
		$('<button type="button" class="btn-flat picker__close" tabindex="' + (options.twelvehour? '3' : '1') + '">' + options.donetext + '</button>').click($.proxy(this.done, this)).appendTo(this.footer);

		this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
		this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));

		// Show or toggle
		input.on('focus.clockpicker click.clockpicker', $.proxy(this.show, this));

		// Build ticks
		var tickTpl = $('<div class="clockpicker-tick"></div>'),
				i, tick, radian, radius;

		// Hours view
		if (options.twelvehour) {
			for (i = 1; i < 13; i += 1) {
				tick = tickTpl.clone();
				radian = i / 6 * Math.PI;
				radius = outerRadius;
				tick.css({
					left: dialRadius + Math.sin(radian) * radius - tickRadius,
					top: dialRadius - Math.cos(radian) * radius - tickRadius
				});
				tick.html(i === 0 ? '00' : i);
				hoursView.append(tick);
				tick.on(mousedownEvent, mousedown);
			}
		} else {
			for (i = 0; i < 24; i += 1) {
				tick = tickTpl.clone();
				radian = i / 6 * Math.PI;
				var inner = i > 0 && i < 13;
				radius = inner ? innerRadius : outerRadius;
				tick.css({
					left: dialRadius + Math.sin(radian) * radius - tickRadius,
					top: dialRadius - Math.cos(radian) * radius - tickRadius
				});
				tick.html(i === 0 ? '00' : i);
				hoursView.append(tick);
				tick.on(mousedownEvent, mousedown);
			}
		}

		// Minutes view
		for (i = 0; i < 60; i += 5) {
			tick = tickTpl.clone();
			radian = i / 30 * Math.PI;
			tick.css({
				left: dialRadius + Math.sin(radian) * outerRadius - tickRadius,
				top: dialRadius - Math.cos(radian) * outerRadius - tickRadius
			});
			tick.html(leadingZero(i));
			minutesView.append(tick);
			tick.on(mousedownEvent, mousedown);
		}

		// Clicking on minutes view space
		plate.on(mousedownEvent, function(e) {
			if ($(e.target).closest('.clockpicker-tick').length === 0) {
				mousedown(e, true);
      }
		});

		// Mousedown or touchstart
		function mousedown(e, space) {
			var offset = plate.offset(),
					isTouch = /^touch/.test(e.type),
					x0 = offset.left + dialRadius,
					y0 = offset.top + dialRadius,
					dx = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
					dy = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0,
					z = Math.sqrt(dx * dx + dy * dy),
					moved = false;

			// When clicking on minutes view space, check the mouse position
			if (space && (z < outerRadius - tickRadius || z > outerRadius + tickRadius)) {
				return;
      }
			e.preventDefault();

			// Set cursor style of body after 200ms
			var movingTimer = setTimeout(function(){
				self.popover.addClass('clockpicker-moving');
			}, 200);

			// Clock
			self.setHand(dx, dy, !space, true);

			// Mousemove on document
			$doc.off(mousemoveEvent).on(mousemoveEvent, function(e){
				e.preventDefault();
				var isTouch = /^touch/.test(e.type),
						x = (isTouch ? e.originalEvent.touches[0] : e).pageX - x0,
						y = (isTouch ? e.originalEvent.touches[0] : e).pageY - y0;
				if (! moved && x === dx && y === dy) {
					// Clicking in chrome on windows will trigger a mousemove event
					return;
        }
				moved = true;
				self.setHand(x, y, false, true);
			});

			// Mouseup on document
			$doc.off(mouseupEvent).on(mouseupEvent, function(e) {
				$doc.off(mouseupEvent);
				e.preventDefault();
				var isTouch = /^touch/.test(e.type),
						x = (isTouch ? e.originalEvent.changedTouches[0] : e).pageX - x0,
						y = (isTouch ? e.originalEvent.changedTouches[0] : e).pageY - y0;
				if ((space || moved) && x === dx && y === dy) {
					self.setHand(x, y);
        }

				if (self.currentView === 'hours') {
					self.toggleView('minutes', duration / 2);
        } else if (options.autoclose) {
					self.minutesView.addClass('clockpicker-dial-out');
					setTimeout(function(){
						self.done();
					}, duration / 2);
        }
				plate.prepend(canvas);

				// Reset cursor style of body
				clearTimeout(movingTimer);
				self.popover.removeClass('clockpicker-moving');

				// Unbind mousemove event
				$doc.off(mousemoveEvent);
			});
		}

		if (svgSupported) {
			// Draw clock hands and others
			var canvas = popover.find('.clockpicker-canvas'),
					svg = createSvgElement('svg');
			svg.setAttribute('class', 'clockpicker-svg');
			svg.setAttribute('width', diameter);
			svg.setAttribute('height', diameter);
			var g = createSvgElement('g');
			g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
			var bearing = createSvgElement('circle');
			bearing.setAttribute('class', 'clockpicker-canvas-bearing');
			bearing.setAttribute('cx', 0);
			bearing.setAttribute('cy', 0);
			bearing.setAttribute('r', 4);
			var hand = createSvgElement('line');
			hand.setAttribute('x1', 0);
			hand.setAttribute('y1', 0);
			var bg = createSvgElement('circle');
			bg.setAttribute('class', 'clockpicker-canvas-bg');
			bg.setAttribute('r', tickRadius);
			g.appendChild(hand);
			g.appendChild(bg);
			g.appendChild(bearing);
			svg.appendChild(g);
			canvas.append(svg);

			this.hand = hand;
			this.bg = bg;
			this.bearing = bearing;
			this.g = g;
			this.canvas = canvas;
		}

		raiseCallback(this.options.init);
	}

	function raiseCallback(callbackFunction) {
		if (callbackFunction && typeof callbackFunction === "function")
			callbackFunction();
	}

	// Default options
	ClockPicker.DEFAULTS = {
		'default': '',         // default time, 'now' or '13:14' e.g.
		fromnow: 0,            // set default time to * milliseconds from now (using with default = 'now')
		donetext: 'Ok',      // done button text
		cleartext: 'Clear',
		canceltext: 'Cancel',
		autoclose: false,      // auto close when minute is selected
		ampmclickable: true,  // set am/pm button on itself
		darktheme: false,			 // set to dark theme
		twelvehour: true,      // change to 12 hour AM/PM clock from 24 hour
		vibrate: true          // vibrate the device when dragging clock hand
	};

	// Show or hide popover
	ClockPicker.prototype.toggle = function() {
		this[this.isShown ? 'hide' : 'show']();
	};

	// Set popover position
	ClockPicker.prototype.locate = function() {
		var element = this.element,
				popover = this.popover,
				offset = element.offset(),
				width = element.outerWidth(),
				height = element.outerHeight(),
				align = this.options.align,
				self = this;

		popover.show();
	};

	// Show popover
	ClockPicker.prototype.show = function(e){
		// Not show again
		if (this.isShown) {
			return;
		}
		raiseCallback(this.options.beforeShow);
		$(':input').each(function() {
			$(this).attr('tabindex', -1);
		})
		var self = this;
		// Initialize
		this.input.blur();
		this.popover.addClass('picker--opened');
		this.input.addClass('picker__input picker__input--active');
		$(document.body).css('overflow', 'hidden');
		// Get the time
		var value = ((this.input.prop('value') || this.options['default'] || '') + '').split(':');
		if (this.options.twelvehour && !(typeof value[1] === 'undefined')) {
			if (value[1].indexOf("AM") > 0){
				this.amOrPm = 'AM';
			} else {
				this.amOrPm = 'PM';
			}
			value[1] = value[1].replace("AM", "").replace("PM", "");
		}
		if (value[0] === 'now') {
			var now = new Date(+ new Date() + this.options.fromnow);
			value = [
				now.getHours(),
				now.getMinutes()
			];
      if (this.options.twelvehour) {
        this.amOrPm = value[0] >= 12 && value[0] < 24 ? 'PM' : 'AM';
      }
		}
		this.hours = + value[0] || 0;
		this.minutes = + value[1] || 0;
		this.spanHours.html(this.hours);
		this.spanMinutes.html(leadingZero(this.minutes));
		if (!this.isAppended) {
			// Append popover to body
			this.popover.insertAfter(this.input);
			if (this.options.twelvehour) {
				if (this.amOrPm === 'PM'){
					this.spanAmPm.children('#click-pm').addClass("text-primary");
					this.spanAmPm.children('#click-am').removeClass("text-primary");
				} else {
					this.spanAmPm.children('#click-am').addClass("text-primary");
					this.spanAmPm.children('#click-pm').removeClass("text-primary");
				}
			}
			// Reset position when resize
			$win.on('resize.clockpicker' + this.id, function() {
				if (self.isShown) {
					self.locate();
				}
			});
			this.isAppended = true;
		}
		// Toggle to hours view
		this.toggleView('hours');
		// Set position
		this.locate();
		this.isShown = true;
		// Hide when clicking or tabbing on any element except the clock and input
		$doc.on('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id, function(e) {
			var target = $(e.target);
			if (target.closest(self.popover.find('.picker__wrap')).length === 0 && target.closest(self.input).length === 0) {
				self.hide();
      }
		});
		// Hide when ESC is pressed
		$doc.on('keyup.clockpicker.' + this.id, function(e){
			if (e.keyCode === 27) {
				self.hide();
      }
		});
		raiseCallback(this.options.afterShow);
	};
	// Hide popover
	ClockPicker.prototype.hide = function() {
		raiseCallback(this.options.beforeHide);
		this.input.removeClass('picker__input picker__input--active');
		this.popover.removeClass('picker--opened');
		$(document.body).css('overflow', 'visible');
		this.isShown = false;
		$(':input').each(function(index) {
			$(this).attr('tabindex', index + 1);
		});
		// Unbinding events on document
		$doc.off('click.clockpicker.' + this.id + ' focusin.clockpicker.' + this.id);
		$doc.off('keyup.clockpicker.' + this.id);
		this.popover.hide();
		raiseCallback(this.options.afterHide);
	};
	// Toggle to hours or minutes view
	ClockPicker.prototype.toggleView = function(view, delay) {
		var raiseAfterHourSelect = false;
		if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
			raiseCallback(this.options.beforeHourSelect);
			raiseAfterHourSelect = true;
		}
		var isHours = view === 'hours',
				nextView = isHours ? this.hoursView : this.minutesView,
				hideView = isHours ? this.minutesView : this.hoursView;
		this.currentView = view;

		this.spanHours.toggleClass('text-primary', isHours);
		this.spanMinutes.toggleClass('text-primary', ! isHours);

		// Let's make transitions
		hideView.addClass('clockpicker-dial-out');
		nextView.css('visibility', 'visible').removeClass('clockpicker-dial-out');

		// Reset clock hand
		this.resetClock(delay);

		// After transitions ended
		clearTimeout(this.toggleViewTimer);
		this.toggleViewTimer = setTimeout(function() {
			hideView.css('visibility', 'hidden');
		}, duration);

		if (raiseAfterHourSelect) {
			raiseCallback(this.options.afterHourSelect);
    }
	};

	// Reset clock hand
	ClockPicker.prototype.resetClock = function(delay) {
		var view = this.currentView,
				value = this[view],
				isHours = view === 'hours',
				unit = Math.PI / (isHours ? 6 : 30),
				radian = value * unit,
				radius = isHours && value > 0 && value < 13 ? innerRadius : outerRadius,
				x = Math.sin(radian) * radius,
				y = - Math.cos(radian) * radius,
				self = this;

		if (svgSupported && delay) {
			self.canvas.addClass('clockpicker-canvas-out');
			setTimeout(function(){
				self.canvas.removeClass('clockpicker-canvas-out');
				self.setHand(x, y);
			}, delay);
		} else
			this.setHand(x, y);
	};

	// Set clock hand to (x, y)
	ClockPicker.prototype.setHand = function(x, y, roundBy5, dragging) {
		var radian = Math.atan2(x, - y),
				isHours = this.currentView === 'hours',
				unit = Math.PI / (isHours || roundBy5? 6 : 30),
				z = Math.sqrt(x * x + y * y),
				options = this.options,
				inner = isHours && z < (outerRadius + innerRadius) / 2,
				radius = inner ? innerRadius : outerRadius,
				value;

		if (options.twelvehour) {
			radius = outerRadius;
    }

		// Radian should in range [0, 2PI]
		if (radian < 0) {
			radian = Math.PI * 2 + radian;
    }

		// Get the round value
		value = Math.round(radian / unit);

		// Get the round radian
		radian = value * unit;

		// Correct the hours or minutes
		if (options.twelvehour) {
			if (isHours) {
				if (value === 0)
					value = 12;
			} else {
				if (roundBy5)
					value *= 5;
				if (value === 60)
					value = 0;
			}
		} else {
			if (isHours) {
				if (value === 12)
					value = 0;
				value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
			} else {
				if (roundBy5)
					value *= 5;
				if (value === 60)
					value = 0;
			}
		}

		// Once hours or minutes changed, vibrate the device
		if (this[this.currentView] !== value) {
			if (vibrate && this.options.vibrate) {
				// Do not vibrate too frequently
				if (!this.vibrateTimer) {
					navigator[vibrate](10);
					this.vibrateTimer = setTimeout($.proxy(function(){
						this.vibrateTimer = null;
					}, this), 100);
				}
      }
    }

		this[this.currentView] = value;
    if (isHours) {
      this['spanHours'].html(value);
    } else {
      this['spanMinutes'].html(leadingZero(value));
    }

		// If svg is not supported, just add an active class to the tick
		if (!svgSupported) {
			this[isHours ? 'hoursView' : 'minutesView'].find('.clockpicker-tick').each(function(){
				var tick = $(this);
				tick.toggleClass('active', value === + tick.html());
			});
			return;
		}

		// Set clock hand and others' position
		var cx1 = Math.sin(radian) * (radius - tickRadius),
			  cy1 = - Math.cos(radian) * (radius - tickRadius),
		    cx2 = Math.sin(radian) * radius,
			  cy2 = - Math.cos(radian) * radius;
		this.hand.setAttribute('x2', cx1);
		this.hand.setAttribute('y2', cy1);
		this.bg.setAttribute('cx', cx2);
		this.bg.setAttribute('cy', cy2);
	};

	// Hours and minutes are selected
	ClockPicker.prototype.done = function() {
		raiseCallback(this.options.beforeDone);
		this.hide();
		this.label.addClass('active');

		var last = this.input.prop('value'),
				value = leadingZero(this.hours) + ':' + leadingZero(this.minutes);
		if (this.options.twelvehour) {
			value = value + this.amOrPm;
    }

		this.input.prop('value', value);
		if (value !== last) {
			this.input.triggerHandler('change');
			if (!this.isInput) {
				this.element.trigger('change');
      }
		}

		if (this.options.autoclose)
			this.input.trigger('blur');

		raiseCallback(this.options.afterDone);
	};

	// Clear input field
	ClockPicker.prototype.clear = function() {
		this.hide();
		this.label.removeClass('active');

		var last = this.input.prop('value'),
			  value = '';

		this.input.prop('value', value);
		if (value !== last) {
			this.input.triggerHandler('change');
			if (! this.isInput) {
				this.element.trigger('change');
			}
		}

		if (this.options.autoclose) {
			this.input.trigger('blur');
		}
	};

	// Remove clockpicker from input
	ClockPicker.prototype.remove = function() {
		this.element.removeData('clockpicker');
		this.input.off('focus.clockpicker click.clockpicker');
		if (this.isShown) {
			this.hide();
    }
		if (this.isAppended) {
			$win.off('resize.clockpicker' + this.id);
			this.popover.remove();
		}
	};

	// Extends $.fn.clockpicker
	$.fn.pickatime = function(option){
		var args = Array.prototype.slice.call(arguments, 1);
		return this.each(function(){
			var $this = $(this),
					data = $this.data('clockpicker');
			if (!data) {
				var options = $.extend({}, ClockPicker.DEFAULTS, $this.data(), typeof option == 'object' && option);
				$this.data('clockpicker', new ClockPicker($this, options));
			} else {
				// Manual operatsions. show, hide, remove, e.g.
				if (typeof data[option] === 'function') {
					data[option].apply(data, args);
        }
			}
		});
	};
}());
