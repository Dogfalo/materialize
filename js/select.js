(function($) {
  'use strict';

  let _defaults = {
    classes: '',
    dropdownOptions: {}
  };

  /**
   * @class
   *
   */
  class FormSelect extends Component {
    /**
     * Construct FormSelect instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(FormSelect, el, options);

      // Don't init if browser default version
      if (this.$el.hasClass('browser-default')) {
        return;
      }

      this.el.M_FormSelect = this;

      /**
       * Options for the select
       * @member FormSelect#options
       */
      this.options = $.extend({}, FormSelect.defaults, options);

      this.isMultiple = this.$el.prop('multiple');
      this.isFiltered =
        typeof this.$el.data('filtered') !== 'undefined'
          ? this.$el.data('filtered') || false
          : false;

      // Setup
      this.el.tabIndex = -1;
      this._keysSelected = {};
      this._valueDict = {}; // Maps key to original and generated option element.
      this._setupDropdown();

      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init(els, options) {
      return super.init(this, els, options);
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_FormSelect;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this._removeDropdown();
      this.el.M_FormSelect = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleSelectChangeBound = this._handleSelectChange.bind(this);
      this._handleOptionClickBound = this._handleOptionClick.bind(this);
      this._handleInputClickBound = this._handleInputClick.bind(this);

      $(this.dropdownOptions)
        .find('li:not(.optgroup):not(.filter)')
        .each((el) => {
          el.addEventListener('click', this._handleOptionClickBound);
        });
      this.el.addEventListener('change', this._handleSelectChangeBound);
      this.input.addEventListener('click', this._handleInputClickBound);

      if (this.isFiltered && this.filter) {
        this._handleFilterChangeBound = this._handleFilterChange.bind(this);
        this.filter.addEventListener('keyup', this._handleFilterChangeBound);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      $(this.dropdownOptions)
        .find('li:not(.optgroup):not(.filter)')
        .each((el) => {
          el.removeEventListener('click', this._handleOptionClickBound);
        });
      this.el.removeEventListener('change', this._handleSelectChangeBound);
      this.input.removeEventListener('click', this._handleInputClickBound);
      if (this.isFiltered && this.filter) {
        this.filter.removeEventListener('keyup', this._handleFilterChangeBound);
      }
    }

    /**
     * Handle Select Change
     * @param {Event} e
     */
    _handleSelectChange(e) {
      this._setValueToInput();
    }

    /**
     * Handle Option Click
     * @param {Event} e
     */
    _handleOptionClick(e) {
      e.preventDefault();
      let optionEl = $(e.target).closest('li')[0];
      this._selectOption(optionEl);
      e.stopPropagation();
    }

    _selectOption(optionEl) {
      let key = optionEl.id;
      if (
        !$(optionEl).hasClass('disabled') &&
        !$(optionEl).hasClass('optgroup') &&
        !$(optionEl).hasClass('filter') &&
        key.length
      ) {
        let selected = true;

        if (this.isMultiple) {
          // Deselect placeholder option if still selected.
          let placeholderOption = $(this.dropdownOptions).find('li.disabled.selected');
          if (placeholderOption.length) {
            placeholderOption.removeClass('selected');
            placeholderOption.find('input[type="checkbox"]').prop('checked', false);
            this._toggleEntryFromArray(placeholderOption[0].id);
          }
          selected = this._toggleEntryFromArray(key);
        } else {
          $(this.dropdownOptions)
            .find('li')
            .removeClass('selected');
          $(optionEl).toggleClass('selected', selected);
          this._keysSelected = {};
          this._keysSelected[optionEl.id] = true;
        }

        // Set selected on original select option
        // Only trigger if selected state changed
        let prevSelected = $(this._valueDict[key].el).prop('selected');
        if (prevSelected !== selected) {
          $(this._valueDict[key].el).prop('selected', selected);
          this.$el.trigger('change');
        }
      }

      if (!this.isMultiple) {
        this.dropdown.close();
      }
    }

    /**
     * Handle Input Click
     */
    _handleInputClick() {
      if (this.dropdown && this.dropdown.isOpen) {
        this._setValueToInput();
        this._setSelectedStates();
      }
    }

    /**
     * Handle Filter Change
     */
    _handleFilterChange(e) {
      if (this.dropdown && this.dropdown.isOpen) {
        let text = this.filter.value.toLowerCase();
        $(this.dropdownOptions)
          .find('li:not(.optgroup):not(.filter)')
          .each((el) => {
            $(el)
              .text()
              .toLowerCase()
              .indexOf(text) > -1
              ? el.classList.remove('hide')
              : el.classList.add('hide');
          });

        this.dropdown.focusedIndex = 0;
        this.dropdown._focusFocusedItem();
        this.dropdown.recalculateDimensions();
        this.filter.focus();
      }
    }

    /**
     * Setup dropdown
     */
    _setupDropdown() {
      this.wrapper = document.createElement('div');
      $(this.wrapper).addClass('select-wrapper ' + this.options.classes);
      this.$el.before($(this.wrapper));
      // Move actual select element into overflow hidden wrapper
      let $hideSelect = $('<div class="hide-select"></div>');
      $(this.wrapper).append($hideSelect);
      $hideSelect[0].appendChild(this.el);

      if (this.el.disabled) {
        this.wrapper.classList.add('disabled');
      }

      // Create dropdown
      this.$selectOptions = this.$el.children('option, optgroup');
      this.dropdownOptions = document.createElement('ul');
      this.dropdownOptions.id = `select-options-${M.guid()}`;
      $(this.dropdownOptions).addClass(
        'dropdown-content select-dropdown ' +
          (this.isMultiple ? ' multiple-select-dropdown' : '') +
          (this.isFiltered ? ' filtered-select-dropdown' : '')
      );

      // Create dropdown structure.
      if (this.$selectOptions.length) {
        if (this.isFiltered) {
          this._appendOptionFilter();
        }

        this.$selectOptions.each((el) => {
          if ($(el).is('option')) {
            // Direct descendant option.
            let optionEl;
            if (this.isMultiple) {
              optionEl = this._appendOptionWithIcon(this.$el, el, 'multiple');
            } else {
              optionEl = this._appendOptionWithIcon(this.$el, el);
            }

            this._addOptionToValueDict(el, optionEl);
          } else if ($(el).is('optgroup')) {
            // Optgroup.
            let selectOptions = $(el).children('option');
            $(this.dropdownOptions).append(
              $('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]
            );

            selectOptions.each((el) => {
              let optionEl = this._appendOptionWithIcon(this.$el, el, 'optgroup-option');
              this._addOptionToValueDict(el, optionEl);
            });
          }
        });
      }

      $(this.wrapper).append(this.dropdownOptions);

      // Add input dropdown
      this.input = document.createElement('input');
      $(this.input).addClass('select-dropdown dropdown-trigger');
      this.input.setAttribute('type', 'text');
      this.input.setAttribute('readonly', 'true');
      this.input.setAttribute('data-target', this.dropdownOptions.id);
      if (this.el.disabled) {
        $(this.input).prop('disabled', 'true');
      }

      $(this.wrapper).prepend(this.input);
      this._setValueToInput();

      // Add caret
      let dropdownIcon = $(
        '<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
      );
      $(this.wrapper).prepend(dropdownIcon[0]);

      // Initialize dropdown
      if (!this.el.disabled) {
        let dropdownOptions = $.extend({}, this.options.dropdownOptions);
        let userOnOpenEnd = dropdownOptions.onOpenEnd;

        // Add callback for cleaning up filter
        dropdownOptions.onOpenStart = () => {
          if (this.isFiltered && this.filter) {
            this.filter.value = '';
            this._handleFilterChange();
          }
        };

        // Add callback for centering selected option when dropdown content is scrollable
        dropdownOptions.onOpenEnd = (el) => {
          let selectedOption = $(this.dropdownOptions)
            .find('.selected')
            .first();

          if (selectedOption.length) {
            // Focus selected option in dropdown
            M.keyDown = true;
            this.dropdown.focusedIndex = selectedOption.index();
            this.dropdown._focusFocusedItem();
            M.keyDown = false;

            // Handle scrolling to selected option
            if (this.dropdown.isScrollable) {
              let scrollOffset =
                selectedOption[0].getBoundingClientRect().top -
                this.dropdownOptions.getBoundingClientRect().top; // scroll to selected option
              scrollOffset -= this.dropdownOptions.clientHeight / 2; // center in dropdown
              this.dropdownOptions.scrollTop = scrollOffset;
            }
          }

          if (this.isFiltered && this.filter) {
            this.filter.focus();
          }
          // Handle user declared onOpenEnd if needed
          if (userOnOpenEnd && typeof userOnOpenEnd === 'function') {
            userOnOpenEnd.call(this.dropdown, this.el);
          }
        };

        // Add callback for handling option filter when dropdown content is filtered
        if (this.isFiltered) {
          dropdownOptions.onTextInput = (el, e) => {
            // Bring back focus to filter input, just in case arrow keys were used before to take it away
            let letter = String.fromCharCode(e.which).toLowerCase(),
              nonLetters = [9, 13, 27, 38, 40];
            if (letter && nonLetters.indexOf(e.which) === -1) {
              if (!$(this.filter).is(':focus')) {
                this.filter.focus();
              }
            }
          };
        }

        // Prevent dropdown from closeing too early
        dropdownOptions.closeOnClick = false;

        this.dropdown = M.Dropdown.init(this.input, dropdownOptions);
      }

      // Add initial selections
      this._setSelectedStates();
    }

    /**
     * Add option to value dict
     * @param {Element} el  original option element
     * @param {Element} optionEl  generated option element
     */
    _addOptionToValueDict(el, optionEl) {
      let index = Object.keys(this._valueDict).length;
      let key = this.dropdownOptions.id + index;
      let obj = {};
      optionEl.id = key;

      obj.el = el;
      obj.optionEl = optionEl;
      this._valueDict[key] = obj;
    }

    /**
     * Remove dropdown
     */
    _removeDropdown() {
      $(this.wrapper)
        .find('.caret')
        .remove();
      $(this.input).remove();
      $(this.dropdownOptions).remove();
      $(this.wrapper).before(this.$el);
      $(this.wrapper).remove();
    }

    /**
     * Setup dropdown
     * @return {Element}  option element added
     */
    _appendOptionFilter() {
      let filterInput = `<label><input type="text" placeholder="${this.isFiltered}"/></label>`;
      let liEl = $('<li></li>');
      let spanEl = $('<span></span>');
      spanEl.html(filterInput);
      liEl.addClass(`filter disabled`);
      liEl.append(spanEl);

      $(this.dropdownOptions).append(liEl[0]);
      this.filter = $(this.dropdownOptions)
        .find('.filter input')
        .get(0);
      return liEl[0];
    }

    /**
     * Setup dropdown
     * @param {Element} select  select element
     * @param {Element} option  option element from select
     * @param {String} type
     * @return {Element}  option element added
     */
    _appendOptionWithIcon(select, option, type) {
      // Add disabled attr if disabled
      let disabledClass = option.disabled ? 'disabled ' : '';
      let optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
      let multipleCheckbox = this.isMultiple
        ? `<label><input type="checkbox"${disabledClass}"/><span>${option.innerHTML}</span></label>`
        : option.innerHTML;
      let liEl = $('<li></li>');
      let spanEl = $('<span></span>');
      spanEl.html(multipleCheckbox);
      liEl.addClass(`${disabledClass} ${optgroupClass}`);
      liEl.append(spanEl);

      // add icons
      let iconUrl = option.getAttribute('data-icon');
      if (!!iconUrl) {
        let imgEl = $(`<img alt="" src="${iconUrl}">`);
        liEl.prepend(imgEl);
      }

      // Check for multiple type.
      $(this.dropdownOptions).append(liEl[0]);
      return liEl[0];
    }

    /**
     * Toggle entry from option
     * @param {String} key  Option key
     * @return {Boolean}  if entry was added or removed
     */
    _toggleEntryFromArray(key) {
      let notAdded = !this._keysSelected.hasOwnProperty(key);
      let $optionLi = $(this._valueDict[key].optionEl);

      if (notAdded) {
        this._keysSelected[key] = true;
      } else {
        delete this._keysSelected[key];
      }

      $optionLi.toggleClass('selected', notAdded);

      // Set checkbox checked value
      $optionLi.find('input[type="checkbox"]').prop('checked', notAdded);

      // use notAdded instead of true (to detect if the option is selected or not)
      $optionLi.prop('selected', notAdded);

      return notAdded;
    }

    /**
     * Set text value to input
     */
    _setValueToInput() {
      let values = [];
      let options = this.$el.find('option');

      options.each((el) => {
        if ($(el).prop('selected')) {
          let text = $(el).text();
          values.push(text);
        }
      });

      if (!values.length) {
        let firstDisabled = this.$el.find('option:disabled').eq(0);
        if (firstDisabled.length && firstDisabled[0].value === '') {
          values.push(firstDisabled.text());
        }
      }

      this.input.value = values.join(', ');
    }

    /**
     * Set selected state of dropdown to match actual select element
     */
    _setSelectedStates() {
      this._keysSelected = {};

      for (let key in this._valueDict) {
        let option = this._valueDict[key];
        let optionIsSelected = $(option.el).prop('selected');
        $(option.optionEl)
          .find('input[type="checkbox"]')
          .prop('checked', optionIsSelected);
        if (optionIsSelected) {
          this._activateOption($(this.dropdownOptions), $(option.optionEl));
          this._keysSelected[key] = true;
        } else {
          $(option.optionEl).removeClass('selected');
        }
      }
    }

    /**
     * Make option as selected and scroll to selected position
     * @param {jQuery} collection  Select options jQuery element
     * @param {Element} newOption  element of the new option
     */
    _activateOption(collection, newOption) {
      if (newOption) {
        if (!this.isMultiple) {
          collection.find('li.selected').removeClass('selected');
        }
        let option = $(newOption);
        option.addClass('selected');
      }
    }

    /**
     * Get Selected Values
     * @return {Array}  Array of selected values
     */
    getSelectedValues() {
      let selectedValues = [];
      for (let key in this._keysSelected) {
        selectedValues.push(this._valueDict[key].el.value);
      }
      return selectedValues;
    }
  }

  M.FormSelect = FormSelect;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FormSelect, 'formSelect', 'M_FormSelect');
  }
})(cash);
