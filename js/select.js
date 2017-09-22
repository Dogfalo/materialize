(function ($) {
  'use strict';

  let _defaults = {
  };


  /**
   * @class
   *
   */
  class Select {
    /**
     * Construct Select instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_Select) {
        el.M_Select.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Select = this;

      /**
       * Options for the select
       * @member Select#options
       */
      this.options = $.extend({}, Select.defaults, options);

      this.isMultiple = this.el.getAttribute('multiple') ? true : false;

      // Setup
      this.valuesSelected = [];
      this._setupDropdown();

      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Select(this, options));
      });
      return arr;
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
      this._removeEventHandlers();
      this._removeDropdown();
      this.el.M_Select = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      // this._handleInputBlurBound = this._handleInputBlur.bind(this);
      // this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
      // this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
      // this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this);

      // this.el.addEventListener('blur', this._handleInputBlurBound);
      // this.el.addEventListener('keyup', this._handleInputKeyupAndFocusBound);
      // this.el.addEventListener('focus', this._handleInputKeyupAndFocusBound);
      // this.el.addEventListener('keydown', this._handleInputKeydownBound);
      // this.container.addEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);

      // if (typeof window.ontouchstart !== 'undefined') {
      //   this.container.addEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
      // }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      // this.el.removeEventListener('blur', this._handleInputBlurBound);
      // this.el.removeEventListener('keyup', this._handleInputKeyupAndFocusBound);
      // this.el.removeEventListener('focus', this._handleInputKeyupAndFocusBound);
      // this.el.removeEventListener('keydown', this._handleInputKeydownBound);
      // this.container.removeEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);

      // if (typeof window.ontouchstart !== 'undefined') {
      //   this.container.removeEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
      // }
    }

    /**
     * Handle Option Click
     * @param {Event} e
     */
    _handleOptionClick(e) {
      let option = e.target;
      if (!option.hasClass('disabled') && !option.hasClass('optgroup')) {
        let selected = true;

        if (this.isMultiple) {
          let checkbox = $(option).find('input[type="checkbox"]');
          checkbox.prop('checked', !checkbox.prop('checked'));
        }
      }
    }

    /**
     * Setup dropdown
     */
    _setupDropdown() {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('select-wrapper');
      this.$el.before($(this.wrapper));
      this.wrapper.append(this.el);

      if (this.el.disabled) {
        this.wrapper.classList.add('disabled');
      }

      // Create dropdown
      this.$selectOptions = this.$el.children('option, optgroup');
      this.dropdownOptions = document.createElement('ul');
      this.dropdownOptions.id = `select-options-${Materialize.guid()}`;
      $(this.dropdownOptions).addClass('dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : ''));

      // Create dropdown structure.
      if (this.$selectOptions.length) {
        this.$selectOptions.each((el) => {
          if ($(el).is('option')) {
            // Direct descendant option.
            if (this.isMultiple) {
              this._appendOptionWithIcon(this.$el, el, 'multiple');

            } else {
              this._appendOptionWithIcon(this.$el, el);
            }
          } else if ($(el).is('optgroup')) {
            // Optgroup.
            let selectOptions = $(el).children('option');
            this.dropdownOptions.append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>'));

            selectOptions.each((el) => {
              this._appendOptionWithIcon(this.$el, el, 'optgroup-option');
            });
          }
        });
      }

      this.$el.after(this.dropdownOptions);

      // Add input dropdown
      this.input = document.createElement('input');
      this.input.classList.add('select-dropdown');
      this.input.setAttribute('type', 'text');
      this.input.setAttribute('readonly', 'true');
      this.input.setAttribute('data-activates', this.dropdownOptions.id);
      this.input.setAttribute('value', "TODO");
      if (this.el.disabled) {
        $(this.input).prop('disabled', 'true');
      }

      this.$el.before(this.input);

      // Initialize dropdown
      if (!this.el.disabled) {
        $(this.input).dropdown();
      }
    }

    /**
     * Setup dropdown
     * @param {Element} select  select element
     * @param {Element} option  option element from select
     * @param {String} type
     */
    _appendOptionWithIcon(select, option, type) {
      // Add disabled attr if disabled
      let disabledClass = (option.disabled) ? 'disabled ' : '';
      let optgroupClass = (type === 'optgroup-option') ? 'optgroup-option ' : '';
      let multipleCheckbox = this.isMultiple ? '<input type="checkbox"' + disabledClass + '/><label></label>' : '';
      let liEl = $('<li></li>');
      let spanEl = $('<span></span>');
      spanEl.html(multipleCheckbox + option.innerHTML);
      liEl.addClass(`${disabledClass} ${optgroupClass}`);
      liEl.append(spanEl);

      // add icons
      let iconUrl = option.getAttribute('data-icon');
      let classes = option.getAttribute('class');
      if (!!iconUrl) {
        let classString = '';
        if (!!classes) classString = ' class="' + classes + '"';

        // Check for multiple type.
        let imgEl = $('<<img alt="" src="' + iconUrl + '"' + classString + '>');
        liEl.prepend(imgEl);
      }

      // Check for multiple type.
      this.dropdownOptions.append(liEl[0]);
    }

    /**
     * Toggle entry from option
     * @param {Array} entriesArray
     * @param {Number} entryIndex
     * @return {Boolean}  if entry was added or removed
     */
    _toggleEntryFromArray(entriesArray, entryIndex) {
      let index = entriesArray.indexOf(entryIndex),
          notAdded = index === -1;

      if (notAdded) {
        entriesArray.push(entryIndex);
      } else {
        entriesArray.splice(index, 1);
      }

      this.dropdownOptions.find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

      // use notAdded instead of true (to detect if the option is selected or not)
      this.$el.find('option').eq(entryIndex).prop('selected', notAdded);
      setValueToInput(entriesArray, select);

      return notAdded;
    }

    /**
     * Set value to input
     * @param {Array} entriesArray
     */
    _setValueToInput(entriesArray) {
      let value = '';

      for (let i = 0; i < entriesArray.length; i++) {
        let text = select.find('option').eq(entriesArray[i]).text();

        i === 0 ? value += text : value += ', ' + text;
      }

      if (value === '') {
        value = select.find('option:disabled').eq(0).text();
      }

      select.siblings('input.select-dropdown').val(value);
    }
  }

  /**
   * @static
   * @memberof Select
   */
  Select._keydown = false;

  Materialize.Select = Select;

  jQuery.fn.select = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Select.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        let instance = this.first()[0].M_Select;
        return instance[methodOrOptions].apply(instance, params);

      // Void methods
      } else {
        return this.each(function() {
          let instance = this.M_Select;
          instance[methodOrOptions].apply(instance, params);
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Select.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.select`);
    }
  };
}( cash ));
