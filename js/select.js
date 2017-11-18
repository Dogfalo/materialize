(function ($) {
  'use strict';

  let _defaults = {
    classes: ''
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

      this.isMultiple = this.$el.prop('multiple');

      // Setup
      this.valuesSelected = [];
      this.$selectedOptions = $();
      this._setupDropdown();

      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        if (!$(this).hasClass('browser-default')) {
          arr.push(new Select(this, options));
        }
      });
      return arr;
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Select;
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
      this._handleSelectChangeBound = this._handleSelectChange.bind(this);
      this._handleOptionClickBound = this._handleOptionClick.bind(this);
      this._handleInputClickBound = this._handleInputClick.bind(this);

      $(this.dropdownOptions).find('li:not(.optgroup)').each((el) => {
        el.addEventListener('click', this._handleOptionClickBound);
      });
      this.el.addEventListener('change', this._handleSelectChangeBound);
      this.input.addEventListener('click', this._handleInputClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      $(this.dropdownOptions).find('li:not(.optgroup)').each((el) => {
        el.removeEventListener('click', this._handleOptionClickBound);
      });
      this.el.removeEventListener('change', this._handleSelectChangeBound);
      this.input.removeEventListener('click', this._handleInputClickBound);
      this.input.removeEventListener('focus', this._handleInputFocusBound);
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
      let option = $(e.target).closest('li')[0];
      let optionIndex = $(this.dropdownOptions).find('li:not(.optgroup)').index(option);
      if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup')) {
        let selected = true;

        if (this.isMultiple) {
          let checkbox = $(option).find('input[type="checkbox"]');
          checkbox.prop('checked', !checkbox.prop('checked'));
          selected = this._toggleEntryFromArray(optionIndex);

        } else {
          $(this.dropdownOptions).find('li').removeClass('active');
          $(option).toggleClass('active');
          this.input.value = option.textContent;
        }

        this._activateOption($(this.dropdownOptions), option);
        this.$el.find('option').eq(optionIndex).prop('selected', selected);
        this.$el.trigger('change');
      }

      e.stopPropagation();
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
     * Setup dropdown
     */
    _setupDropdown() {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add();
      $(this.wrapper).addClass('select-wrapper' + ' ' + this.options.classes);
      this.$el.before($(this.wrapper));
      this.wrapper.appendChild(this.el);

      if (this.el.disabled) {
        this.wrapper.classList.add('disabled');
      }

      // Create dropdown
      this.$selectOptions = this.$el.children('option, optgroup');
      this.dropdownOptions = document.createElement('ul');
      this.dropdownOptions.id = `select-options-${M.guid()}`;
      $(this.dropdownOptions).addClass('dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : ''));

      // Create dropdown structure.
      if (this.$selectOptions.length) {
        this.$selectOptions.each((el) => {
          if ($(el).is('option')) {
            // Direct descendant option.
            let optionEl;
            if (this.isMultiple) {
              optionEl = this._appendOptionWithIcon(this.$el, el, 'multiple');

            } else {
              optionEl = this._appendOptionWithIcon(this.$el, el);
            }

            if ($(el).prop('selected')) {
              this.$selectedOptions.add(optionEl);
            }

          } else if ($(el).is('optgroup')) {
            // Optgroup.
            let selectOptions = $(el).children('option');
            $(this.dropdownOptions).append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]);

            selectOptions.each((el) => {
              let optionEl = this._appendOptionWithIcon(this.$el, el, 'optgroup-option');
              if ($(el).prop('selected')) {
                this.$selectedOptions.add(optionEl);
              }
            });
          }
        });
      }

      this.$el.after(this.dropdownOptions);

      // Add input dropdown
      this.input = document.createElement('input');
      $(this.input).addClass('select-dropdown dropdown-trigger');
      this.input.setAttribute('type', 'text');
      this.input.setAttribute('readonly', 'true');
      this.input.setAttribute('data-target', this.dropdownOptions.id);
      if (this.el.disabled) {
        $(this.input).prop('disabled', 'true');
      }

      this.$el.before(this.input);
      this._setValueToInput();

      // Add caret
      let dropdownIcon = $('<svg class="caret" fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
      this.$el.before(dropdownIcon[0]);

      // Initialize dropdown
      if (!this.el.disabled) {
        let dropdownOptions = {};
        if (this.isMultiple) {
          dropdownOptions.closeOnClick = false;
        }
        this.dropdown = new M.Dropdown(this.input, dropdownOptions);
      }

      // Add initial selections
      this._setSelectedStates();
    }

    /**
     * Remove dropdown
     */
    _removeDropdown() {
      $(this.wrapper).find('.caret').remove();
      $(this.input).remove();
      $(this.dropdownOptions).remove();
      $(this.wrapper).before(this.$el);
      $(this.wrapper).remove();
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
      let disabledClass = (option.disabled) ? 'disabled ' : '';
      let optgroupClass = (type === 'optgroup-option') ? 'optgroup-option ' : '';
      let multipleCheckbox = this.isMultiple ? `<label><input type="checkbox"${disabledClass}"/><span>${option.innerHTML}</span></label>` : option.innerHTML;
      let liEl = $('<li></li>');
      let spanEl = $('<span></span>');
      spanEl.html(multipleCheckbox);
      liEl.addClass(`${disabledClass} ${optgroupClass}`);
      liEl.append(spanEl);

      // add icons
      let iconUrl = option.getAttribute('data-icon');
      let classes = option.getAttribute('class');
      if (!!iconUrl) {
        let imgEl = $('<img alt="" src="' + iconUrl + '">');
        liEl.prepend(imgEl);
      }

      // Check for multiple type.
      $(this.dropdownOptions).append(liEl[0]);
      return liEl[0];
    }

    /**
     * Toggle entry from option
     * @param {Number} entryIndex
     * @return {Boolean}  if entry was added or removed
     */
    _toggleEntryFromArray(entryIndex) {
      let index = this.valuesSelected.indexOf(entryIndex),
          notAdded = index === -1;

      if (notAdded) {
        this.valuesSelected.push(entryIndex);
      } else {
        this.valuesSelected.splice(index, 1);
      }

      $(this.dropdownOptions).find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

      // use notAdded instead of true (to detect if the option is selected or not)
      this.$el.find('option').eq(entryIndex).prop('selected', notAdded);

      return notAdded;
    }

    /**
     * Set value to input
     */
    _setValueToInput() {
      let value = '';
      let options = this.$el.find('option');

      options.each((el, i) => {
        if ($(el).prop('selected')) {
          let text = $(el).text();
          value === '' ? value += text : value += ', ' + text;
        }
      });

      if (value === '') {
        let firstDisabled = this.$el.find('option:disabled').eq(0);
        if (firstDisabled.length) {
          value = firstDisabled.text();
        }
      }

      this.input.value = value;
    }

    /**
     * Set selected state of dropdown too match actual select element
     */
    _setSelectedStates() {
      this.valuesSelected = [];
      let $onlyOptions = $(this.dropdownOptions).find('li:not(.optgroup)');
      this.$el.find('option').each((el, i) => {
        let option = $onlyOptions.eq(i);

        if ($(el).prop('selected')) {
          option.find('input[type="checkbox"]').prop("checked", true);
          this._activateOption($(this.dropdownOptions), option);
          this.valuesSelected.push(i);

        } else {
          option.find('input[type="checkbox"]').prop("checked", false);
          option.removeClass('selected');
        }
      });
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
  }

  M.Select = Select;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Select, 'select', 'M_Select');
  }
}( cash ));
