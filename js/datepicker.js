(function($) {
  'use strict';

  let _defaults = {
    // Close when date is selected
    autoClose: false,

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

    // Show clear button
    showClearBtn: false,

    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok',
      previousMonth: '‹',
      nextMonth: '›',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },

    // events array
    events: [],

    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null
  };

  /**
   * @class
   *
   */
  class Datepicker extends Component {
    /**
     * Construct Datepicker instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Datepicker, el, options);

      this.el.M_Datepicker = this;

      this.options = $.extend({}, Datepicker.defaults, options);

      // make sure i18n defaults are not lost when only few i18n option properties are passed
      if (!!options && options.hasOwnProperty('i18n') && typeof options.i18n === 'object') {
        this.options.i18n = $.extend({}, Datepicker.defaults.i18n, options.i18n);
      }

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
      }

      let defDate = this.options.defaultDate;
      if (Datepicker._isDate(defDate)) {
        if (this.options.setDefaultDate) {
          this.setDate(defDate, true);
          this.setInputValue();
        } else {
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

    static init(els, options) {
      return super.init(this, els, options);
    }

    static _isDate(obj) {
      return /Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
    }

    static _isWeekend(date) {
      let day = date.getDay();
      return day === 0 || day === 6;
    }

    static _setToStartOfDay(date) {
      if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
    }

    static _getDaysInMonth(year, month) {
      return [31, Datepicker._isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][
        month
      ];
    }

    static _isLeapYear(year) {
      // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    static _compareDates(a, b) {
      // weak date comparison (use setToStartOfDay(date) to ensure correct result)
      return a.getTime() === b.getTime();
    }

    static _setToStartOfDay(date) {
      if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
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
      this._removeEventHandlers();
      this.modal.destroy();
      $(this.modalEl).remove();
      this.destroySelects();
      this.el.M_Datepicker = undefined;
    }

    destroySelects() {
      let oldYearSelect = this.calendarEl.querySelector('.orig-select-year');
      if (oldYearSelect) {
        M.FormSelect.getInstance(oldYearSelect).destroy();
      }
      let oldMonthSelect = this.calendarEl.querySelector('.orig-select-month');
      if (oldMonthSelect) {
        M.FormSelect.getInstance(oldMonthSelect).destroy();
      }
    }

    _insertHTMLIntoDOM() {
      if (this.options.showClearBtn) {
        $(this.clearBtn).css({ visibility: '' });
        this.clearBtn.innerHTML = this.options.i18n.clear;
      }

      this.doneBtn.innerHTML = this.options.i18n.done;
      this.cancelBtn.innerHTML = this.options.i18n.cancel;

      if (this.options.container) {
        this.$modalEl.appendTo(this.options.container);
      } else {
        this.$modalEl.insertBefore(this.el);
      }
    }

    _setupModal() {
      this.modalEl.id = 'modal-' + this.id;
      this.modal = M.Modal.init(this.modalEl, {
        onCloseEnd: () => {
          this.isOpen = false;
        }
      });
    }

    toString(format) {
      format = format || this.options.format;
      if (!Datepicker._isDate(this.date)) {
        return '';
      }

      let formatArray = format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
      let formattedDate = formatArray
        .map((label) => {
          if (this.formats[label]) {
            return this.formats[label]();
          }

          return label;
        })
        .join('');
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
      this.$el.trigger('change', { firedBy: this });
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
          lastVisibleDate = new Date(
            this.calendars[this.calendars.length - 1].year,
            this.calendars[this.calendars.length - 1].month,
            1
          ),
          visibleDate = date.getTime();
        // get the end of the month
        lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
        lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
        newCalendar =
          visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
      }

      if (newCalendar) {
        this.calendars = [
          {
            month: date.getMonth(),
            year: date.getFullYear()
          }
        ];
      }

      this.adjustCalendars();
    }

    adjustCalendars() {
      this.calendars[0] = this.adjustCalendar(this.calendars[0]);
      this.draw();
    }

    adjustCalendar(calendar) {
      if (calendar.month < 0) {
        calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
        calendar.month += 12;
      }
      if (calendar.month > 11) {
        calendar.year += Math.floor(Math.abs(calendar.month) / 12);
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
      let opts = this.options,
        now = new Date(),
        days = Datepicker._getDaysInMonth(year, month),
        before = new Date(year, month, 1).getDay(),
        data = [],
        row = [];
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
      while (after > 7) {
        after -= 7;
      }
      cells += 7 - after;
      let isWeekSelected = false;
      for (let i = 0, r = 0; i < cells; i++) {
        let day = new Date(year, month, 1 + (i - before)),
          isSelected = Datepicker._isDate(this.date)
            ? Datepicker._compareDates(day, this.date)
            : false,
          isToday = Datepicker._compareDates(day, now),
          hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false,
          isEmpty = i < before || i >= days + before,
          dayNumber = 1 + (i - before),
          monthNumber = month,
          yearNumber = year,
          isStartRange = opts.startRange && Datepicker._compareDates(opts.startRange, day),
          isEndRange = opts.endRange && Datepicker._compareDates(opts.endRange, day),
          isInRange =
            opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange,
          isDisabled =
            (opts.minDate && day < opts.minDate) ||
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
          showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
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
      return (
        `<td data-day="${opts.day}" class="${arr.join(' ')}" aria-selected="${ariaSelected}">` +
        `<button class="datepicker-day-button" type="button" data-year="${opts.year}" data-month="${
          opts.month
        }" data-day="${opts.day}">${opts.day}</button>` +
        '</td>'
      );
    }

    renderRow(days, isRTL, isRowSelected) {
      return (
        '<tr class="datepicker-row' +
        (isRowSelected ? ' is-selected' : '') +
        '">' +
        (isRTL ? days.reverse() : days).join('') +
        '</tr>'
      );
    }

    renderTable(opts, data, randId) {
      return (
        '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' +
        randId +
        '">' +
        this.renderHead(opts) +
        this.renderBody(data) +
        '</table></div>'
      );
    }

    renderHead(opts) {
      let i,
        arr = [];
      for (i = 0; i < 7; i++) {
        arr.push(
          `<th scope="col"><abbr title="${this.renderDayName(opts, i)}">${this.renderDayName(
            opts,
            i,
            true
          )}</abbr></th>`
        );
      }
      return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
    }

    renderBody(rows) {
      return '<tbody>' + rows.join('') + '</tbody>';
    }

    renderTitle(instance, c, year, month, refYear, randId) {
      let i,
        j,
        arr,
        opts = this.options,
        isMinYear = year === opts.minYear,
        isMaxYear = year === opts.maxYear,
        html =
          '<div id="' +
          randId +
          '" class="datepicker-controls" role="heading" aria-live="assertive">',
        monthHtml,
        yearHtml,
        prev = true,
        next = true;

      for (arr = [], i = 0; i < 12; i++) {
        arr.push(
          '<option value="' +
            (year === refYear ? i - c : 12 + i - c) +
            '"' +
            (i === month ? ' selected="selected"' : '') +
            ((isMinYear && i < opts.minMonth) || (isMaxYear && i > opts.maxMonth)
              ? 'disabled="disabled"'
              : '') +
            '>' +
            opts.i18n.months[i] +
            '</option>'
        );
      }

      monthHtml =
        '<select class="datepicker-select orig-select-month" tabindex="-1">' +
        arr.join('') +
        '</select>';

      if ($.isArray(opts.yearRange)) {
        i = opts.yearRange[0];
        j = opts.yearRange[1] + 1;
      } else {
        i = year - opts.yearRange;
        j = 1 + year + opts.yearRange;
      }

      for (arr = []; i < j && i <= opts.maxYear; i++) {
        if (i >= opts.minYear) {
          arr.push(`<option value="${i}" ${i === year ? 'selected="selected"' : ''}>${i}</option>`);
        }
      }

      yearHtml = `<select class="datepicker-select orig-select-year" tabindex="-1">${arr.join(
        ''
      )}</select>`;

      let leftArrow =
        '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>';
      html += `<button class="month-prev${
        prev ? '' : ' is-disabled'
      }" type="button">${leftArrow}</button>`;

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

      let rightArrow =
        '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>';
      html += `<button class="month-next${
        next ? '' : ' is-disabled'
      }" type="button">${rightArrow}</button>`;

      return (html += '</div>');
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

      randId =
        'datepicker-title-' +
        Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, '')
          .substr(0, 2);

      for (let c = 0; c < 1; c++) {
        this._renderDateDisplay();
        html +=
          this.renderTitle(
            this,
            c,
            this.calendars[c].year,
            this.calendars[c].month,
            this.calendars[0].year,
            randId
          ) + this.render(this.calendars[c].year, this.calendars[c].month, randId);
      }

      this.destroySelects();

      this.calendarEl.innerHTML = html;

      // Init Materialize Select
      let yearSelect = this.calendarEl.querySelector('.orig-select-year');
      let monthSelect = this.calendarEl.querySelector('.orig-select-month');
      M.FormSelect.init(yearSelect, {
        classes: 'select-year',
        dropdownOptions: { container: document.body, constrainWidth: false }
      });
      M.FormSelect.init(monthSelect, {
        classes: 'select-month',
        dropdownOptions: { container: document.body, constrainWidth: false }
      });

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
      this._handleInputChangeBound = this._handleInputChange.bind(this);
      this._handleCalendarClickBound = this._handleCalendarClick.bind(this);
      this._finishSelectionBound = this._finishSelection.bind(this);
      this._handleMonthChange = this._handleMonthChange.bind(this);
      this._closeBound = this.close.bind(this);

      this.el.addEventListener('click', this._handleInputClickBound);
      this.el.addEventListener('keydown', this._handleInputKeydownBound);
      this.el.addEventListener('change', this._handleInputChangeBound);
      this.calendarEl.addEventListener('click', this._handleCalendarClickBound);
      this.doneBtn.addEventListener('click', this._finishSelectionBound);
      this.cancelBtn.addEventListener('click', this._closeBound);

      if (this.options.showClearBtn) {
        this._handleClearClickBound = this._handleClearClick.bind(this);
        this.clearBtn.addEventListener('click', this._handleClearClickBound);
      }
    }

    _setupVariables() {
      this.$modalEl = $(Datepicker._template);
      this.modalEl = this.$modalEl[0];

      this.calendarEl = this.modalEl.querySelector('.datepicker-calendar');

      this.yearTextEl = this.modalEl.querySelector('.year-text');
      this.dateTextEl = this.modalEl.querySelector('.date-text');
      if (this.options.showClearBtn) {
        this.clearBtn = this.modalEl.querySelector('.datepicker-clear');
      }
      this.doneBtn = this.modalEl.querySelector('.datepicker-done');
      this.cancelBtn = this.modalEl.querySelector('.datepicker-cancel');

      this.formats = {
        d: () => {
          return this.date.getDate();
        },
        dd: () => {
          let d = this.date.getDate();
          return (d < 10 ? '0' : '') + d;
        },
        ddd: () => {
          return this.options.i18n.weekdaysShort[this.date.getDay()];
        },
        dddd: () => {
          return this.options.i18n.weekdays[this.date.getDay()];
        },
        m: () => {
          return this.date.getMonth() + 1;
        },
        mm: () => {
          let m = this.date.getMonth() + 1;
          return (m < 10 ? '0' : '') + m;
        },
        mmm: () => {
          return this.options.i18n.monthsShort[this.date.getMonth()];
        },
        mmmm: () => {
          return this.options.i18n.months[this.date.getMonth()];
        },
        yy: () => {
          return ('' + this.date.getFullYear()).slice(2);
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
        if (
          $target.hasClass('datepicker-day-button') &&
          !$target.hasClass('is-empty') &&
          !$target.parent().hasClass('is-disabled')
        ) {
          this.setDate(
            new Date(
              e.target.getAttribute('data-year'),
              e.target.getAttribute('data-month'),
              e.target.getAttribute('data-day')
            )
          );
          if (this.options.autoClose) {
            this._finishSelection();
          }
        } else if ($target.closest('.month-prev').length) {
          this.prevMonth();
        } else if ($target.closest('.month-next').length) {
          this.nextMonth();
        }
      }
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
    '<div class="datepicker-calendar"></div>',
    '<div class="datepicker-footer">',
    '<button class="btn-flat datepicker-clear waves-effect" style="visibility: hidden;" type="button"></button>',
    '<div class="confirmation-btns">',
    '<button class="btn-flat datepicker-cancel waves-effect" type="button"></button>',
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
