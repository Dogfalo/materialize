(function($) {
  'use strict';

  let _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: null
  };

  /**
   * @class
   *
   */
  class Pushpin extends Component {
    /**
     * Construct Pushpin instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {
      super(Pushpin, el, options);

      this.el.M_Pushpin = this;

      /**
       * Options for the modal
       * @member Pushpin#options
       */
      this.options = $.extend({}, Pushpin.defaults, options);

      this.originalOffset = this.el.offsetTop;
      Pushpin._pushpins.push(this);
      this._setupEventHandlers();
      this._updatePosition();
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
      return domElem.M_Pushpin;
    }

    /**
     * Teardown component
     */
    destroy() {
      this.el.style.top = null;
      this._removePinClasses();
      this._removeEventHandlers();

      // Remove pushpin Inst
      let index = Pushpin._pushpins.indexOf(this);
      Pushpin._pushpins.splice(index, 1);
    }

    static _updateElements() {
      for (let elIndex in Pushpin._pushpins) {
        let pInstance = Pushpin._pushpins[elIndex];
        pInstance._updatePosition();
      }
    }

    _setupEventHandlers() {
      document.addEventListener('scroll', Pushpin._updateElements);
    }

    _removeEventHandlers() {
      document.removeEventListener('scroll', Pushpin._updateElements);
    }

    _updatePosition() {
      let scrolled = M.getDocumentScrollTop() + this.options.offset;

      if (
        this.options.top <= scrolled &&
        this.options.bottom >= scrolled &&
        !this.el.classList.contains('pinned')
      ) {
        this._removePinClasses();
        this.el.style.top = `${this.options.offset}px`;
        this.el.classList.add('pinned');

        // onPositionChange callback
        if (typeof this.options.onPositionChange === 'function') {
          this.options.onPositionChange.call(this, 'pinned');
        }
      }

      // Add pin-top (when scrolled position is above top)
      if (scrolled < this.options.top && !this.el.classList.contains('pin-top')) {
        this._removePinClasses();
        this.el.style.top = 0;
        this.el.classList.add('pin-top');

        // onPositionChange callback
        if (typeof this.options.onPositionChange === 'function') {
          this.options.onPositionChange.call(this, 'pin-top');
        }
      }

      // Add pin-bottom (when scrolled position is below bottom)
      if (scrolled > this.options.bottom && !this.el.classList.contains('pin-bottom')) {
        this._removePinClasses();
        this.el.classList.add('pin-bottom');
        this.el.style.top = `${this.options.bottom - this.originalOffset}px`;

        // onPositionChange callback
        if (typeof this.options.onPositionChange === 'function') {
          this.options.onPositionChange.call(this, 'pin-bottom');
        }
      }
    }

    _removePinClasses() {
      // IE 11 bug (can't remove multiple classes in one line)
      this.el.classList.remove('pin-top');
      this.el.classList.remove('pinned');
      this.el.classList.remove('pin-bottom');
    }
  }

  /**
   * @static
   * @memberof Pushpin
   */
  Pushpin._pushpins = [];

  M.Pushpin = Pushpin;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, 'pushpin', 'M_Pushpin');
  }
})(cash);
