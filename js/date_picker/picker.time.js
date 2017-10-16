(function($, Vel) {
  'use strict';

  let _defaults = {
    dialRadius: 135,
		outerRadius: 105,
		innerRadius: 70,
		tickRadius: 20,
		duration: 350,
    container: null,
    'default': 'now',         // default time, 'now' or '13:14' e.g.
		fromnow: 0,            // set default time to * milliseconds from now (using with default = 'now')
		donetext: 'Ok',      // done button text
		cleartext: 'Clear',
		canceltext: 'Cancel',
		autoclose: false,      // auto close when minute is selected
		darktheme: false,			 // set to dark theme
		twelvehour: true,      // change to 12 hour AM/PM clock from 24 hour
		vibrate: true          // vibrate the device when dragging clock hand
  };


  /**
   * @class
   *
   */
  class Timepicker {
    constructor(el, options) {
      // If exists, destroy and reinitialize
      if (!!el.M_Timepicker) {
        el.M_Timepicker.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Timepicker = this;

      this.options = $.extend({}, Timepicker.defaults, options);

      this.id = Materialize.guid();

      this._insertHTMLIntoDOM();
      this._setupModal();
      this._setupEventHandlers();
      this._setupVariables();
      this._clockSetup();
      // this._pickerSetup();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Timepicker(this, options));
      });
      return arr;
    }

    static _addLeadingZero(num) {
      return (num < 10 ? '0' : '') + num;
    }

    static _createSVGEl (name) {
      let svgNS = 'http://www.w3.org/2000/svg';
      return document.createElementNS(svgNS, name);
    }

    /**
     * Get Instance
     */
    getInstance() {
      return this;
    }

    /**
     * Teardown component
     */
    destroy() {

    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleInputClickBound = this._handleInputClick.bind(this);
      // this._handleInputFocusBound = this._handleInputFocus.bind(this);
      this.el.addEventListener('click', this._handleInputClickBound);
      // this.el.addEventListener('focus', this._handleInputFocusBound);
    }

    _handleInputClick() {
      this.open();
    }

    // _handleInputFocus() {
    //   this.modal.open()
    // }

    _insertHTMLIntoDOM() {
      this.$modalEl = $(Timepicker._template);
      this.modalEl = this.$modalEl[0];
      this.modalEl.id = 'modal-' + this.id;

      // Append popover to input by default
      var containerEl = document.querySelector(this.options.container);
      if (this.options.container && !!containerEl) {
        this.$modalEl.appendTo(containerEl);

      } else {
        this.$modalEl.insertAfter(this.el);
      }
    }

    _setupModal() {
      this.modal = new Materialize.Modal(this.modalEl);
    }

    _setupVariables() {

		  // this.element = element;
		  // this.holder = holder;
		  // this.options = options;
		  // this.isAppended = false;
		  // this.isShown = false;
		  this.currentView = 'hours';
		  // this.isInput = isInput;
		  // this.label = label;
      this.vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

      this._canvas = this.modalEl.querySelector('.clockpicker-canvas');
		  // this.plate = plate;

		  this.hoursView = this.modalEl.querySelector('.clockpicker-hours');
		  this.minutesView = this.modalEl.querySelector('.clockpicker-minutes');
		  // this.amPmBlock = amPmBlock;
		  this.spanHours = this.modalEl.querySelector('.clockpicker-span-hours');
		  this.spanMinutes = this.modalEl.querySelector('.clockpicker-span-minutes');
		  this.spanAmPm = this.modalEl.querySelector('.clockpicker-span-am-pm');
		  this.footer = this.modalEl.querySelector('.picker__footer');
		  this.amOrPm = 'PM';
    }

    _clockSetup() {
      if (this.options.twelvehour) {
        this.$amBtn = $('<div class="am-btn">AM</div>');
				this.$amBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
        this.$pmBtn = $('<div class="pm-btn">PM</div>');
				this.$pmBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
		  }

      this._buildHoursView();
      this._buildMinutesView();
      this._buildSVGClock();

    }

    _buildSVGClock() {
      // Draw clock hands and others
      let dialRadius = this.options.dialRadius;
      let tickRadius = this.options.tickRadius;
      let diameter = dialRadius * 2;

			let svg = Timepicker._createSVGEl('svg');
			svg.setAttribute('class', 'clockpicker-svg');
			svg.setAttribute('width', diameter);
			svg.setAttribute('height', diameter);
			let g = Timepicker._createSVGEl('g');
			g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
			let bearing = Timepicker._createSVGEl('circle');
			bearing.setAttribute('class', 'clockpicker-canvas-bearing');
			bearing.setAttribute('cx', 0);
			bearing.setAttribute('cy', 0);
			bearing.setAttribute('r', 4);
			let hand = Timepicker._createSVGEl('line');
			hand.setAttribute('x1', 0);
			hand.setAttribute('y1', 0);
			let bg = Timepicker._createSVGEl('circle');
			bg.setAttribute('class', 'clockpicker-canvas-bg');
			bg.setAttribute('r', tickRadius);
			g.appendChild(hand);
			g.appendChild(bg);
			g.appendChild(bearing);
			svg.appendChild(g);
			this._canvas.appendChild(svg);

			this.hand = hand;
			this.bg = bg;
			this.bearing = bearing;
			this.g = g;
    }

    _buildHoursView() {
      let $tick = $('<div class="timepicker-tick"></div>');
	    // Hours view
		  if (this.options.twelvehour) {
			  for (let i = 1; i < 13; i += 1) {
				  let tick = $tick.clone();
				  let radian = i / 6 * Math.PI;
				  let radius = this.options.outerRadius;
				  tick.css({
					  left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + 'px',
					  top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + 'px'
				  });
				  tick.html(i === 0 ? '00' : i);
				  $(this.hoursView).append(tick[0]);
				  // tick.on(mousedownEvent, mousedown);
			  }
		  } else {
			  for (let i = 0; i < 24; i += 1) {
				  let tick = $tick.clone();
				  let radian = i / 6 * Math.PI;
				  var inner = i > 0 && i < 13;
				  let radius = inner ? this.options.innerRadius : this.options.outerRadius;
				  tick.css({
					  left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + 'px',
					  top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + 'px'
				  });
				  tick.html(i === 0 ? '00' : i);
				  this.hoursView.append(tick[0]);
				  // tick.on(mousedownEvent, mousedown);
			  }
		  }
    }

    _buildMinutesView() {
      let $tick = $('<div class="timepicker-tick"></div>');
		  // Minutes view
		  for (let i = 0; i < 60; i += 5) {
			  let tick = $tick.clone();
			  let radian = i / 30 * Math.PI;
			  tick.css({
				  left: this.options.dialRadius + Math.sin(radian) * this.options.outerRadius - this.options.tickRadius + 'px',
				  top: this.options.dialRadius - Math.cos(radian) * this.options.outerRadius - this.options.tickRadius + 'px'
			  });
			  tick.html(Timepicker._addLeadingZero(i));
			  $(this.minutesView).append(tick[0]);
			  // tick.on(mousedownEvent, mousedown);
		  }

      // Clicking on minutes view space
		  // plate.on(mousedownEvent, function(e) {
			//   if ($(e.target).closest('.clockpicker-tick').length === 0) {
			// 	  mousedown(e, true);
      //   }
		  // });
    }

    _handleAmPmClick(e) {
      let $btnClicked = $(e.target);
      this.amOrPm = $btnClicked.hasClass('.am-btn') ? 'AM' : 'PM';
      this._updateAmPmView();
    }

    _updateAmPmView() {
      this.$amBtn.toggleClass('text-primary', this.amOrPm === 'AM');
      this.$pmBtn.toggleClass('text-primary', this.amOrPm === 'PM');
    }

    _updateTimeFromInput() {
      // Get the time
		  let value = ((this.el.value || this.options.default || '') + '').split(':');
		  if (this.options.twelvehour && !(typeof value[1] === 'undefined')) {
			  if (value[1].indexOf("AM") > 0){
				  this.amOrPm = 'AM';
			  } else {
				  this.amOrPm = 'PM';
			  }
			  value[1] = value[1].replace("AM", "").replace("PM", "");
		  }
		  if (value[0] === 'now') {
			  let now = new Date(+ new Date() + this.options.fromnow);
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
		  this.spanHours.innerHTML= this.hours;
		  this.spanMinutes.innerHTML = Timepicker._addLeadingZero(this.minutes);

      this._updateAmPmView();
    }

    showView(view, delay) {
      var raiseAfterHourSelect = false;
		  if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
			  raiseCallback(this.options.beforeHourSelect);
			  raiseAfterHourSelect = true;
		  }
		  var isHours = view === 'hours',
				  nextView = isHours ? this.hoursView : this.minutesView,
				  hideView = isHours ? this.minutesView : this.hoursView;
		  this.currentView = view;

		  $(this.spanHours).toggleClass('text-primary', isHours);
		  $(this.spanMinutes).toggleClass('text-primary', !isHours);

		  // Let's make transitions
		  hideView.classList.add('clockpicker-dial-out');
		  $(nextView).css('visibility', 'visible')
          .removeClass('clockpicker-dial-out');

		  // Reset clock hand
		  this.resetClock(delay);

		  // After transitions ended
		  clearTimeout(this.toggleViewTimer);
		  this.toggleViewTimer = setTimeout(function() {
			  $(hideView).css('visibility', 'hidden');
		  }, this.options.duration);
    }

    resetClock(delay) {
      let view = this.currentView,
				  value = this[view],
				  isHours = view === 'hours',
				  unit = Math.PI / (isHours ? 6 : 30),
				  radian = value * unit,
				  radius = isHours && value > 0 && value < 13 ?
            this.options.innerRadius : this.options.outerRadius,
				  x = Math.sin(radian) * radius,
				  y = - Math.cos(radian) * radius,
				  self = this;

		  if (delay) {
			  self.canvas.addClass('clockpicker-canvas-out');
			  setTimeout(function(){
				  self.canvas.removeClass('clockpicker-canvas-out');
				  self.setHand(x, y);
			  }, delay);
		  } else {
			  this.setHand(x, y);
        }
    }

    setHand(x, y, roundBy5, dragging) {
		let radian = Math.atan2(x, - y),
				isHours = this.currentView === 'hours',
				unit = Math.PI / (isHours || roundBy5? 6 : 30),
				z = Math.sqrt(x * x + y * y),
				inner = isHours && z < (this.options.outerRadius + this.options.innerRadius) / 2,
				radius = inner ? this.options.innerRadius : this.options.outerRadius;

		if (this.options.twelvehour) {
			radius = this.options.outerRadius;
    }

		// Radian should in range [0, 2PI]
		if (radian < 0) {
			radian = Math.PI * 2 + radian;
    }

		// Get the round value
		let value = Math.round(radian / unit);

		// Get the round radian
		radian = value * unit;

		// Correct the hours or minutes
		if (this.options.twelvehour) {
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
			if (this.vibrate && this.options.vibrate) {
				// Do not vibrate too frequently
				if (!this.vibrateTimer) {
					navigator[this.vibrate](10);
					this.vibrateTimer = setTimeout(() => {
						this.vibrateTimer = null;
					}, 100);
				}
      }
    }

		this[this.currentView] = value;
    if (isHours) {
      this['spanHours'].innerHTML = value;
    } else {
      this['spanMinutes'].innerHTML = Timepicker._addLeadingZero(value);
    }

		// Set clock hand and others' position
		var cx1 = Math.sin(radian) * (radius - this.options.tickRadius),
			  cy1 = - Math.cos(radian) * (radius - this.options.tickRadius),
		    cx2 = Math.sin(radian) * radius,
			  cy2 = - Math.cos(radian) * radius;
		this.hand.setAttribute('x2', cx1);
		this.hand.setAttribute('y2', cy1);
		this.bg.setAttribute('cx', cx2);
		this.bg.setAttribute('cy', cy2);
    }

    open() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;

      this._updateTimeFromInput();
      this.showView('hours');
      this.modal.open();
    }

    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      this.modal.close();
    }

    _pickerSetup() {
      // $('<button type="button" class="btn-flat picker__clear" tabindex="' + (this.options.twelvehour? '3' : '1') + '">' + this.options.cleartext + '</button>').click($.proxy(this.clear, this)).appendTo(this.footer);
		  // $('<button type="button" class="btn-flat picker__close" tabindex="' + (this.options.twelvehour? '3' : '1') + '">' + this.options.canceltext + '</button>').click($.proxy(this.hide, this)).appendTo(this.footer);
		  // $('<button type="button" class="btn-flat picker__close" tabindex="' + (this.options.twelvehour? '3' : '1') + '">' + this.options.donetext + '</button>').click($.proxy(this.done, this)).appendTo(this.footer);

		  // this.spanHours.click($.proxy(this.toggleView, this, 'hours'));
		  // this.spanMinutes.click($.proxy(this.toggleView, this, 'minutes'));
    }

  }

  Timepicker._template = [
		'<div class= "modal">',
			'<div class="modal-content">',
				'<div class="timepicker-time-display">',
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
				'<div class="timepicker-time-container">',
					'<div class="picker__clock-container">',
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
		'</div>'
	].join('');

  Materialize.Timepicker = Timepicker;

  jQuery.fn.timepicker = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Timepicker.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Timepicker[methodOrOptions]();

        // Void methods
      } else {
        return this.each(function() {
          this.M_Timepicker[methodOrOptions]();
        });
      }

      // Initialize plugin if this.options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Timepicker.init(this, arguments[0]);
      return this;

      // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.timepicker`);
    }
  };

})(cash, Materialize.Vel);
