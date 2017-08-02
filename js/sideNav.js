(function($, Vel) {
  'use strict';

  let _defaults = {
    edge: 'left',
    closeOnClick: false,
    draggable: true,
    inDuration: 300,
    outDuration: 200,
    onOpen: null,
    onClose: null
  };


  /**
   * @class
   */
  class SideNav {

    constructor ($el, options) {

      // If exists, destroy and reinitialize
      if (!!$el[0].M_SideNav) {
        $el[0].M_SideNav.destroy();
      }

      this.$el = $el;
      this.el = $el[0];
      this.id = $el.attr('id');

      /**
       * Options for the SideNav
       * @member SideNav#options
       */
      this.options = $.extend({}, SideNav.defaults, options);

      /**
       * Describes open/close state of SideNav
       * @type {Boolean}
       */
      this.isOpen = false;

      this.$el[0].M_SideNav = this;

      this._createOverlay();
      this._createDragTarget();
      this._setupEventHandlers();

      SideNav._sideNavs.push(this);
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new SideNav($(this), options));
      });
      return arr;
    }

    _createOverlay() {
      let overlay = document.createElement('div');
      this._closeBound = this.close.bind(this);
      overlay.classList.add('sidenav-overlay');

      console.log(this._closeBound);
      overlay.addEventListener('click', this._closeBound);

      document.body.appendChild(overlay);
      this._overlay = overlay;
    }

    /**
     * Get Instance
     */
    getInstance() {
      return this;
    }

    _setupEventHandlers() {

      if (SideNav._sideNavs.length === 0) {
        document.body.addEventListener('click', this._handleTriggerClick);
      }
    }

    _removeEventHandlers() {
      if (SideNav._sideNavs.length === 1) {
        document.body.removeEventListener('click', this._handleTriggerClick);
      }
    }

    /**
     * Handle Trigger Click
     * @param {Event} e
     */
    _handleTriggerClick(e) {
      let $trigger =  $(e.target).closest('.sidenav-trigger');
      if (e.target && $trigger.length) {
        let sideNavId = $trigger[0].getAttribute('href');
        if (sideNavId) {
          sideNavId = sideNavId.slice(1);
        } else {
          sideNavId = $trigger[0].getAttribute('data-target');
        }

        let sideNavInstance = document.getElementById(sideNavId).M_SideNav;
        if (sideNavInstance) {
          sideNavInstance.open($trigger);
        }
        e.preventDefault();
      }
    }

    _setupClasses() {
      if (this.options.edge === 'right') {
        this.el.classList.add('right-aligned');
        this.dragTarget.classList.add('right-aligned');
      }
    }

    _removeClasses() {
      this.el.classList.remove('right-aligned');
      this.dragTarget.classList.remove('right-aligned');
    }

    _createDragTarget() {
      let dragTarget = document.createElement('div');
      dragTarget.classList.add('drag-target');
      document.body.appendChild(dragTarget);
      this.dragTarget = dragTarget;
    }

    _preventBodyScrolling() {
      let body = document.body;
      body.style.overflow = 'hidden';
    }

    _enableBodyScrolling() {
      let body = document.body;
      body.style.overflow = null;
    }

    open() {
      if (this.isOpen === true) {
        return;
      }

      this.isOpen = true;
      this._preventBodyScrolling();
      this._animateIn();

    }

    _animateIn() {
      this._animateSideNavIn();
      this._animateOverlayIn();
    }

    _animateSideNavIn() {
      let slideOutPercent = `${this.options.edge === 'left' ? -100 : 100}%`;

      Vel(this.el,
        {'translateX': [0, slideOutPercent]},
        {duration: this.options.inDuration, queue: false, easing: 'easeOutQuad'});
    }

    _animateOverlayIn(opacity) {
      console.log(this._overlay);
      Vel(this._overlay,
          'fadeIn',
          {duration: this.options.inDuration});
      // Vel(this.overlay,
      //     {opacity: 1},
      //     {duration: this.options.inDuration, easing: 'easeOutQuad', queue: false};
    }

    _animateOverlayOut(opacity) {
      // Vel(this.overlay,
      //     {opacity: 0},
      //     {duration: this.options.inDuration, easing: 'easeOutQuad', queue: false,
      //      complete: function() {

      //      }};
      Vel(this._overlay,
          'fadeOut',
          {duration: this.options.outDuration});
    }

    close() {
      if (this.isOpen === false) {
        return;
      }

      this.isOpen = false;
      this._enableBodyScrolling();
      this._animateOut();
    }

    _animateOut() {
      this._animateSideNavOut();
      this._animateOverlayOut();
    }

    _animateSideNavOut() {
      let slideOutPercent = `${this.options.edge === 'left' ? -100 : 100}%`;

      Vel(this.el,
          {'translateX': [slideOutPercent, 0]},
          {duration: this.options.outDuration, queue: false, easing: 'easeOutQuad'});
    }

    /**
     * Teardown component
     */
    destroy() {

    }

  }

  /**
   * @static
   * @memberof SideNav
   * @type {Array.<SideNav>}
   */
  SideNav._sideNavs = [];

  window.Materialize.SideNav = SideNav;

  jQuery.fn.sideNav = function(methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (SideNav.prototype[methodOrOptions]) {
      // Getter methods
      if (methodOrOptions.slice(0,3) === 'get') {
        return this.first()[0].M_SideNav[methodOrOptions]();

        // Void methods
      } else {
        return this.each(function() {
          this.M_SideNav[methodOrOptions]();
        });
      }

      // Initialize plugin if options or no argument is passed in
    } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
      SideNav.init(this, arguments[0]);
      return this;

      // Return error if an unrecognized  method name is passed in
    } else {
      jQuery.error(`Method ${methodOrOptions} does not exist on jQuery.sideNav`);
    }
  };

})(cash, Materialize.Vel);
