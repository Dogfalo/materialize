(function ($) {
  'use strict';

  let _defaults = {
    data: {}, // Autocomplete data set
    limit: Infinity, // Limit of results the autocomplete shows
    onAutocomplete: null, // Callback for when autocompleted
    minLength: 1, // Min characters before autocomplete starts
    sortFunction: function (a, b, inputString) { // Sort function for sorting autocomplete results
      return a.indexOf(inputString) - b.indexOf(inputString);
    }
  };


  /**
   * @class
   *
   */
  class Autocomplete extends Component {
    /**
     * Construct Autocomplete instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Autocomplete, el, options);

      this.el.M_Autocomplete = this;

      /**
       * Options for the autocomplete
       * @member Autocomplete#options
       * @prop {Number} duration
       * @prop {Number} dist
       * @prop {number} shift
       * @prop {number} padding
       * @prop {Boolean} fullWidth
       * @prop {Boolean} indicators
       * @prop {Boolean} noWrap
       * @prop {Function} onCycleTo
       */
      this.options = $.extend({}, Autocomplete.defaults, options);

      // Setup
      this.isOpen = false;
      this.count = 0;
      this.activeIndex = -1;
      this.oldVal;
      this.$inputField = this.$el.closest('.input-field');
      this.$active = $();
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
      return domElem.M_Autocomplete;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this._removeDropdown();
      this.el.M_Autocomplete = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleInputBlurBound = this._handleInputBlur.bind(this);
      this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
      this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
      this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this);

      this.el.addEventListener('blur', this._handleInputBlurBound);
      this.el.addEventListener('keyup', this._handleInputKeyupAndFocusBound);
      this.el.addEventListener('focus', this._handleInputKeyupAndFocusBound);
      this.el.addEventListener('keydown', this._handleInputKeydownBound);
      this.container.addEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);

      if (typeof window.ontouchstart !== 'undefined') {
        this.container.addEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('blur', this._handleInputBlurBound);
      this.el.removeEventListener('keyup', this._handleInputKeyupAndFocusBound);
      this.el.removeEventListener('focus', this._handleInputKeyupAndFocusBound);
      this.el.removeEventListener('keydown', this._handleInputKeydownBound);
      this.container.removeEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);

      if (typeof window.ontouchstart !== 'undefined') {
        this.container.removeEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
      }
    }

    /**
     * Setup dropdown
     */
    _setupDropdown() {
      this.container = document.createElement('ul');
      $(this.container).addClass('autocomplete-content dropdown-content');
      this.$inputField.append(this.container);
    }

    /**
     * Remove dropdown
     */
    _removeDropdown() {
      this.container.parentNode.removeChild(this.container);
    }

    /**
     * Handle Input Blur
     */
    _handleInputBlur() {
      this._removeAutocomplete();
    }

    /**
     * Handle Input Keyup and Focus
     * @param {Event} e
     */
    _handleInputKeyupAndFocus(e) {
      if (e.type === 'keyup') {
        Autocomplete._keydown = false;
      }

      this.count = 0;
      let val = this.el.value.toLowerCase();

      // Don't capture enter or arrow key usage.
      if (e.keyCode === 13 ||
        e.keyCode === 38 ||
        e.keyCode === 40) {
        return;
      }

      // Check if the input isn't empty
      if (this.oldVal !== val) {
        this._removeAutocomplete();

        if (val.length >= this.options.minLength) {
          this.isOpen = true;
          this._renderDropdown(this.options.data, val);
        }
      }

      // Update oldVal
      this.oldVal = val;
    }

    /**
     * Handle Input Keydown
     * @param {Event} e
     */
    _handleInputKeydown(e) {
      Autocomplete._keydown = true;

      // Arrow keys and enter key usage
      let keyCode = e.keyCode,
        liElement,
        numItems = $(this.container).children('li').length;

      // select element on Enter
      if (keyCode === 13 && this.activeIndex >= 0) {
        liElement = $(this.container).children('li').eq(this.activeIndex);
        if (liElement.length) {
          this.selectOption(liElement);
          e.preventDefault();
        }
        return;
      }

      // Capture up and down key
      if (keyCode === 38 || keyCode === 40) {
        e.preventDefault();

        if (keyCode === 38 &&
          this.activeIndex > 0) {
          this.activeIndex--;
        }

        if (keyCode === 40 &&
          this.activeIndex < (numItems - 1)) {
          this.activeIndex++;
        }

        this.$active.removeClass('active');
        if (this.activeIndex >= 0) {
          this.$active = $(this.container).children('li').eq(this.activeIndex);
          this.$active.addClass('active');
        }
      }
    }

    /**
     * Handle Container Mousedown and Touchstart
     * @param {Event} e
     */
    _handleContainerMousedownAndTouchstart(e) {
      let $autocompleteOption = $(e.target).closest('li');
      this.selectOption($autocompleteOption);
    }

    /**
     * Highlight partial match
     */
    _highlight(string, $el) {
      let img = $el.find('img');
      let matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase() + ""),
        matchEnd = matchStart + string.length - 1,
        beforeMatch = $el.text().slice(0, matchStart),
        matchText = $el.text().slice(matchStart, matchEnd + 1),
        afterMatch = $el.text().slice(matchEnd + 1);
      $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
      if (img.length) {
        $el.prepend(img);
      }
    }

    /**
     * Reset current element position
     */
    _resetCurrentElement() {
      this.activeIndex = -1;
      this.$active.removeClass('active');
    }

    /**
     * Remove autocomplete elements
     */
    _removeAutocomplete() {
      $(this.container).empty();
      this._resetCurrentElement();
      this.oldVal = null;
      this.isOpen = false;
    }

    /**
     * Select autocomplete option
     * @param {Element} el  Autocomplete option list item element
     */
    selectOption(el) {
      let text = el.text().trim();
      this.el.value = text;
      this.$el.trigger('change');
      this._removeAutocomplete();

      // Handle onAutocomplete callback.
      if (typeof (this.options.onAutocomplete) === 'function') {
        this.options.onAutocomplete.call(this, text);
      }
    }

    /**
     * Render dropdown content
     * @param {Object} data  data set
     * @param {String} val  current input value
     */
    _renderDropdown(data, val) {
      this._removeAutocomplete();

      let matchingData = [];

      // Gather all matching data
      for (let key in data) {
        if (data.hasOwnProperty(key) &&
          key.toLowerCase().indexOf(val) !== -1) {
          // Break if past limit
          if (this.count >= this.options.limit) {
            break;
          }

          let entry = {
            data: data[key],
            key: key
          };
          matchingData.push(entry);

          this.count++;
        }
      }

      // Sort
      let sortFunctionBound = (a, b) => {
        return this.options.sortFunction(a.key.toLowerCase(), b.key.toLowerCase(), val.toLowerCase());
      };
      matchingData.sort(sortFunctionBound);

      // Render
      for (let i = 0; i < matchingData.length; i++) {
        let entry = matchingData[i];
        let $autocompleteOption = $('<li></li>');
        if (!!entry.data) {
          $autocompleteOption.append('<img src="' + entry.data + '" class="right circle"><span>' + entry.key + '</span>');
        } else {
          $autocompleteOption.append('<span>' + entry.key + '</span>');
        }

        $(this.container).append($autocompleteOption);
        this._highlight(val, $autocompleteOption);
      }
    }

    /**
     * Update Data
     * @param {Object} data
     */
    updateData(data) {
      let val = this.el.value.toLowerCase();
      this.options.data = data;

      if (this.isOpen) {
        this._renderDropdown(data, val);
      }
    }
  }

  /**
   * @static
   * @memberof Autocomplete
   */
  Autocomplete._keydown = false;

  M.Autocomplete = Autocomplete;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Autocomplete, 'autocomplete', 'M_Autocomplete');
  }

}(cash));
