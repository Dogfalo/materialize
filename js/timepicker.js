(function($) {
  'use strict';

  let _defaults = {
    dialRadius: 135,
		outerRadius: 105,
		innerRadius: 70,
		tickRadius: 20,
		duration: 350,
    container: null,
    defaultTime: 'now',         // default time, 'now' or '13:14' e.g.
		fromnow: 0,            // Millisecond offset from the defaultTime
		doneText: 'Ok',      // done button text
		clearText: 'Clear',
		cancelText: 'Cancel',
		autoClose: false,      // auto close when minute is selected
		twelveHour: true,      // change to 12 hour AM/PM clock from 24 hour
		vibrate: true          // vibrate the device when dragging clock hand
  };


  /**
   * @class
   *
   */
  class Timepicker extends Component {
    constructor(el, options) {
      super(Timepicker, el, options);

      this.el.M_Timepicker = this;

      this.options = $.extend({}, Timepicker.defaults, options);

      this.id = M.guid();
      this._insertHTMLIntoDOM();
      this._setupModal();
      this._setupVariables();
      this._setupEventHandlers();

      this._clockSetup();
      this._pickerSetup();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    static _addLeadingZero(num) {
      return (num < 10 ? '0' : '') + num;
    }

    static _createSVGEl (name) {
      let svgNS = 'http://www.w3.org/2000/svg';
      return document.createElementNS(svgNS, name);
    }


    /**
     * @typedef {Object} Point
     * @property {number} x The X Coordinate
     * @property {number} y The Y Coordinate
     */

    /**
     * Get x position of mouse or touch event
     * @param {Event} e
     * @return {Point} x and y location
     */
    static _Pos(e) {
      if (e.targetTouches && (e.targetTouches.length >= 1)) {
        return {x: e.targetTouches[0].clientX, y: e.targetTouches[0].clientY};
      }
      // mouse event
      return {x: e.clientX, y: e.clientY};
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Timepicker;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.modal.destroy();
      $(this.modalEl).remove();
      this.el.M_Timepicker = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
      this._handleInputClickBound = this._handleInputClick.bind(this);
      this._handleClockClickStartBound = this._handleClockClickStart.bind(this);
      this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this);
      this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this);

      this.el.addEventListener('click', this._handleInputClickBound);
      this.el.addEventListener('keydown', this._handleInputKeydownBound);
      this.plate.addEventListener('mousedown', this._handleClockClickStartBound);
      this.plate.addEventListener('touchstart', this._handleClockClickStartBound);

      $(this.spanHours).on('click', this.showView.bind(this, 'hours'));
		  $(this.spanMinutes).on('click', this.showView.bind(this, 'minutes'));
    }

    _removeEventHandlers() {
      this.el.removeEventListener('click', this._handleInputClickBound);
      this.el.removeEventListener('keydown', this._handleInputKeydownBound);
    }

    _handleInputClick() {
      this.open();
    }

    _handleInputKeydown(e) {
      if (e.which === M.keys.ENTER) {
        e.preventDefault();
        this.open();
      }
    }

    _handleClockClickStart(e) {
      e.preventDefault();
      let clockPlateBR = this.plate.getBoundingClientRect();
	    let offset = {x: clockPlateBR.left, y: clockPlateBR.top};

      this.x0 = offset.x + this.options.dialRadius;
			this.y0 = offset.y + this.options.dialRadius;
      this.moved = false;
      let clickPos = Timepicker._Pos(e);
			this.dx = clickPos.x - this.x0;
      this.dy = clickPos.y - this.y0;

      // Set clock hands
      this.setHand(this.dx, this.dy, false);

			// Mousemove on document
      document.addEventListener('mousemove', this._handleDocumentClickMoveBound);
      document.addEventListener('touchmove', this._handleDocumentClickMoveBound);

			// Mouseup on document
      document.addEventListener('mouseup', this._handleDocumentClickEndBound);
      document.addEventListener('touchend', this._handleDocumentClickEndBound);
    }

    _handleDocumentClickMove(e) {
      e.preventDefault();
			let clickPos = Timepicker._Pos(e);
			let x = clickPos.x - this.x0;
			let y = clickPos.y - this.y0;
			this.moved = true;
			this.setHand(x, y, false, true);
    }

    _handleDocumentClickEnd(e) {
      e.preventDefault();
      document.removeEventListener('mouseup', this._handleDocumentClickEndBound);
      document.removeEventListener('touchend', this._handleDocumentClickEndBound);
			let clickPos = Timepicker._Pos(e);
			let x = clickPos.x - this.x0;
			let y = clickPos.y - this.y0;
			if (this.moved && x === this.dx && y === this.dy) {
				this.setHand(x, y);
      }

			if (this.currentView === 'hours') {
				this.showView('minutes', this.options.duration / 2);

      } else if (this.options.autoClose) {
				this.minutesView.addClass('timepicker-dial-out');
				setTimeout(function(){
					this.done();
				}, this.options.duration / 2);
      }

			// Unbind mousemove event
			document.removeEventListener('mousemove', this._handleDocumentClickMoveBound);
      document.removeEventListener('touchmove', this._handleDocumentClickMoveBound);
    }

    _insertHTMLIntoDOM() {
      this.$modalEl = $(Timepicker._template);
      this.modalEl = this.$modalEl[0];
      this.modalEl.id = 'modal-' + this.id;

      // Append popover to input by default
      let containerEl = document.querySelector(this.options.container);
      if (this.options.container && !!containerEl) {
        this.$modalEl.appendTo(containerEl);

      } else {
        this.$modalEl.insertBefore(this.el);
      }
    }

    _setupModal() {
      this.modal = M.Modal.init(this.modalEl, {
        onCloseEnd: () => {
          this.isOpen = false;
        }
      });
    }

    _setupVariables() {
		  this.currentView = 'hours';
      this.vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;

      this._canvas = this.modalEl.querySelector('.timepicker-canvas');
		  this.plate = this.modalEl.querySelector('.timepicker-plate');

		  this.hoursView = this.modalEl.querySelector('.timepicker-hours');
		  this.minutesView = this.modalEl.querySelector('.timepicker-minutes');
		  this.spanHours = this.modalEl.querySelector('.timepicker-span-hours');
		  this.spanMinutes = this.modalEl.querySelector('.timepicker-span-minutes');
		  this.spanAmPm = this.modalEl.querySelector('.timepicker-span-am-pm');
		  this.footer = this.modalEl.querySelector('.timepicker-footer');
		  this.amOrPm = 'PM';
    }

    _pickerSetup() {
      $('<button class="btn-flat timepicker-clear waves-effect" type="button" tabindex="' + (this.options.twelveHour? '3' : '1') + '">' + this.options.clearText + '</button>')
        .appendTo(this.footer).on('click', this.clear.bind(this));

      let confirmationBtnsContainer = $('<div class="confirmation-btns"></div>');
		  $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour? '3' : '1') + '">' + this.options.cancelText + '</button>')
        .appendTo(confirmationBtnsContainer).on('click', this.close.bind(this));
		  $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour? '3' : '1') + '">' + this.options.doneText + '</button>')
        .appendTo(confirmationBtnsContainer).on('click', this.done.bind(this));
      confirmationBtnsContainer.appendTo(this.footer);
    }


    _clockSetup() {
      if (this.options.twelveHour) {
        this.$amBtn = $('<div class="am-btn">AM</div>');
        this.$pmBtn = $('<div class="pm-btn">PM</div>');
        this.$amBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
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
			svg.setAttribute('class', 'timepicker-svg');
			svg.setAttribute('width', diameter);
			svg.setAttribute('height', diameter);
			let g = Timepicker._createSVGEl('g');
			g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
			let bearing = Timepicker._createSVGEl('circle');
			bearing.setAttribute('class', 'timepicker-canvas-bearing');
			bearing.setAttribute('cx', 0);
			bearing.setAttribute('cy', 0);
			bearing.setAttribute('r', 4);
			let hand = Timepicker._createSVGEl('line');
			hand.setAttribute('x1', 0);
			hand.setAttribute('y1', 0);
			let bg = Timepicker._createSVGEl('circle');
			bg.setAttribute('class', 'timepicker-canvas-bg');
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
		  if (this.options.twelveHour) {
			  for (let i = 1; i < 13; i += 1) {
				  let tick = $tick.clone();
				  let radian = i / 6 * Math.PI;
				  let radius = this.options.outerRadius;
				  tick.css({
					  left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + 'px',
					  top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + 'px'
				  });
				  tick.html(i === 0 ? '00' : i);
				  this.hoursView.appendChild(tick[0]);
				  // tick.on(mousedownEvent, mousedown);
			  }
		  } else {
			  for (let i = 0; i < 24; i += 1) {
				  let tick = $tick.clone();
				  let radian = i / 6 * Math.PI;
				  let inner = i > 0 && i < 13;
				  let radius = inner ? this.options.innerRadius : this.options.outerRadius;
				  tick.css({
					  left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + 'px',
					  top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + 'px'
				  });
				  tick.html(i === 0 ? '00' : i);
				  this.hoursView.appendChild(tick[0]);
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
			  this.minutesView.appendChild(tick[0]);
		  }
    }

    _handleAmPmClick(e) {
      let $btnClicked = $(e.target);
      this.amOrPm = $btnClicked.hasClass('am-btn') ? 'AM' : 'PM';
      this._updateAmPmView();
    }

    _updateAmPmView() {
      if (this.options.twelveHour) {
        this.$amBtn.toggleClass('text-primary', this.amOrPm === 'AM');
        this.$pmBtn.toggleClass('text-primary', this.amOrPm === 'PM');
      }
    }

    _updateTimeFromInput() {
      // Get the time
		  let value = ((this.el.value || this.options.defaultTime || '') + '').split(':');
		  if (this.options.twelveHour && !(typeof value[1] === 'undefined')) {
			  if (value[1].toUpperCase().indexOf("AM") > 0){
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
        if (this.options.twelveHour) {
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
		  if (view === 'minutes' && $(this.hoursView).css("visibility") === "visible") {
			  // raiseCallback(this.options.beforeHourSelect);
		  }
		  let isHours = view === 'hours',
				  nextView = isHours ? this.hoursView : this.minutesView,
				  hideView = isHours ? this.minutesView : this.hoursView;
		  this.currentView = view;

		  $(this.spanHours).toggleClass('text-primary', isHours);
		  $(this.spanMinutes).toggleClass('text-primary', !isHours);

		  // Transition view
		  hideView.classList.add('timepicker-dial-out');
		  $(nextView).css('visibility', 'visible')
          .removeClass('timepicker-dial-out');

		  // Reset clock hand
		  this.resetClock(delay);

		  // After transitions ended
		  clearTimeout(this.toggleViewTimer);
		  this.toggleViewTimer = setTimeout(() => {
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
			  $(this.canvas).addClass('timepicker-canvas-out');
			  setTimeout(() => {
				  $(self.canvas).removeClass('timepicker-canvas-out');
				  self.setHand(x, y);
			  }, delay);
		  } else {
			  this.setHand(x, y);
      }
    }

    setHand(x, y, roundBy5) {
		  let radian = Math.atan2(x, - y),
			isHours = this.currentView === 'hours',
			unit = Math.PI / (isHours || roundBy5? 6 : 30),
			z = Math.sqrt(x * x + y * y),
			inner = isHours && z < (this.options.outerRadius + this.options.innerRadius) / 2,
			radius = inner ? this.options.innerRadius : this.options.outerRadius;

		  if (this.options.twelveHour) {
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
		  if (this.options.twelveHour) {
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
				  if (value === 12) {
					  value = 0;
          }
				  value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
			  } else {
				  if (roundBy5) {
					  value *= 5;
          }
				  if (value === 60) {
					  value = 0;
          }
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
		  let cx1 = Math.sin(radian) * (radius - this.options.tickRadius),
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

    /**
     * Finish timepicker selection.
     */
    done(e, clearValue) {
      // Set input value
		  let last = this.el.value;
		  let value = clearValue ? '' : Timepicker._addLeadingZero(this.hours) + ':' +
          Timepicker._addLeadingZero(this.minutes);
      this.time = value;
		  if (!clearValue && this.options.twelveHour) {
			  value = `${value} ${this.amOrPm}`;
      }
		  this.el.value = value;

      // Trigger change event
		  if (value !== last) {
			  this.$el.trigger('change');
		  }

      this.close();
      this.el.focus();
    }

    clear() {
      this.done(null, true);
    }
  }

  Timepicker._template = [
		'<div class= "modal timepicker-modal">',
			'<div class="modal-content timepicker-container">',
				'<div class="timepicker-digital-display">',
					'<div class="timepicker-text-container">',
						'<div class="timepicker-display-column">',
							'<span class="timepicker-span-hours text-primary"></span>',
							':',
							'<span class="timepicker-span-minutes"></span>',
						'</div>',
						'<div class="timepicker-display-column timepicker-display-am-pm">',
							'<div class="timepicker-span-am-pm"></div>',
						'</div>',
					'</div>',
				'</div>',
				'<div class="timepicker-analog-display">',
					'<div class="timepicker-plate">',
						'<div class="timepicker-canvas"></div>',
						'<div class="timepicker-dial timepicker-hours"></div>',
						'<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>',
				  '</div>',
		      '<div class="timepicker-footer"></div>',
				'</div>',
			'</div>',
		'</div>'
	].join('');

  M.Timepicker = Timepicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Timepicker, 'timepicker', 'M_Timepicker');
  }

})(cash);
