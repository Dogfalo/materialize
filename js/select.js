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

      this.isMultiple = this.$el.prop('multiple');

      // Setup
      this.valuesSelected = [];
      this.$selectedOptions = $();
      this.filterQuery = [];
      this._resetFilterQueryBound = this._resetFilterQuery.bind(this);
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
      this._handleOptionClickBound = this._handleOptionClick.bind(this);
      this._handleInputClickBound = this._handleInputClick.bind(this);
      this._handleInputKeydownBound = this._handleInputKeydown.bind(this);

      $(this.dropdownOptions).find('li:not(.optgroup)').each((el) => {
        el.addEventListener('click', this._handleOptionClickBound);
      });
      this.input.addEventListener('click', this._handleInputClickBound);
      this.input.addEventListener('keydown', this._handleInputKeydownBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      $(this.dropdownOptions).find('li:not(.optgroup)').each((el) => {
        el.removeEventListener('click', this._handleOptionClickBound);
      });
      this.input.removeEventListener('click', this._handleInputClickBound);
      this.input.removeEventListener('focus', this._handleInputFocusBound);
      this.input.removeEventListener('keydown', this._handleInputKeydownBound);
    }

    /**
     * Handle Option Click
     * @param {Event} e
     */
    _handleOptionClick(e) {
      let option = $(e.target).closest('li')[0];
      let optionIndex = $(this.dropdownOptions).find('li:not(.optgroup)').index(option);
      if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup')) {
        let selected = true;

        if (this.isMultiple) {
          let checkbox = $(option).find('input[type="checkbox"]');
          checkbox.prop('checked', !checkbox.prop('checked'));
          selected = this._toggleEntryFromArray(this.valuesSelected, optionIndex);

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
        if (this.isMultiple) {

        } else {
          this._activateOption($(this.dropdownOptions), this.$selectedOptions[0], true);
        }
      }
    }

    /**
     * Handle Input Keydown
     * @param {Event} e
     */
    _handleInputKeydown(e) {
      console.log("KEYDOWN", e);
      // TAB - switch to another input
      if (e.which === 9) {
        this.dropdown.close();
        return;
      }

      // ARROW DOWN WHEN SELECT IS CLOSED - open select options
      if (e.which === 40 && !this.dropdown.isOpen) {
        e.preventDefault();
        $(this.input).trigger('click');
        return;
      }

      // ENTER WHEN SELECT IS CLOSED - open select
      if (e.which === 13 && !this.dropdown.isOpen) {
        this.dropdown.open();
        return;
      }

      e.preventDefault();

      // CASE WHEN USER TYPE LETTERS
      let letter = String.fromCharCode(e.which).toLowerCase(),
          nonLetters = [9,13,27,38,40];
      if (letter && (nonLetters.indexOf(e.which) === -1)) {
        this.filterQuery.push(letter);

        let string = this.filterQuery.join(''),
            newOption = $(this.dropdownOptions).find('li').filter((el) => {
              return $(el).text().toLowerCase().indexOf(string) === 0;
            })[0];

        if (newOption) {
          this._activateOption($(this.dropdownOptions), newOption);
        }
      }

      // ENTER - select option and close when select options are opened
      if (e.which === 13) {
        let activeOption = $(this.dropdownOptions).find('li.selected:not(.disabled)')[0];
        if (activeOption) {
          $(activeOption).trigger('click');
        }
      }

      // ESC - close options
      if (e.which === 27) {
        this.dropdown.close();
      }

      // reset filter query
      this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1000);
    }


    /**
     * Setup dropdown
     */
    _resetFilterQuery() {
      this.filterQuery = [];
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
            this.dropdownOptions.append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]);

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
      let label = this._findSelectedOption().html() || '';
      let sanitizedLabelHtml = label.replace(/"/g, '&quot;'); // escape double quotes
      this.input = document.createElement('input');
      $(this.input).addClass('select-dropdown dropdown-trigger');
      this.input.setAttribute('type', 'text');
      this.input.setAttribute('readonly', 'true');
      this.input.setAttribute('data-target', this.dropdownOptions.id);
      this.input.setAttribute('value', sanitizedLabelHtml);
      if (this.el.disabled) {
        $(this.input).prop('disabled', 'true');
      }

      this.$el.before(this.input);

      // Add caret
      let dropdownIcon = $('<i class="caret material-icons">arrow_drop_down</i>');
      this.$el.before(dropdownIcon[0]);

      // Initialize dropdown
      if (!this.el.disabled) {
        let dropdownOptions = {};
        if (this.isMultiple) {
          dropdownOptions.closeOnClick = false;
        }
        this.dropdown = new Materialize.Dropdown(this.input, dropdownOptions);
      }

      // Add initial multiple selections
      if (this.isMultiple) {
        this.$selectedOptions.not(":disabled").each((el) => {
          let $onlyOptions = $(this.dropdownOptions).find('li:not(.optgroup)');
          let index = $onlyOptions.index(el);

          this._toggleEntryFromArray(this.valuesSelected, index);
          $onlyOptions.eq(index).find('input[type="checkbox"]').prop("checked", true);
        });
      }
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
        let imgEl = $('<img alt="" src="' + iconUrl + '">');
        liEl.prepend(imgEl);
      }

      // Check for multiple type.
      this.dropdownOptions.append(liEl[0]);
      return liEl[0];
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

      $(this.dropdownOptions).find('li:not(.optgroup)').eq(entryIndex).toggleClass('active');

      // use notAdded instead of true (to detect if the option is selected or not)
      this.$el.find('option').eq(entryIndex).prop('selected', notAdded);
      this._setValueToInput(entriesArray);

      return notAdded;
    }

    /**
     * Set value to input
     * @param {Array} entriesArray
     */
    _setValueToInput(entriesArray) {
      let value = '';

      for (let i = 0; i < entriesArray.length; i++) {
        let text = this.$el.find('option').eq(entriesArray[i]).text();

        i === 0 ? value += text : value += ', ' + text;
      }

      if (value === '') {
        value = this.$el.find('option:disabled').eq(0).text();
      }

      this.input.value = value;
    }

    /**
     * Make option as selected and scroll to selected position
     * @param {jQuery} collection  Select options jQuery element
     * @param {Element} newOption  element of the new option
     * @param {Boolean} firstActivation  If on first activation of select
     */
    _activateOption(collection, newOption, firstActivation) {
      if (newOption) {
        collection.find('li.selected').removeClass('selected');
        let option = $(newOption);
        option.addClass('selected');
      }
    }

    /**
     * Find selected option
     * @return {Element}  selected option or first option
     */
    _findSelectedOption() {
      let options = this.$el.find('option');
      let selectedOption = options.filter(function(el) {
        return $(el).prop('selected');
      });


      if (selectedOption.length) {
        return selectedOption;
      } else {
        return options.first();
      }
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
