(function($, Vel) {
  'use strict';

  let _defaults = {
    edge: 'left',
    closeOnClick: false,
    draggable: true,
    inDuration: 300,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
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
       * Describes if SideNav is fixed
       * @type {Boolean}
       */
      this.isFixed = this.el.classList.contains('side-nav-fixed');

      /**
       * Describes dragging state of SideNav
       * @type {Boolean}
       */
      this.dragging = false;

      this.el.M_SideNav = this;

      this._createOverlay();
      this._createDragTarget();
      this._setupEventHandlers();
      this._setupClasses();
      this._setupFixed();

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
      this._handleCloseDragBound = this._handleCloseDrag.bind(this);
      this._overlay.addEventListener('touchmove', this._handleCloseDragBound);
      this.el.addEventListener('touchmove', this._handleCloseDragBound);
      this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
      this._overlay.addEventListener('touchend', this._handleCloseReleaseBound);
      this.el.addEventListener('touchend', this._handleCloseReleaseBound);

      // Add resize for side nav fixed
      if (this.isFixed) {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener('resize', this._handleWindowResizeBound);
      }
    }

    _removeEventHandlers() {
      if (SideNav._sideNavs.length === 1) {
        document.body.removeEventListener('click', this._handleTriggerClick);
      }

      this.dragTarget.removeEventListener('touchmove', this._handleDragTargetDragBound);
      this.dragTarget.removeEventListener('touchend', this._handleDragTargetReleaseBound);
      this._overlay.removeEventListener('touchmove', this._handleCloseDragBound);
      this.el.removeEventListener('touchmove', this._handleCloseDragBound);
      this._overlay.removeEventListener('touchend', this._handleCloseReleaseBound);
      this.el.removeEventListener('touchend', this._handleCloseReleaseBound);

      // Remove resize for side nav fixed
      if (this.isFixed) {
        window.removeEventListener('resize', this._handleWindowResizeBound);
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
        Vel(this.el, 'stop');
        Vel(this._overlay, 'stop');
      }

      this.deltaX = Math.abs(this.xPos - clientX);
      this.xPos = clientX;
      this.velocityX = this.deltaX / (Date.now() - this.time);
      this.time = Date.now();

      let totalDeltaX = this.xPos - this.startingXpos;
      let dragDirection = totalDeltaX > 0 ? 'right' : 'left';
      totalDeltaX = Math.min(this.width, Math.abs(totalDeltaX));
      if (this.options.edge === dragDirection) {
        totalDeltaX = 0;
      }
      let transformX = totalDeltaX;
      let transformPrefix = 'translateX(-100%)';


      if (this.options.edge === 'right') {
        // totalDeltaX = -totalDeltaX;
        transformPrefix = 'translateX(100%)';
        transformX = -transformX;
      }


      this.percentOpen = Math.min(1, totalDeltaX / this.width);


      this.el.style.transform = `${transformPrefix} translateX(${transformX}px)`;
      this._overlay.style.opacity = this.percentOpen;
    }

    /**
     * Handle Drag Target Release
     * @param {Event} e
     */
    _handleDragTargetRelease(e) {
      if (this.dragging) {
        if (this.percentOpen > .5) {
          this.open();
        } else {
          this._animateOut();
        }

        this.dragging = false;
      }
    }

    /**
     * Handle Close Drag
     * @param {Event} e
     */
    _handleCloseDrag(e) {
      if (this.isOpen) {
        let clientX = e.targetTouches[0].clientX

        // Drag Start
        if (!this.dragging) {
          this.dragging = true;
          this.startingXpos = clientX;
          this.xPos = this.startingXpos;
          this.time = Date.now();
          this.width = this.el.getBoundingClientRect().width;
          this._overlay.style.display = 'block';
          Vel(this.el, 'stop');
          Vel(this._overlay, 'stop');
        }

        this.deltaX = Math.abs(this.xPos - clientX);
        this.xPos = clientX;
        this.velocityX = this.deltaX / (Date.now() - this.time);
        this.time = Date.now();

        let totalDeltaX = this.xPos - this.startingXpos;
        let dragDirection = totalDeltaX > 0 ? 'right' : 'left';
        totalDeltaX = Math.min(this.width, Math.abs(totalDeltaX));

        if (this.options.edge !== dragDirection) {
          totalDeltaX = 0;
        }
        let transformX = -totalDeltaX;


        if (this.options.edge === 'right') {
          transformX = -transformX;
        }


        this.percentOpen = Math.min(1, 1 - totalDeltaX / this.width);


        this.el.style.transform = `translateX(${transformX}px)`;
        this._overlay.style.opacity = this.percentOpen;
      }
    }

    /**
     * Handle Close Release
     * @param {Event} e
     */
    _handleCloseRelease(e) {
      if (this.isOpen && this.dragging) {
        if (this.percentOpen > .5) {
          this._animateIn();
        } else {
          this.close();
        }

        this.dragging = false;
      }
    }

    /**
     * Handle Window Resize
     * @param {Event} e
     */
    _handleWindowResize(e) {
      if (window.innerWidth > 992) {
        this.open();
      }
      else {
        this.close();
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

    _setupFixed() {
      if (this.isFixed && window.innerWidth > 992) {
        this.open();
      }
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

      // Callback
      if (typeof(this.options.onOpenStart) === 'function') {
        this.options.onOpenStart.call(this, this.el);
      }

      // Handle fixed sidenav
      if (this.isFixed && window.innerWidth > 992) {
        Vel(this.el, 'stop');
        Vel(this.el, {translateX: 0}, {duration: 0, queue: false});
        this._enableBodyScrolling();
        this._overlay.style.display = 'none';

      // Normal
      } else {
        this._preventBodyScrolling();

        if (!this.dragging || this.percentOpen != 1) {
          this._animateIn();
        }
      }
    }

    close() {
      if (this.isOpen === false) {
        return;
      }

      this.isOpen = false;

      // Callback
      if (typeof(this.options.onCloseStart) === 'function') {
        this.options.onCloseStart.call(this, this.el);
      }

      // Handle fixed sidenav
      if (this.isFixed && window.innerWidth > 992) {
        let transformX = this.options.edge === 'left' ? '-105%' : '105%';
        this.el.style.transform = `translateX(${transformX})`;

      // Normal
      } else {

        this._enableBodyScrolling();

        if (!this.dragging || this.percentOpen != 0) {
          this._animateOut();
        } else {
          this._overlay.style.display = 'none';
        }
      }
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

      Vel(this.el, 'stop');
      Vel(this.el,
        {'translateX': [0, `${slideOutPercent * 100}%`]},
        {duration: this.options.inDuration, queue: false, easing: 'easeOutQuad', complete: () => {
          // Callback
          if (typeof(this.options.onOpenEnd) === 'function') {
            this.options.onOpenEnd.call(this, this.el);
          }
        }});
    }

    _animateOverlayIn() {
      let start = 0;
      if (this.dragging) {
        start = this.percentOpen;
      } else {
        Vel.hook(this._overlay, 'display', 'block');
      }

      Vel(this._overlay, 'stop');
      Vel(this._overlay,
          {opacity: [1, start]},
          {duration: this.options.inDuration, queue: false, easing: 'easeOutQuad'});
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

      Vel(this.el, 'stop');
      Vel(this.el,
          {'translateX': [`${endPercent * 105}%`, `${slideOutPercent * 100}%`]},
          {duration: this.options.outDuration, queue: false, easing: 'easeOutQuad', complete: () => {
            // Callback
            if (typeof(this.options.onCloseEnd) === 'function') {
              this.options.onCloseEnd.call(this, this.el);
            }
          }});
    }

    _animateOverlayOut() {
      Vel(this._overlay, 'stop');
      Vel(this._overlay,
          'fadeOut',
          {duration: this.options.outDuration, queue: false, easing: 'easeOutQuad'});
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this._overlay.parentNode.removeChild(this._overlay);
      this.dragTarget.parentNode.removeChild(this.dragTarget);
      this.el.M_SideNav = undefined;
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
