(function($) {
  'use strict';

  let _defaults = {};

  /**
   * @class
   *
   */
  class CharacterCounter extends Component {
    /**
     * Construct CharacterCounter instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(CharacterCounter, el, options);

      this.el.M_CharacterCounter = this;

      /**
       * Options for the character counter
       */
      this.options = $.extend({}, CharacterCounter.defaults, options);

      this.isInvalid = false;
      this.isValidLength = false;
      this._setupCounter();
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
      return domElem.M_CharacterCounter;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this.el.CharacterCounter = undefined;
      this._removeCounter();
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleUpdateCounterBound = this.updateCounter.bind(this);

      this.el.addEventListener('focus', this._handleUpdateCounterBound, true);
      this.el.addEventListener('input', this._handleUpdateCounterBound, true);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.el.removeEventListener('focus', this._handleUpdateCounterBound, true);
      this.el.removeEventListener('input', this._handleUpdateCounterBound, true);
    }

    /**
     * Setup counter element
     */
    _setupCounter() {
      this.counterEl = document.createElement('span');
      $(this.counterEl)
        .addClass('character-counter')
        .css({
          float: 'right',
          'font-size': '12px',
          height: 1
        });

      this.$el.parent().append(this.counterEl);
    }

    /**
     * Remove counter element
     */
    _removeCounter() {
      $(this.counterEl).remove();
    }

    /**
     * Update counter
     */
    updateCounter() {
      let maxLength = +this.$el.attr('data-length'),
        actualLength = this.el.value.length;
      this.isValidLength = actualLength <= maxLength;
      let counterString = actualLength;

      if (maxLength) {
        counterString += '/' + maxLength;
        this._validateInput();
      }

      $(this.counterEl).html(counterString);
    }

    /**
     * Add validation classes
     */
    _validateInput() {
      if (this.isValidLength && this.isInvalid) {
        this.isInvalid = false;
        this.$el.removeClass('invalid');
      } else if (!this.isValidLength && !this.isInvalid) {
        this.isInvalid = true;
        this.$el.removeClass('valid');
        this.$el.addClass('invalid');
      }
    }
  }

  M.CharacterCounter = CharacterCounter;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(CharacterCounter, 'characterCounter', 'M_CharacterCounter');
  }
})(cash);
