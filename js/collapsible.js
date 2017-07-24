(function ($) {
  'use strict';

  let _defaults = {
    accordion: true,
    onOpen: undefined,
    onClose: undefined
  };


  /**
   * @class
   *
   */
  class Collapsible {
    /**
     * Construct Collapsible instance
     * @constructor
     * @param {jQuery} $el
     * @param {Object} options
     */
    constructor($el, options) {

      // If exists, destroy and reinitialize
      if (!!$el[0].M_Collapsible) {
        $el[0].M_Collapsible.destroy();
      }

      /**
       * The jQuery element
       * @type {jQuery}
       */
      this.$el = $el;

      /**
       * Options for the collapsible
       * @member Collapsible#options
       * @prop {Boolean} [accordion=false] - Type of the collapsible
       * @prop {Function} onOpen - Callback function called when collapsible is opened
       * @prop {Function} onClose - Callback function called when collapsible is closed
       */
      this.options = $.extend({}, Collapsible.defaults, options);

      this.$el[0].M_Collapsible = this;
      this._setupEventHandlers();

      // Open first active
      let $activeBodies = this.$el.find('> li.active .collapsible-body');
      if (this.options.accordion) { // Handle Accordion
        $activeBodies.first().css('display', 'block');

      } else { // Handle Expandables
        $activeBodies.css('display', 'block');
      }
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Collapsible($(this), options));
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
      this.$el[0].M_Collapsible = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
      this.$el[0].addEventListener('click', this._handleCollapsibleClickBound);
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      this.$el[0].removeEventListener('click', this._handleCollapsibleClickBound);
    }

    /**
     * Handle Collapsible Click
     * @param {Event} e
     */
    _handleCollapsibleClick(e) {
      let $header = $(e.target).closest('.collapsible-header');
      if (e.target && $header.length) {
        let $collapsible = $header.closest('.collapsible');
        if ($collapsible[0] === this.$el[0]) {
          let $collapsibleLi = $header.closest('li');
          let $collapsibleLis = $collapsible.children('li');
          let isActive = $collapsibleLi[0].classList.contains('active');
          let index = $collapsibleLis.index($collapsibleLi);

          if (isActive) {
            this.close(index);
          } else {
            this.open(index);
          }
        }
      }
    }

    /**
     * Animate in collapsible slide
     * @param {Number} index - 0th index of slide
     */
    _animateIn(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length) {
        let $body = $collapsibleLi.find('> .collapsible-body');
        Vel($body[0], 'stop');
        Vel(
          $body[0],
          'slideDown',
          {duration: 350, easing: 'easeOutQuart', queue: false,
          complete: () => {
            $body[0].style.height = null;
            $body[0].style.overflow = null;
            $body[0].style.padding = null;
            $body[0].style.margin = null;
          }}
        );
      }
    }

    /**
     * Animate out collapsible slide
     * @param {Number} index - 0th index of slide to open
     */
    _animateOut(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length) {
        let $body = $collapsibleLi.find('> .collapsible-body');
        Vel($body[0], 'stop');
        Vel(
          $body[0],
          'slideUp',
          {duration: 350, easing: 'easeOutQuart', queue: false,
          complete: () => {
            $body[0].style.height = null;
            $body[0].style.overflow = null;
            $body[0].style.padding = null;
            $body[0].style.margin = null;
          }}
        );
      }
    }

    /**
     * Open Collapsible
     * @param {Number} index - 0th index of slide
     */
    open(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains('active')) {
        // Handle accordion behavior
        if (this.options.accordion) {
          let $collapsibleLis = this.$el.children('li');
          let $activeLis = this.$el.find(' > li.active');
          $activeLis.each((i, el) => {
            let index = $collapsibleLis.index($(el));
            this.close(index)
          });
        }

        let $header = $collapsibleLi.find('> .collapsible-header');
        $collapsibleLi[0].classList.add('active');
        this._animateIn(index);

        // onOpen callback
        if (typeof(this.options.onOpen) === 'function') {
          this.options.onOpen.call(this, $collapsibleLi[0]);
        }
      }
    }

    /**
     * Close Collapsible
     * @param {Number} index - 0th index of slide
     */
    close(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && $collapsibleLi[0].classList.contains('active')) {
        let $header = $collapsibleLi.find('> .collapsible-header');
        $collapsibleLi[0].classList.remove('active');
        this._animateOut(index);

        // onClose callback
        if (typeof(this.options.onClose) === 'function') {
          this.options.onClose.call(this, $collapsibleLi[0]);
        }
      }
    }

  }

  window.Materialize.Collapsible = Collapsible;

  $.fn.collapsible = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Collapsible.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Collapsible[methodOrOptions](params);

      // Void methods
      } else {
        return this.each(function() {
          this.M_Collapsible[methodOrOptions](params);
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Collapsible.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      $.error(`Method ${methodOrOptions} does not exist on jQuery.collapsible`);
    }
  };

}( jQuery ));