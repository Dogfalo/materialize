(function($) {
  'use strict';

  let _defaults = {

    // the default output format for the input field value
    format: 'mmm dd, yyyy',

    // Used to create date object from current input string
    parse: null,

    // The initial date to view when first opened
    defaultDate: null,

    // Make the `defaultDate` the initial selected value
    setDefaultDate: false,

    disableWeekends: false,

    disableDayFn: null,

    // First day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,

    // The earliest date that can be selected
    minDate: null,
    // Thelatest date that can be selected
    maxDate: null,

    // Number of years either side, or array of upper/lower range
    yearRange: 10,

    // used internally (don't config outside)
    minYear: 0,
    maxYear: 9999,
    minMonth: undefined,
    maxMonth: undefined,

    startRange: null,
    endRange: null,

    isRTL: false,

    // Render the month after year in the calendar title
    showMonthAfterYear: false,

    // Render days of the calendar grid that fall in the next or previous month
    showDaysInNextAndPreviousMonths: false,

    // Specify a DOM element to render the calendar in
    container: null,

    // internationalization
    i18n: {
      clear: 'Clear',
      today: 'Today',
      done: 'Ok',
      previousMonth : '‹',
      nextMonth     : '›',
      months        : ['January','February','March','April','May','June','July','August','September','October','November','December'],
      monthsShort   : ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      weekdaysShort : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
      weekdays      : ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
      weekdaysAbbrev : ['S','M','T','W','T','F','S']
    },

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

      // Remove time component from minDate and maxDate options
      if (this.options.minDate) this.options.minDate.setHours(0, 0, 0, 0);
      if (this.options.maxDate) this.options.maxDate.setHours(0, 0, 0, 0);

      this.id = M.guid();

      this._setupVariables();
      this._insertHTMLIntoDOM();
      this._setupModal();

      this._setupEventHandlers();

      if (!this.options.defaultDate) {
        this.options.defaultDate = new Date(Date.parse(this.el.value));
        this.options.setDefaultDate = true;
      }

      let defDate = this.options.defaultDate;

      if (Datepicker._isDate(defDate)) {
        if (this.options.setDefaultDate) {
          this.setDate(defDate, true);
        }
        else {
          this.gotoDate(defDate);
        }
      } else {
        this.gotoDate(new Date());
      }


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

    static _isWeekend(date) {
      let day = date.getDay();
      return day === 0 || day === 6;
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

    static _setToStartOfDay(date) {
      if (Datepicker._isDate(date)) date.setHours(0,0,0,0);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Datepicker;
    }

    /**
     * Teardown component
     */
    destroy() {

    }

    _insertHTMLIntoDOM() {
      this.clearBtn.innerHTML = this.options.i18n.clear;
      this.todayBtn.innerHTML = this.options.i18n.today;
      this.doneBtn.innerHTML = this.options.i18n.done;

      let containerEl = document.querySelector(this.options.container);
      if (this.options.container && !!containerEl) {
        this.$modalEl.appendTo(containerEl);

      } else {
        this.$modalEl.insertBefore(this.el);
      }
    }


    _setupModal() {
      this.modalEl.id = 'modal-' + this.id;
      this.modal = new M.Modal(this.modalEl, {
        complete: () => {
          this.isOpen = false;
        }
      });
    }

    toString(format) {
      format = format || this.options.format;
      if (!Datepicker._isDate(this.date)) {
        return '';
      }

      let formatArray = format.split( /(d{1,4}|m{1,4}|y{4}|yy|!.)/g );
      let formattedDate = formatArray.map((label) => {
        if (this.formats[label]) {
          return this.formats[label]();
        } else {
          return label;
        }
      }).join( '' );
      return formattedDate;
    }

    setDate(date, preventOnSelect) {
      if (!date) {
        this.date = null;
        this._renderDateDisplay();
        return this.draw();
      }
      if (typeof date === 'string') {
        date = new Date(Date.parse(date));
      }
      if (!Datepicker._isDate(date)) {
        return;
      }

      let min = this.options.minDate,
          max = this.options.maxDate;

      if (Datepicker._isDate(min) && date < min) {
        date = min;
      } else if (Datepicker._isDate(max) && date > max) {
        date = max;
      }

      this.date = new Date(date.getTime());

      this._renderDateDisplay();

      Datepicker._setToStartOfDay(this.date);
      this.gotoDate(this.date);

      if (!preventOnSelect && typeof this.options.onSelect === 'function') {
        this.options.onSelect.call(this, this.date);
      }
    }

    setInputValue() {
      this.el.value = this.toString();
      this.$el.trigger('change', {firedBy: this});
    }

    _renderDateDisplay() {
      let displayDate = Datepicker._isDate(this.date) ? this.date : new Date();
      let i18n = this.options.i18n;
      let day = i18n.weekdaysShort[displayDate.getDay()];
      let month = i18n.monthsShort[displayDate.getMonth()];
      let date = displayDate.getDate();
      this.yearTextEl.innerHTML = displayDate.getFullYear();
      this.dateTextEl.innerHTML = `${day}, ${month} ${date}`;
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
        // if (this.options.mainCalendar === 'right') {
        //   this.calendars[0].month += 1 - this.options.numberOfMonths;
        // }
      }

      this.adjustCalendars();
    }

    adjustCalendars() {
      this.calendars[0] = this.adjustCalendar(this.calendars[0]);
      // for (let c = 1; c < this.options.numberOfMonths; c++) {
      //   this.calendars[c] = this.adjustCalendar({
      //     month: this.calendars[0].month + c,
      //     year: this.calendars[0].year
      //   });
      // }
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

    nextMonth() {
      this.calendars[0].month++;
      this.adjustCalendars();
    }

    prevMonth() {
      this.calendars[0].month--;
      this.adjustCalendars();
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
            isSelected = Datepicker._isDate(this.date) ? Datepicker._compareDates(day, this.date) : false,
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
                (opts.disableWeekends && Datepicker._isWeekend(day)) ||
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
        };

        row.push(this.renderDay(dayConfig));

        if (++r === 7) {
          data.push(this.renderRow(row, opts.isRTL, isWeekSelected));
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
          arr.push('is-selection-disabled');

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
        '<button class="datepicker-day-button" type="button" ' +
        'data-pika-year="' + opts.year + '" data-pika-month="' + opts.month + '" data-pika-day="' + opts.day + '">' +
        opts.day +
        '</button>' +
        '</td>';
    }

    renderRow(days, isRTL, isRowSelected) {
      return '<tr class="pika-row' + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
    }

    renderTable(opts, data, randId) {
      return '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' +
        randId + '">' +
        this.renderHead(opts) + this.renderBody(data) + '</table></div>';
    }

    renderHead(opts) {
      let i, arr = [];
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
          html = '<div id="' + randId + '" class="datepicker-controls" role="heading" aria-live="assertive">',
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

      monthHtml = '<select class="pika-select pika-select-month" tabindex="-1">' + arr.join('') + '</select>';

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

      yearHtml = '<select class="pika-select pika-select-year" tabindex="-1">' + arr.join('') + '</select>';

      let leftArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>';
      html += '<button class="month-prev' + (prev ? '' : ' is-disabled') + '" type="button">' + leftArrow + '</button>';


      html += '<div class="selects-container">';
      if (opts.showMonthAfterYear) {
        html += yearHtml + monthHtml;
      } else {
        html += monthHtml + yearHtml;
      }
      html += '</div>';

      if (isMinYear && (month === 0 || opts.minMonth >= month)) {
        prev = false;
      }

      if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
        next = false;
      }


      // if (c === (this.options.numberOfMonths - 1) ) {
      let rightArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>';
        html += '<button class="month-next' + (next ? '' : ' is-disabled') + '" type="button">' + rightArrow + '</button>';
      // }

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


      for (let c = 0; c < 1; c++) {
        this._renderDateDisplay();
        html +=
          this.renderTitle(this,
                      c,
                      this.calendars[c].year,
                      this.calendars[c].month,
                      this.calendars[0].year, randId) +
          this.render(this.calendars[c].year, this.calendars[c].month, randId);
      }

      this.calendarEl.innerHTML = html;

      // Init Materialize Select
      let yearSelect = this.calendarEl.querySelector('.pika-select-year');
      let monthSelect = this.calendarEl.querySelector('.pika-select-month');
      new M.Select(yearSelect, {classes: 'select-year'});
      new M.Select(monthSelect, {classes: 'select-month'});

      // Add change handlers for select
      yearSelect.addEventListener('change', this._handleYearChange.bind(this));
      monthSelect.addEventListener('change', this._handleMonthChange.bind(this));

      if (typeof this.options.onDraw === 'function') {
        this.options.onDraw(this);
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
      this._finishSelectionBound = this._finishSelection.bind(this);
      this._handleTodayClickBound = this._handleTodayClick.bind(this);
      this._handleClearClickBound = this._handleClearClick.bind(this);
      this._handleMonthChange = this._handleMonthChange.bind(this);

      this.el.addEventListener('click', this._handleInputClickBound);
      this.el.addEventListener('keydown', this._handleInputKeydownBound);
      this.el.addEventListener('change', this._handleInputChangeBound);
      this.calendarEl.addEventListener('click', this._handleCalendarClickBound);
      this.doneBtn.addEventListener('click', this._finishSelectionBound);
      this.todayBtn.addEventListener('click', this._handleTodayClickBound);
      this.clearBtn.addEventListener('click', this._handleClearClickBound);
    }

    _setupVariables() {
      this.$modalEl = $(Datepicker._template);
      this.modalEl = this.$modalEl[0];

		  this.calendarEl = this.modalEl.querySelector('.pika-single');

      this.yearTextEl = this.modalEl.querySelector('.year-text');
      this.dateTextEl = this.modalEl.querySelector('.date-text');
      this.clearBtn = this.modalEl.querySelector('.datepicker-clear');
      this.todayBtn = this.modalEl.querySelector('.datepicker-today');
      this.doneBtn = this.modalEl.querySelector('.datepicker-done');

      this.formats = {

        dd: () => {
          return this.date.getDate();
        },
        ddd: () => {
          return this.options.i18n.weekdaysShort[this.date.getDay()];
        },
        dddd: () => {
          return this.options.i18n.weekdays[this.date.getDay()];
        },
        mm: () => {
          return this.date.getMonth() + 1;
        },
        mmm: () => {
          return this.options.i18n.monthsShort[this.date.getMonth()];
        },
        mmmm: () => {
          return this.options.i18n.monthsShort[this.date.getMonth()];
        },
        yy: () => {
          return this.date.getFullYear().slice(2);
        },
        yyyy: () => {
          return this.date.getFullYear();
        }
      };
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('click', this._handleInputClickBound);
      this.el.removeEventListener('keydown', this._handleInputKeydownBound);
      this.el.removeEventListener('change', this._handleInputChangeBound);
      this.calendarEl.removeEventListener('click', this._handleCalendarClickBound);
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

    _handleCalendarClick(e) {
      if (!this.isOpen) {
        return;
      }

      let $target = $(e.target);
      if (!$target.hasClass('is-disabled')) {
        if ($target.hasClass('datepicker-day-button') &&
            !$target.hasClass('is-empty') &&
            !$target.parent().hasClass('is-disabled')) {
          this.setDate(new Date(e.target.getAttribute('data-pika-year'),
                                e.target.getAttribute('data-pika-month'),
                                e.target.getAttribute('data-pika-day')));
        }
        else if ($target.closest('.month-prev').length) {
          this.prevMonth();
        }
        else if ($target.closest('.month-next').length) {
          this.nextMonth();
        }
      }
      // if (!$target.hasClass('pika-select')) {
      //   // if this is touch event prevent mouse events emulation
      //   // if (e.preventDefault) {
      //   //   e.preventDefault();
      //   // } else {
      //   //   e.returnValue = false;
      //   //   return false;
      //   // }
      // } else {
      //   this._c = true;
      // }
    }

    _handleTodayClick() {
      this.date = new Date();
      this.setInputValue();
      this.close();
    }

    _handleClearClick() {
      this.date = null;
      this.setInputValue();
      this.close();
    }

    _handleMonthChange(e) {
      this.gotoMonth(e.target.value);
    }

    _handleYearChange(e) {
      this.gotoYear(e.target.value);
    }


    /**
     * change view to a specific month (zero-index, e.g. 0: January)
     */
    gotoMonth(month) {
      if (!isNaN(month)) {
        this.calendars[0].month = parseInt(month, 10);
        this.adjustCalendars();
      }
    }


    /**
     * change view to a specific full year (e.g. "2012")
     */
    gotoYear(year) {
      if (!isNaN(year)) {
        this.calendars[0].year = parseInt(year, 10);
        this.adjustCalendars();
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

    renderDayName(opts, day, abbr) {
      day += opts.firstDay;
      while (day >= 7) {
        day -= 7;
      }
      return abbr ? opts.i18n.weekdaysAbbrev[day] : opts.i18n.weekdays[day];
    }

    /**
     * Set input value to the selected date and close Datepicker
     */
    _finishSelection() {
      this.setInputValue();
      this.close();
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
      if (typeof this.options.onClose === 'function') {
        this.options.onClose.call(this);
      }
      this.modal.close();
      return this;
    }
  }

  Datepicker._template = [
		'<div class= "modal datepicker-modal">',
		  '<div class="modal-content datepicker-container">',
        '<div class="datepicker-date-display">',
          '<span class="year-text"></span>',
          '<span class="date-text"></span>',
        '</div>',
        '<div class="datepicker-calendar-container">',
          '<div class="pika-single"></div>',
          '<div class="datepicker-footer">',
            '<button class="btn-flat datepicker-clear waves-effect" type="button"></button>',
            '<div class="confirmation-btns">',
              '<button class="btn-flat datepicker-today waves-effect" type="button"></button>',
              '<button class="btn-flat datepicker-done waves-effect" type="button"></button>',
            '</div>',
          '</div>',
        '</div>',
      '</div>',
		'</div>'
	].join('');

  M.Datepicker = Datepicker;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Datepicker, 'datepicker', 'M_Datepicker');
  }

})(cash);
