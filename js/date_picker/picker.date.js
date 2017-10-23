(function($, Vel) {
  'use strict';

  let _defaults = {
    // bind the picker to a form field
    field: null,

    // automatically show/hide the picker on `field` focus (default `true` if `field` is set)
    bound: undefined,

    // data-attribute on the input field with an aria assistance tekst (only applied when `bound` is set)
    ariaLabel: 'Use the arrow keys to pick a date',

    // position of the datepicker, relative to the field (default to bottom & left)
    // ('bottom' & 'left' keywords are not used, 'top' & 'right' are modifier on the bottom/left position)
    position: 'bottom left',

    // automatically fit in the viewport even if it means repositioning from the position option
    reposition: true,

    // the default output format for `.toString()` and `field` value
    format: 'YYYY-MM-DD',

    // the toString function which gets passed a current date object and format
    // and returns a string
    toString: null,

    // used to create date object from current input string
    parse: null,

    // the initial date to view when first opened
    defaultDate: null,

    // make the `defaultDate` the initial selected value
    setDefaultDate: false,

    // first day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,

    // the default flag for moment's strict date parsing
    formatStrict: false,

    // the minimum/earliest date that can be selected
    minDate: null,
    // the maximum/latest date that can be selected
    maxDate: null,

    // number of years either side, or array of upper/lower range
    yearRange: 10,

    // show week numbers at head of row
    showWeekNumber: false,

    // Week picker mode
    pickWholeWeek: false,

    // used internally (don't config outside)
    minYear: 0,
    maxYear: 9999,
    minMonth: undefined,
    maxMonth: undefined,

    startRange: null,
    endRange: null,

    isRTL: false,

    // Additional text to append to the year in the calendar title
    yearSuffix: '',

    // Render the month after year in the calendar title
    showMonthAfterYear: false,

    // Render days of the calendar grid that fall in the next or previous month
    showDaysInNextAndPreviousMonths: false,

    // Allows user to select days that fall in the next or previous month
    enableSelectionDaysInNextAndPreviousMonths: false,

    // how many months are visible
    numberOfMonths: 1,

    // when numberOfMonths is used, this will help you to choose where the main calendar will be (default `left`, can be set to `right`)
    // only used for the first display or when a selected date is not visible
    mainCalendar: 'left',

    // Specify a DOM element to render the calendar in
    container: undefined,

    // Blur field when date is selected
    blurFieldOnSelect : true,

    // internationalization
    i18n: {
      previousMonth : 'Previous Month',
      nextMonth     : 'Next Month',
      months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
      weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
    },

    // Theme Classname
    theme: null,

    // events array
    events: [],

    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null,
  };


  /**
   * @class
   *
   */
  class Datepicker {
    /**
     * Construct Datepicker instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_Datepicker) {
        el.M_Datepicker.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Datepicker = this;

      this.options = $.extend({}, Datepicker.defaults, options);

      this.id = Materialize.guid();


      // -----------------
      this._insertHTMLIntoDOM();
      this._setupModal();
      this._setupVariables();
      this._setupEventHandlers();

      // if (opts.field) {
      //   if (opts.container) {
      //     opts.container.appendChild(self.el);
      //   } else if (opts.bound) {
      //     document.body.appendChild(self.el);
      //   } else {
      //     opts.field.parentNode.insertBefore(self.el, opts.field.nextSibling);
      //   }


      //   if (!opts.defaultDate) {
      //     if (hasMoment && opts.field.value) {
      //       opts.defaultDate = moment(opts.field.value, opts.format).toDate();
      //     } else {
      //       opts.defaultDate = new Date(Date.parse(opts.field.value));
      //     }
      //     opts.setDefaultDate = true;
      //   }
      // }

      let defDate = this.options.defaultDate;

      if (Datepicker._isDate(defDate)) {
        if (this.options.setDefaultDate) {
          this.setDate(defDate, true);
        } else {
          this.gotoDate(defDate);
        }
      } else {
        this.gotoDate(new Date());
      }

      // if (opts.bound) {
      //   this.hide();
      //   self.el.className += ' is-bound';
      //   addEvent(opts.trigger, 'click', self._onInputClick);
      //   addEvent(opts.trigger, 'focus', self._onInputFocus);
      //   addEvent(opts.trigger, 'blur', self._onInputBlur);
      // } else {
      //   this.show();
      // }

      // -----------------


      /**
       * Describes open/close state of datepicker
       * @type {Boolean}
       */
      this.isOpen = false;

    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Datepicker(this, options));
      });
      return arr;
    }

    static _isDate(obj) {
      return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    }

    static _setToStartOfDay(date) {
      if (Datepicker._isDate(date)) date.setHours(0,0,0,0);
    }

    static _getDaysInMonth(year, month) {
      return [31, Datepicker._isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
    }

    static _isLeapYear(year) {
      // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
      return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
    }

    static _compareDates(a,b) {
      // weak date comparison (use setToStartOfDay(date) to ensure correct result)
      return a.getTime() === b.getTime();
    }

    static _setToStartOfDay(date)
    {
      if (Datepicker._isDate(date)) date.setHours(0,0,0,0);
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

    _insertHTMLIntoDOM() {
      this.$modalEl = $(Datepicker._template);
      this.modalEl = this.$modalEl[0];
      this.modalEl.id = 'modal-' + this.id;

      if (this.options.container && !!containerEl) {
        this.$modalEl.appendTo(containerEl);

      } else {
        this.$modalEl.insertBefore(this.el);
      }
    }


    _setupModal() {
      this.modal = new Materialize.Modal(this.modalEl, {
        complete: () => {
          this.isOpen = false;
        }
      });
    }

    toString(format) {
      format = format || this.options.format;
      if (!Datepicker._isDate(this._d)) {
        return '';
      }
      if (this.options.toString) {
        return this.options.toString(this._d, format);
      }
      return this._d.toDateString();
    }

    setDate(date, preventOnSelect) {
      if (!date) {
        this._d = null;
        this.el.value = '';
        this.$el.trigger('change', {firedBy: this});
        return this.draw();
      }
      if (typeof date === 'string') {
        date = new Date(Date.parse(date));
      }
      if (!Datepicker._isDate(date)) {
        return;
      }

      // Set Date
      let min = this.options.minDate,
          max = this.options.maxDate;

      if (Datepicker._isDate(min) && date < min) {
        date = min;
      } else if (Datepicker._isDate(max) && date > max) {
        date = max;
      }

      this._d = new Date(date.getTime());

      Datepicker._setToStartOfDay(this._d);
      this.gotoDate(this._d);

      this.el.value = this.toString();
      this.$el.trigger('change', {firedBy: this});

      if (!preventOnSelect && typeof this.options.onSelect === 'function') {
        this.options.onSelect.call(this, this.getDate());
      }
    }

    /**
     * change view to a specific date
     */
    gotoDate(date) {
      let newCalendar = true;

      if (!Datepicker._isDate(date)) {
        return;
      }

      if (this.calendars) {
        let firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1),
            lastVisibleDate = new Date(this.calendars[this.calendars.length-1].year, this.calendars[this.calendars.length-1].month, 1),
            visibleDate = date.getTime();
        // get the end of the month
        lastVisibleDate.setMonth(lastVisibleDate.getMonth()+1);
        lastVisibleDate.setDate(lastVisibleDate.getDate()-1);
        newCalendar = (visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate);
      }

      if (newCalendar) {
        this.calendars = [{
          month: date.getMonth(),
          year: date.getFullYear()
        }];
        if (this.options.mainCalendar === 'right') {
          this.calendars[0].month += 1 - this.options.numberOfMonths;
        }
      }

      this.adjustCalendars();
    }

    adjustCalendars() {
      this.calendars[0] = this.adjustCalendar(this.calendars[0]);
      for (let c = 1; c < this.options.numberOfMonths; c++) {
        this.calendars[c] = this.adjustCalendar({
          month: this.calendars[0].month + c,
          year: this.calendars[0].year
        });
      }
      this.draw();
    }

    adjustCalendar(calendar) {
      if (calendar.month < 0) {
        calendar.year -= Math.ceil(Math.abs(calendar.month)/12);
        calendar.month += 12;
      }
      if (calendar.month > 11) {
        calendar.year += Math.floor(Math.abs(calendar.month)/12);
        calendar.month -= 12;
      }
      return calendar;
    }

    render(year, month, randId) {
      let opts   = this.options,
          now    = new Date(),
          days   = Datepicker._getDaysInMonth(year, month),
          before = new Date(year, month, 1).getDay(),
          data   = [],
          row    = [];
      Datepicker._setToStartOfDay(now);
      if (opts.firstDay > 0) {
        before -= opts.firstDay;
        if (before < 0) {
          before += 7;
        }
      }
      let previousMonth = month === 0 ? 11 : month - 1,
          nextMonth = month === 11 ? 0 : month + 1,
          yearOfPreviousMonth = month === 0 ? year - 1 : year,
          yearOfNextMonth = month === 11 ? year + 1 : year,
          daysInPreviousMonth = Datepicker._getDaysInMonth(yearOfPreviousMonth, previousMonth);
      let cells = days + before,
          after = cells;
      while(after > 7) {
        after -= 7;
      }
      cells += 7 - after;
      let isWeekSelected = false;
      for (let i = 0, r = 0; i < cells; i++) {
        let day = new Date(year, month, 1 + (i - before)),
            isSelected = Datepicker._isDate(this._d) ? Datepicker._compareDates(day, this._d) : false,
            isToday = Datepicker._compareDates(day, now),
            hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
            isEmpty = i < before || i >= (days + before),
            dayNumber = 1 + (i - before),
            monthNumber = month,
            yearNumber = year,
            isStartRange = opts.startRange && Datepicker._compareDates(opts.startRange, day),
            isEndRange = opts.endRange && Datepicker._compareDates(opts.endRange, day),
            isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
            isDisabled = (opts.minDate && day < opts.minDate) ||
            (opts.maxDate && day > opts.maxDate) ||
            (opts.disableWeekends && isWeekend(day)) ||
            (opts.disableDayFn && opts.disableDayFn(day));

        if (isEmpty) {
          if (i < before) {
            dayNumber = daysInPreviousMonth + dayNumber;
            monthNumber = previousMonth;
            yearNumber = yearOfPreviousMonth;
          } else {
            dayNumber = dayNumber - days;
            monthNumber = nextMonth;
            yearNumber = yearOfNextMonth;
          }
        }

        let dayConfig = {
          day: dayNumber,
          month: monthNumber,
          year: yearNumber,
          hasEvent: hasEvent,
          isSelected: isSelected,
          isToday: isToday,
          isDisabled: isDisabled,
          isEmpty: isEmpty,
          isStartRange: isStartRange,
          isEndRange: isEndRange,
          isInRange: isInRange,
          showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths,
          enableSelectionDaysInNextAndPreviousMonths: opts.enableSelectionDaysInNextAndPreviousMonths
        };

        if (opts.pickWholeWeek && isSelected) {
          isWeekSelected = true;
        }
        row.push(this.renderDay(dayConfig));

        if (++r === 7) {
          if (opts.showWeekNumber) {
            row.unshift(renderWeek(i - before, month, year));
          }
          data.push(this.renderRow(row, opts.isRTL, opts.pickWholeWeek, isWeekSelected));
          row = [];
          r = 0;
          isWeekSelected = false;
        }
      }
      return this.renderTable(opts, data, randId);
    }

    renderDay(opts) {
      let arr = [];
      let ariaSelected = 'false';
      if (opts.isEmpty) {
        if (opts.showDaysInNextAndPreviousMonths) {
          arr.push('is-outside-current-month');

          if(!opts.enableSelectionDaysInNextAndPreviousMonths) {
            arr.push('is-selection-disabled');
          }

        } else {
          return '<td class="is-empty"></td>';
        }
      }
      if (opts.isDisabled) {
        arr.push('is-disabled');
      }
      if (opts.isToday) {
        arr.push('is-today');
      }
      if (opts.isSelected) {
        arr.push('is-selected');
        ariaSelected = 'true';
      }
      if (opts.hasEvent) {
        arr.push('has-event');
      }
      if (opts.isInRange) {
        arr.push('is-inrange');
      }
      if (opts.isStartRange) {
        arr.push('is-startrange');
      }
      if (opts.isEndRange) {
        arr.push('is-endrange');
      }
      return '<td data-day="' + opts.day + '" class="' + arr.join(' ') + '" aria-selected="' + ariaSelected + '">' +
        '<button class="pika-button pika-day" type="button" ' +
        'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
        opts.day +
        '</button>' +
        '</td>';
    }

    renderRow(days, isRTL, pickWholeWeek, isRowSelected) {
      return '<tr class="pika-row' + (pickWholeWeek ? ' pick-whole-week' : '') + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    }

    renderTable(opts, data, randId) {
      return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' +
        randId + '">' +
        this.renderHead(opts) + this.renderBody(data) + '</table>';
    }

    renderHead(opts) {
      let i, arr = [];
      if (opts.showWeekNumber) {
        arr.push('<th></th>');
      }
      for (i = 0; i < 7; i++) {
        arr.push('<th scope="col"><abbr title="' +
                 this.renderDayName(opts, i) + '">' +
                 this.renderDayName(opts, i, true) + '</abbr></th>');
      }
      return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
    }

    renderBody(rows) {
      return '<tbody>' + rows.join('') + '</tbody>';
    }


    renderTitle(instance, c, year, month, refYear, randId) {
      let i, j, arr,
          opts = this.options,
          isMinYear = year === opts.minYear,
          isMaxYear = year === opts.maxYear,
          html = '<div id="' + randId + '" class="pika-title" role="heading" aria-live="assertive">',
          monthHtml,
          yearHtml,
          prev = true,
          next = true;

      for (arr = [], i = 0; i < 12; i++) {
        arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' +
                 (i === month ? ' selected="selected"': '') +
                 ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth) ? 'disabled="disabled"' : '') + '>' +
                 opts.i18n.months[i] + '</option>');
      }

      monthHtml = '<div class="pika-label">' + opts.i18n.months[month] + '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select></div>';

      if ($.isArray(opts.yearRange)) {
        i = opts.yearRange[0];
        j = opts.yearRange[1] + 1;
      } else {
        i = year - opts.yearRange;
        j = 1 + year + opts.yearRange;
      }

      for (arr = []; i < j && i <= opts.maxYear; i++) {
        if (i >= opts.minYear) {
          arr.push('<option value="' + i + '"' + (i === year ? ' selected="selected"': '') + '>' + (i) + '</option>');
        }
      }
      yearHtml = '<div class="pika-label">' + year + opts.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select></div>';

      if (opts.showMonthAfterYear) {
        html += yearHtml + monthHtml;
      } else {
        html += monthHtml + yearHtml;
      }

      if (isMinYear && (month === 0 || opts.minMonth >= month)) {
        prev = false;
      }

      if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
        next = false;
      }

      if (c === 0) {
        html += '<button class="pika-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + opts.i18n.previousMonth + '</button>';
      }
      if (c === (this.options.numberOfMonths - 1) ) {
        html += '<button class="pika-next' + (next ? '' : ' is-disabled') + '" type="button">' + opts.i18n.nextMonth + '</button>';
      }

      return html += '</div>';
    }


    /**
     * refresh the HTML
     */
    draw(force) {
      if (!this.isOpen && !force) {
        return;
      }
      let opts = this.options,
          minYear = opts.minYear,
          maxYear = opts.maxYear,
          minMonth = opts.minMonth,
          maxMonth = opts.maxMonth,
          html = '',
          randId;

      if (this._y <= minYear) {
        this._y = minYear;
        if (!isNaN(minMonth) && this._m < minMonth) {
          this._m = minMonth;
        }
      }
      if (this._y >= maxYear) {
        this._y = maxYear;
        if (!isNaN(maxMonth) && this._m > maxMonth) {
          this._m = maxMonth;
        }
      }

      randId = 'pika-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);

      for (let c = 0; c < opts.numberOfMonths; c++) {
        html += '<div class="pika-lendar">' +
          this.renderTitle(this,
                      c,
                      this.calendars[c].year,
                      this.calendars[c].month,
                      this.calendars[0].year, randId) +
          this.render(this.calendars[c].year, this.calendars[c].month, randId) +
          '</div>';
      }

      this.calendarEl.innerHTML = html;

      // if (opts.bound) {
      //   if(opts.field.type !== 'hidden') {
      //     sto(function() {
      //       opts.trigger.focus();
      //     }, 1);
      //   }
      // }

      if (typeof this.options.onDraw === 'function') {
        this.options.onDraw(this);
      }

      if (opts.bound) {
        // let the screen reader user know to use arrow keys
        opts.field.setAttribute('aria-label', opts.ariaLabel);
      }
    }


    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
      this._handleInputClickBound = this._handleInputClick.bind(this);
      this._handleInputChangeBound= this._handleInputChange.bind(this);
      this._handleCalendarClickBound = this._handleCalendarClick.bind(this);

      this.el.addEventListener('click', this._handleInputClickBound);
      this.el.addEventListener('keydown', this._handleInputKeydownBound);
      this.el.addEventListener('change', this._handleInputChangeBound);
      this.calendarEl.addEventListener('click', this._handleCalendarClickBound);
      // addEvent(self.el, 'mousedown', self._onMouseDown, true);
      // addEvent(self.el, 'touchend', self._onMouseDown, true);
      // addEvent(self.el, 'change', self._onChange);
      //   addEvent(opts.field, 'change', self._onInputChange);
    }

    _setupVariables() {
		  this.calendarEl = this.modalEl.querySelector('.pika-single');
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('click', this._handleInputClickBound);
      this.el.removeEventListener('keydown', this._handleInputKeydownBound);
    }


    _handleInputClick() {
      this.open();
    }

    _handleInputKeydown(e) {
      if (e.which === Materialize.keys.ENTER) {
        e.preventDefault();
        this.open();
      }
    }

    _handleCalendarClick(e) {
      console.log(e);
      if (!this.isOpen) {
        return;
      }

      let $target = $(e.target);

      if (!$target.hasClass('is-disabled')) {
        if ($target.hasClass('pika-button') &&
            !$target.hasClass('is-empty') &&
            !$target.parent().hasClass('is-disabled')) {
          this.setDate(new Date(e.target.getAttribute('data-pika-year'),
                                e.target.getAttribute('data-pika-month'),
                                e.target.getAttribute('data-pika-day')));
          // if (opts.bound) {
          //   sto(function() {
          //     this.hide();
          //     if (opts.blurFieldOnSelect && opts.field) {
          //       opts.field.blur();
          //     }
          //   }, 100);
          // }
        }
        else if ($target.hasClass('pika-prev')) {
          this.prevMonth();
        }
        else if ($target.hasClass('pika-next')) {
          this.nextMonth();
        }
      }
      if (!$target.hasClass('pika-select')) {
        // if this is touch event prevent mouse events emulation
        // if (e.preventDefault) {
        //   e.preventDefault();
        // } else {
        //   e.returnValue = false;
        //   return false;
        // }
      } else {
        this._c = true;
      }
    }

    // _onChange(e) {
    //   e = e || window.event;
    //   let target = e.target || e.srcElement;
    //   if (!target) {
    //     return;
    //   }
    //   if (hasClass(target, 'pika-select-month')) {
    //     self.gotoMonth(target.value);
    //   }
    //   else if (hasClass(target, 'pika-select-year')) {
    //     self.gotoYear(target.value);
    //   }
    // }

    _onKeyChange(e) {
      e = e || window.event;

      if (self.isVisible()) {

        switch(e.keyCode){
        case 13:
        case 27:
          if (opts.field) {
            opts.field.blur();
          }
          break;
        case 37:
          e.preventDefault();
          self.adjustDate('subtract', 1);
          break;
        case 38:
          self.adjustDate('subtract', 7);
          break;
        case 39:
          self.adjustDate('add', 1);
          break;
        case 40:
          self.adjustDate('add', 7);
          break;
        }
      }
    }

    _handleInputChange(e) {
      let date;

      // Prevent change event from being fired when triggered by the plugin
      if (e.firedBy === this) {
        return;
      }
      if (this.options.parse) {
        date = this.options.parse(this.el.value, this.options.format);
      } else {
        date = new Date(Date.parse(this.el.value));
      }

      if (Datepicker._isDate(date)) {
        this.setDate(date);
      }
      // if (!self._v) {
      //   self.show();
      // }
    }

    _onInputFocus() {
      self.show();
    }

    _onInputClick() {
      self.show();
    }

    // _onInputBlur() {
    //   // IE allows pika div to gain focus; catch blur the input field
    //   let pEl = document.activeElement;
    //   do {
    //     if (hasClass(pEl, 'pika-single')) {
    //       return;
    //     }
    //   }
    //   while ((pEl = pEl.parentNode));

    //   if (!self._c) {
    //     self._b = sto(function() {
    //       self.hide();
    //     }, 50);
    //   }
    //   self._c = false;
    // }


    // _onClick(e) {
    //   e = e || window.event;
    //   let target = e.target || e.srcElement,
    //       pEl = target;
    //   if (!target) {
    //     return;
    //   }
    //   if (!hasEventListeners && hasClass(target, 'pika-select')) {
    //     if (!target.onchange) {
    //       target.setAttribute('onchange', 'return;');
    //       addEvent(target, 'change', self._onChange);
    //     }
    //   }
    //   do {
    //     if (hasClass(pEl, 'pika-single') || pEl === opts.trigger) {
    //       return;
    //     }
    //   }
    //   while ((pEl = pEl.parentNode));
    //   if (self._v && target !== opts.trigger && pEl !== opts.trigger) {
    //     self.hide();
    //   }
    // }


    renderDayName(opts, day, abbr) {
      day += opts.firstDay;
      while (day >= 7) {
        day -= 7;
      }
      return abbr ? opts.i18n.weekdaysShort[day] : opts.i18n.weekdays[day];
    }


    /**
     * Open Datepicker
     */
    open() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      if (typeof this.options.onOpen === 'function') {
        this.options.onOpen.call(this);
      }
      this.draw();
      this.modal.open();



      return this;
    }

    /**
     * Close Datepicker
     */
    close() {
      if (!this.isOpen) {
        return;
      }

      this.isOpen = false;
      if (v !== undefined && typeof this.options.onClose === 'function') {
        this.options.onClose.call(this);
      }
      this.modal.close();

      return this;
    }
  }

  Datepicker._template = [
		'<div class= "modal datepicker-modal">',
		  '<div class="modal-content datepicker-container">',
        '<div class="pika-single"></div>',
      '</div>',
		'</div>'
	].join('');


  Materialize.Datepicker = Datepicker;

  jQuery.fn.datepicker = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Datepicker.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Datepicker[methodOrOptions]();

      // Void methods
      } else {
        return this.each(function() {
          this.M_Datepicker[methodOrOptions]();
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Datepicker.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.datepicker`);
    }
  };

})(cash, Materialize.Vel);
