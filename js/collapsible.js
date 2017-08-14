(function ($, Vel) {
  'use strict';

  let _defaults = {
    accordion: true,
    onOpenStart: undefined,
    onOpenEnd: undefined,
    onCloseStart: undefined,
    onCloseEnd: undefined,
    inDuration: 300,
    outDuration: 300
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
       * @prop {Function} onOpenStart - Callback function called before collapsible is opened
       * @prop {Function} onOpenEnd - Callback function called after collapsible is opened
       * @prop {Function} onCloseStart - Callback function called before collapsible is closed
       * @prop {Function} onCloseEnd - Callback function called after collapsible is closed
       */
      this.options = $.extend({}, Collapsible.defaults, options);

      this.$el[0].M_Collapsible = this;
      this._setupEventHandlers();

      // Open first active
      let $activeBodies = this.$el.children('li.active').children('.collapsible-body');
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
        let $body = $collapsibleLi.children('.collapsible-body');
        Vel($body[0], 'stop');
        Vel(
          $body[0],
          'slideDown',
          {duration: this.options.inDuration, easing: 'easeInOutCubic', queue: false,
          complete: () => {
            $body[0].style.height = null;
            $body[0].style.overflow = null;
            $body[0].style.padding = null;
            $body[0].style.margin = null;

            // onOpenEnd callback
            if (typeof(this.options.onOpenEnd) === 'function') {
              this.options.onOpenEnd.call(this, $collapsibleLi[0]);
            }
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
        let $body = $collapsibleLi.children('.collapsible-body');
        Vel($body[0], 'stop');
        Vel(
          $body[0],
          'slideUp',
          {duration: this.options.outDuration, easing: 'easeInOutCubic', queue: false,
          complete: () => {
            $body[0].style.height = null;
            $body[0].style.overflow = null;
            $body[0].style.padding = null;
            $body[0].style.margin = null;

            // onCloseEnd callback
            if (typeof(this.options.onCloseEnd) === 'function') {
              this.options.onCloseEnd.call(this, $collapsibleLi[0]);
            }
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

        // onOpenStart callback
        if (typeof(this.options.onOpenStart) === 'function') {
          this.options.onOpenStart.call(this, $collapsibleLi[0]);
        }

        // Handle accordion behavior
        if (this.options.accordion) {
          let $collapsibleLis = this.$el.children('li');
          let $activeLis = this.$el.children('li.active');
          $activeLis.each((el) => {
            let index = $collapsibleLis.index($(el));
            this.close(index)
          });
        }

        // Animate in
        let $header = $collapsibleLi.children('.collapsible-header');
        $collapsibleLi[0].classList.add('active');
        this._animateIn(index);
      }
    }

    /**
     * Close Collapsible
     * @param {Number} index - 0th index of slide
     */
    close(index) {
      let $collapsibleLi = this.$el.children('li').eq(index);
      if ($collapsibleLi.length && $collapsibleLi[0].classList.contains('active')) {

        // onCloseStart callback
        if (typeof(this.options.onCloseStart) === 'function') {
          this.options.onCloseStart.call(this, $collapsibleLi[0]);
        }

        // Animate out
        let $header = $collapsibleLi.children('.collapsible-header');
        $collapsibleLi[0].classList.remove('active');
        this._animateOut(index);
      }
    }

  }

  window.Materialize.Collapsible = Collapsible;

  jQuery.fn.collapsible = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Collapsible.prototype[methodOrOptions]) {
      let params = Array.prototype.slice.call( arguments, 1 );

      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        let instance = this.first()[0].M_Collapsible;
        return instance[methodOrOptions].apply(instance, params);

      // Void methods
      } else {
        return this.each(function() {
          let instance = this.M_Collapsible;
          instance[methodOrOptions].apply(instance, params);
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Collapsible.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.collapsible`);
    }
  };

}( cash, Materialize.Vel ));
