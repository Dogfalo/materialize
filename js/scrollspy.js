(function($, anim) {
  'use strict';

  let _defaults = {
    throttle: 100,
    scrollOffset: 200, // offset - 200 allows elements near bottom of page to scroll
    activeClass: 'active',
    getActiveElement: function(id) {
      return 'a[href="#' + id + '"]';
    }
  };

  /**
   * @class
   *
   */
  class ScrollSpy {
    /**
     * Construct ScrollSpy instance
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_ScrollSpy) {
        el.M_ScrollSpy.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_ScrollSpy = this;

      /**
       * Options for the modal
       * @member Modal#options
       * @prop {Number} [throttle=100] - Throttle of scroll handler
       * @prop {Number} [scrollOffset=200] - Offset for centering element when scrolled to
       * @prop {String} [activeClass='active'] - Class applied to active elements
       * @prop {Function} [getActiveElement] - Used to find active element
       */
      this.options = $.extend({}, ScrollSpy.defaults, options);


      // setup
      ScrollSpy._elements.push(this);
      ScrollSpy._count++;
      ScrollSpy._increment++;
      this.tickId = -1;
      this.id = ScrollSpy._increment;
      this._setupEventHandlers();
      this._handleWindowScroll();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new ScrollSpy(this, options));
      });
      return arr;
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_ScrollSpy;
    }

    /**
     * Teardown component
     */
    destroy() {
      ScrollSpy._elements.splice(ScrollSpy._elements.indexOf(this), 1);
      ScrollSpy._elementsInView.splice(ScrollSpy._elementsInView.indexOf(this), 1);
      ScrollSpy._visibleElements.splice(ScrollSpy._visibleElements.indexOf(this.$el), 1);
      ScrollSpy._count--;
      this._removeEventHandlers();
      $(this.options.getActiveElement(this.$el.attr('id'))).removeClass(this.options.activeClass);
      this.el.M_ScrollSpy = undefined;
    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      let throttledResize = M.throttle(this._handleWindowScroll, 200);
      this._handleThrottledResizeBound = throttledResize.bind(this);
      this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
      if (ScrollSpy._count === 1) {
        window.addEventListener('scroll', this._handleWindowScrollBound);
        window.addEventListener('resize', this._handleThrottledResizeBound);
        document.body.addEventListener('click', this._handleTriggerClick);
      }
    }

    /**
     * Remove Event Handlers
     */
    _removeEventHandlers() {
      if (ScrollSpy._count === 0) {
        window.removeEventListener('scroll', this._handleWindowScrollBound);
        window.removeEventListener('resize', this._handleThrottledResizeBound);
        document.body.removeEventListener('click', this._handleTriggerClick);
      }
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    _handleTriggerClick(e) {
      let $trigger = $(e.target);
      for (let i = ScrollSpy._elements.length - 1; i >= 0; i--) {
        let scrollspy = ScrollSpy._elements[i];
        if ($trigger.is('a[href="#' + scrollspy.$el.attr('id') + '"]')) {
          e.preventDefault();
          let offset = scrollspy.$el.offset().top + 1;

          anim({
            targets: [document.documentElement, document.body],
            scrollTop: offset - scrollspy.options.scrollOffset,
            duration: 400,
            easing: 'easeOutCubic'
          });
          break;
        }
      }
    }

    /**
     * Handle Window Scroll
     */
    _handleWindowScroll() {
      // unique tick id
      ScrollSpy._ticks++;

      // viewport rectangle
      let top = M.getDocumentScrollTop(),
          left = M.getDocumentScrollLeft(),
          right = left + window.innerWidth,
          bottom = top + window.innerHeight;

      // determine which elements are in view
      let intersections = ScrollSpy._findElements(top, right, bottom, left);
      for (let i = 0; i < intersections.length; i++) {
        let scrollspy = intersections[i];
        let lastTick = scrollspy.tickId;
        if (lastTick < 0) {
          // entered into view
          scrollspy._enter();
        }

        // update tick id
        scrollspy.tickId = ScrollSpy._ticks;
      }

      for (let i = 0; i < ScrollSpy._elementsInView.length; i++) {
        let scrollspy = ScrollSpy._elementsInView[i];
        let lastTick = scrollspy.tickId;
        if (lastTick >= 0 && lastTick !== ScrollSpy._ticks) {
          // exited from view
          scrollspy._exit();
          scrollspy.tickId = -1;
        }
      }

      // remember elements in view for next tick
      ScrollSpy._elementsInView = intersections;
    }

    /**
     * Find elements that are within the boundary
     * @param {number} top
     * @param {number} right
     * @param {number} bottom
     * @param {number} left
     * @return {Array.<ScrollSpy>}   A collection of elements
     */
    static _findElements(top, right, bottom, left) {
      let hits = [];
      for (let i = 0; i < ScrollSpy._elements.length; i++) {
        let scrollspy = ScrollSpy._elements[i];
        let currTop = top + scrollspy.options.scrollOffset || 200;

        if (scrollspy.$el.height() > 0) {
          let elTop = scrollspy.$el.offset().top,
            elLeft = scrollspy.$el.offset().left,
            elRight = elLeft + scrollspy.$el.width(),
            elBottom = elTop + scrollspy.$el.height();

          let isIntersect = !(elLeft > right ||
            elRight < left ||
            elTop > bottom ||
            elBottom < currTop);

          if (isIntersect) {
            hits.push(scrollspy);
          }
        }
      }
      return hits;
    }

    _enter() {
      ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function(value) {
        return value.height() != 0;
      });

      if (ScrollSpy._visibleElements[0]) {
        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);
        if (ScrollSpy._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy._visibleElements[0][0].M_ScrollSpy.id) {
          ScrollSpy._visibleElements.unshift(this.$el);
        }
        else {
          ScrollSpy._visibleElements.push(this.$el);
        }
      }
      else {
        ScrollSpy._visibleElements.push(this.$el);
      }

      $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
    }

    _exit() {
      ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function(value) {
        return value.height() != 0;
      });

      if (ScrollSpy._visibleElements[0]) {
        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);

        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter((el) => {
          return el.attr('id') != this.$el.attr('id');
        });
        if (ScrollSpy._visibleElements[0]) { // Check if empty
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
        }
      }
    }
  }

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */
  ScrollSpy._elements = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<ScrollSpy>}
   */
  ScrollSpy._elementsInView = [];

  /**
   * @static
   * @memberof ScrollSpy
   * @type {Array.<cash>}
   */
  ScrollSpy._visibleElements = [];

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._count = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._increment = 0;

  /**
   * @static
   * @memberof ScrollSpy
   */
  ScrollSpy._ticks = 0;


  M.ScrollSpy = ScrollSpy;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, 'scrollSpy', 'M_ScrollSpy');
  }

})(cash, anime);
