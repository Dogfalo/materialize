(function($, Vel) {
  'use strict';

  let _defaults = {
    alignment: 'left',
    constrainWidth: true,
    coverTrigger: true,
    inDuration: 200,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
  };


  /**
   * @class
   */
  class Dropdown {
    constructor(el, options) {

      // If exists, destroy and reinitialize
      if (!!el.M_Dropdown) {
        el.M_Dropdown.destroy();
      }

      this.el = el;
      this.el.M_Dropdown = this;
      this.$el = $(el);
      this.id = Materialize.getIdFromTrigger(el);
      this.dropdownEl = document.getElementById(this.id);


      /**
       * Options for the dropdown
       * @member Dropdown#options
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      this.options = $.extend({}, Dropdown.defaults, options);

      /**
       * Describes open/close state of dropdown
       * @type {Boolean}
       */
      this.isOpen = false;


      // Move dropdown-content after dropdown-trigger
      this.$el.after(this.dropdownEl);


      this._setupEventHandlers();
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Dropdown(this, options));
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

    }

    /**
     * Setup Event Handlers
     */
    _setupEventHandlers() {
      this._handleClickBound = this._handleClick.bind(this);
      this.el.addEventListener('click', this._handleClickBound);
    }

    /**
     * Remove Event Handlers
     */
    removeEventHandlers() {
      this.el.removeEventListener('click', this._handleClickBound);
    }

    _handleClick(e) {
      e.preventDefault();
      this.open();
    }


    /**
     * Animate in dropdown
     */
    _animateIn(positionInfo) {
      console.log(positionInfo);
      this.dropdownEl.style.left = positionInfo.x + 'px';
      this.dropdownEl.style.top = positionInfo.y + 'px';
      this.dropdownEl.style.width = positionInfo.width + 'px';

      console.log( '0 ' + positionInfo.direction === 'down' ? '0' : '100%');
      this.dropdownEl.style.transformOrigin = `0 ${positionInfo.direction === 'down' ? '0' : '100%'}`;


      Vel.hook(this.dropdownEl, 'visibility', 'visible');
      Vel(this.dropdownEl,
          {
            opacity: [1, 'linear'],
            scaleX: [1, .8],
            scaleY: [1, .8]},
          {duration: this.options.inDuration, queue: false, easing: 'easeOutCubic'});
    }

    /**
     * Animate out dropdown
     */
    _animateOut() {

    }


    /**
     * Open Dropdown
     */
    open() {
      if (this.isOpen) {
        return;
      }

      this.isOpen = true;
      let positionInfo = this._getDropdownPosition();
      this._animateIn(positionInfo);
    }

    _getDropdownPosition() {
      let triggerWidth = this.el.getBoundingClientRect().width;

      let idealWidth = this.options.constrainWidth ?
          triggerWidth : this.dropdownEl.getBoundingClientRect().width;
      let idealHeight = this.dropdownEl.offsetHeight;
      let idealXPos = this.options.alignment === 'left' ?
          this.el.offsetLeft : this.offsetLeft + (triggerWidth - idealWidth);
      let idealYPos = this.options.coverTrigger ?
          this.el.offsetTop : this.el.offsetTop + this.el.offsetHeight;
      let idealDirection = 'down';

      let dropdownBounds = {left: idealXPos, top: idealYPos, width: idealWidth, height: idealHeight};

      // Countainer here will be closest ancestor with overflow: hidden
      let edges = Materialize.checkWithinContainer(document.body, dropdownBounds, 0);

      if (edges.bottom) {
        idealDirection = 'up';
        idealYPos = this.el.offsetTop - this.dropdownEl.offsetHeight +
          (this.options.coverTrigger ? this.el.offsetHeight : 0);
      }

      console.log(edges);


      return {x: idealXPos, y: idealYPos, direction: idealDirection, width: idealWidth};

    }

    /**
     * Close Dropdown
     */
    close() {


    }
  }

  /**
   * @static
   * @memberof Dropdown
   */
  Dropdown._dropdowns = [];

  window.Materialize.Dropdown = Dropdown;

  jQuery.fn.dropdown = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (Dropdown.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_Dropdown[methodOrOptions]();

      // Void methods
      } else {
        return this.each(function() {
          this.M_Dropdown[methodOrOptions]();
        });
      }

    // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      Dropdown.init(this, arguments[0]);
      return this;

    // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.dropdown`);
    }
  };

})(cash, Materialize.Vel);
