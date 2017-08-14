(function($) {
  'use strict';

  let _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0
  };


  /**
   * @class
   *
   */
  class Pushpin {
    /**
     * Construct Pushpin instance
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    constructor($el, options) {

      // If exists, destroy and reinitialize
      if (!!$el[0].M_Pushpin) {
        $el[0].M_Pushpin.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      this.el = $el[0];
      this.el.M_Pushpin = this;

      /**
       * Options for the modal
       * @member Pushpin#options
       */
      this.options = $.extend({}, Pushpin.defaults, options);

      this.originalOffset = this.el.offsetTop;
      Pushpin._instanceList.push(this);
      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Pushpin($(this), options));
      });
      return arr;
    }

    static _updateElements() {
      for (let elIndex in Pushpin._instanceList) {
        let pInstance = Pushpin._instanceList[elIndex];
        pInstance._updatePosition();
      }
    }

    /**
     * Get Instance
     */
    getInstance() {
      return this;
    }

    _setupEventHandlers() {
      document.addEventListener('scroll', Pushpin._updateElements);
    }

    _removeEventHandlers() {
      document.removeEventListener('scroll', Pushpin._updateElements);
    }

    _updatePosition() {
      let scrolled = document.body.scrollTop + this.options.offset;

      if (this.options.top <= scrolled && this.options.bottom >= scrolled &&
          !this.el.classList.contains('pinned')) {
        this._removePinClasses();

        this.el.style.top = `${this.options.offset}px`;
        this.el.classList.add('pinned');
      }

      // Add pin-top (when scrolled position is above top)
      if (scrolled < this.options.top && !this.el.classList.contains('pin-top')) {
        this._removePinClasses();
        this.el.style.top = 0;
        this.el.classList.add('pin-top');
      }

      // Add pin-bottom (when scrolled position is below bottom)
      if (scrolled > this.options.bottom && !this.el.classList.contains('pin-bottom')) {
        this._removePinClasses();
        this.el.classList.add('pin-bottom');
        this.el.style.top = `${this.options.bottom - this.originalOffset}px`;
      }
    }

    _removePinClasses() {
      this.el.classList.remove('pin-top', 'pinned', 'pin-bottom');
    }


    /**
     * Teardown component
     */
    destroy() {
      this.el.style.top = null;
      this._removePinClasses();

      this._removeEventHandlers();

      // Remove pushpin Inst
      let index = Pushpin._instanceList.indexOf(this);
      Pushpin._instanceList.splice(index, 1);

    }
  }

  /**
   * @static
   * @memberof Pushpin
   */
  Pushpin._instanceList = [];

  window.Materialize.Pushpin = Pushpin;

  jQuery.fn.pushpin = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Pushpin.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Pushpin[methodOrOptions]();

      // Void methods
      } else {
        return this.each(function() {
          this.M_Pushpin[methodOrOptions]();
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Pushpin.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.modal`);
    }
  };

})(cash);
