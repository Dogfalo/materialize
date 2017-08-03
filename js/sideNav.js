(function($, Vel) {
  'use strict';

  let _defaults = {
    edge: 'left',
    closeOnClick: false,
    draggable: true,
    inDuration: 1000,
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

      /**
       * Describes dragging state of SideNav
       * @type {Boolean}
       */
      this.dragging = false;

      this.$el[0].M_SideNav = this;

      this._createOverlay();
      this._createDragTarget();
      this._setupEventHandlers();
      this._setupClasses();

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

      this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
      this.dragTarget.addEventListener('touchmove', this._handleDragTargetDragBound);
      this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
      this.dragTarget.addEventListener('touchend', this._handleDragTargetReleaseBound);
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
        let sideNavId = Materialize.getIdFromTrigger($trigger[0]);
        console.log(sideNavId);

        let sideNavInstance = document.getElementById(sideNavId).M_SideNav;
        if (sideNavInstance) {
          sideNavInstance.open($trigger);
        }
        e.preventDefault();
      }
    }

    /**
     * Handle Drag Target Drag
     * @param {Event} e
     */
    _handleDragTargetDrag(e) {
      let clientX = e.targetTouches[0].clientX

      // Drag Start
      if (!this.dragging) {
        this.dragging = true;
        this.startingXpos = clientX;
        this.xPos = this.startingXpos;
        this.time = Date.now();
        this.width = this.el.getBoundingClientRect().width;
        this._overlay.style.display = 'block';
      }

      this.deltaX = Math.abs(this.xPos - clientX);
      this.xPos = clientX;
      this.velocityX = this.deltaX / (Date.now() - this.time);
      this.time = Date.now();

      let totalDeltaX = this.xPos - this.startingXpos;
      let transformPrefix = 'translateX(-100%)';
      if (this.options.edge === 'right') {
        // totalDeltaX = this.startingXpos - this.xPos;
        transformPrefix = 'translateX(100%)';
      }


      let transformX = Math.min(this.width, totalDeltaX);
      this.percentOpen = Math.min(1, Math.abs(totalDeltaX / this.width));

      if (totalDeltaX < 0) {
        transformX = 0;
        this.percentOpen = 0;
      }

      this.el.style.transform = `${transformPrefix} translateX(${transformX}px)`;
      this._overlay.style.opacity = this.percentOpen;
    }

    /**
     * Handle Drag Target Release
     * @param {Event} e
     */
    _handleDragTargetRelease(e) {
      if (this.percentOpen > .5) {
        this.open();
      } else {
        this._animateOut();
      }

      this.dragging = false;
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
      let slideOutPercent = this.options.edge === 'left' ? -1 : 1;
      if (this.dragging) {
        slideOutPercent = this.options.edge === 'left' ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
      }

      Vel(this.el,
        {'translateX': [0, `${slideOutPercent * 100}%`]},
        {duration: this.options.inDuration, queue: false, easing: 'easeOutQuad'});
    }

    _animateOverlayIn(opacity) {
      let start = 0;
      if (this.dragging) {
        start = this.percentOpen;
      } else {
        Vel.hook(this._overlay, 'display', 'block');
      }

      Vel(this._overlay,
          {opacity: [1, start]},
          {duration: this.options.inDuration, queue: false, easing: 'easeOutQuad'});
    }

    _animateOverlayOut(opacity) {
      Vel(this._overlay,
          'fadeOut',
          {duration: this.options.outDuration, queue: false, easing: 'easeOutQuad'});
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
      let endPercent = this.options.edge === 'left' ? -1 : 1;
      let slideOutPercent = 0;
      if (this.dragging) {
        slideOutPercent = this.options.edge === 'left' ? endPercent + this.percentOpen : endPercent - this.percentOpen;
      }

      Vel(this.el,
          {'translateX': [`${endPercent * 100}%`, `${slideOutPercent * 100}%`]},
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
