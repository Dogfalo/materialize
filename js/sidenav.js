(function($, anim) {
  'use strict';

  let _defaults = {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
  };


  /**
   * @class
   */
  class Sidenav {
    /**
     * Construct Sidenav instance and set up overlay
     * @constructor
     * @param {Element} el
     * @param {Object} options
     */
    constructor (el, options) {
      // If exists, destroy and reinitialize
      if (!!el.M_Sidenav) {
        el.M_Sidenav.destroy();
      }

      this.el = el;
      this.$el = $(el);
      this.el.M_Sidenav = this;
      this.id = this.$el.attr('id');

      /**
       * Options for the Sidenav
       * @member Sidenav#options
       * @prop {String} [edge='left'] - Side of screen on which Sidenav appears
       * @prop {Boolean} [draggable=true] - Allow swipe gestures to open/close Sidenav
       * @prop {Number} [inDuration=250] - Length in ms of enter transition
       * @prop {Number} [outDuration=200] - Length in ms of exit transition
       * @prop {Function} onOpenStart - Function called when sidenav starts entering
       * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
       * @prop {Function} onCloseStart - Function called when sidenav starts exiting
       * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
       */
      this.options = $.extend({}, Sidenav.defaults, options);

      /**
       * Describes open/close state of Sidenav
       * @type {Boolean}
       */
      this.isOpen = false;

      /**
       * Describes if Sidenav is fixed
       * @type {Boolean}
       */
      this.isFixed = this.el.classList.contains('sidenav-fixed');

      /**
       * Describes if Sidenav is being draggeed
       * @type {Boolean}
       */
      this.isDragged = false;

      this._createOverlay();
      this._createDragTarget();
      this._setupEventHandlers();
      this._setupClasses();
      this._setupFixed();

      Sidenav._sidenavs.push(this);
    }

    static get defaults() {
      return _defaults;
    }

    static init($els, options) {
      let arr = [];
      $els.each(function() {
        arr.push(new Sidenav(this, options));
      });
      return arr;
    }

    /**
     * Get Instance
     */
    static getInstance(el) {
      let domElem = !!el.jquery ? el[0] : el;
      return domElem.M_Sidenav;
    }

    /**
     * Teardown component
     */
    destroy() {
      this._removeEventHandlers();
      this._overlay.parentNode.removeChild(this._overlay);
      this.dragTarget.parentNode.removeChild(this.dragTarget);
      this.el.M_Sidenav = undefined;

      let index = Sidenav._sidenavs.indexOf(this);
      if (index >= 0) {
        Sidenav._sidenavs.splice(index, 1);
      }
    }

    _createOverlay() {
      let overlay = document.createElement('div');
      this._closeBound = this.close.bind(this);
      overlay.classList.add('sidenav-overlay');

      overlay.addEventListener('click', this._closeBound);

      document.body.appendChild(overlay);
      this._overlay = overlay;
    }

    _setupEventHandlers() {
      if (Sidenav._sidenavs.length === 0) {
        document.body.addEventListener('click', this._handleTriggerClick);
      }

      this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
      this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
      this._handleCloseDragBound = this._handleCloseDrag.bind(this);
      this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
      this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this);

      this.dragTarget.addEventListener('touchmove', this._handleDragTargetDragBound);
      this.dragTarget.addEventListener('touchend', this._handleDragTargetReleaseBound);
      this._overlay.addEventListener('touchmove', this._handleCloseDragBound);
      this._overlay.addEventListener('touchend', this._handleCloseReleaseBound);
      this.el.addEventListener('touchmove', this._handleCloseDragBound);
      this.el.addEventListener('touchend', this._handleCloseReleaseBound);
      this.el.addEventListener('click', this._handleCloseTriggerClickBound);


      // Add resize for side nav fixed
      if (this.isFixed) {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener('resize', this._handleWindowResizeBound);
      }
    }

    _removeEventHandlers() {
      if (Sidenav._sidenavs.length === 1) {
        document.body.removeEventListener('click', this._handleTriggerClick);
      }

      this.dragTarget.removeEventListener('touchmove', this._handleDragTargetDragBound);
      this.dragTarget.removeEventListener('touchend', this._handleDragTargetReleaseBound);
      this._overlay.removeEventListener('touchmove', this._handleCloseDragBound);
      this._overlay.removeEventListener('touchend', this._handleCloseReleaseBound);
      this.el.removeEventListener('touchmove', this._handleCloseDragBound);
      this.el.removeEventListener('touchend', this._handleCloseReleaseBound);
      this.el.removeEventListener('click', this._handleCloseTriggerClickBound);

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
        let sidenavId = M.getIdFromTrigger($trigger[0]);

        let sidenavInstance = document.getElementById(sidenavId).M_Sidenav;
        if (sidenavInstance) {
          sidenavInstance.open($trigger);
        }
        e.preventDefault();
      }
    }


    /**
     * Set variables needed at the beggining of drag
     * and stop any current transition.
     * @param {Event} e
     */
    _startDrag(e) {
      let clientX = e.targetTouches[0].clientX;
      this.isDragged = true;
      this._startingXpos = clientX;
      this._xPos = this._startingXpos;
      this._time = Date.now();
      this._width = this.el.getBoundingClientRect().width;
      this._overlay.style.display = 'block';
      anim.remove(this.el);
      anim.remove(this._overlay);
    }


    /**
     * Set variables needed at each drag move update tick
     * @param {Event} e
     */
    _dragMoveUpdate(e) {
      let clientX = e.targetTouches[0].clientX;
      this.deltaX = Math.abs(this._xPos - clientX);
      this._xPos = clientX;
      this.velocityX = this.deltaX / (Date.now() - this._time);
      this._time = Date.now();
    }


    /**
     * Handles Dragging of Sidenav
     * @param {Event} e
     */
    _handleDragTargetDrag(e) {
      // If not being dragged, set initial drag start variables
      if (!this.isDragged) {
        this._startDrag(e);
      }

      // Run touchmove updates
      this._dragMoveUpdate(e);

      // Calculate raw deltaX
      let totalDeltaX = this._xPos - this._startingXpos;

      // dragDirection is the attempted user drag direction
      let dragDirection = totalDeltaX > 0 ? 'right' : 'left';

      // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
      totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
      if (this.options.edge === dragDirection) {
        totalDeltaX = 0;
      }


      /**
       * transformX is the drag displacement
       * transformPrefix is the initial transform placement
       * Invert values if Sidenav is right edge
       */
      let transformX = totalDeltaX;
      let transformPrefix = 'translateX(-100%)';
      if (this.options.edge === 'right') {
        transformPrefix = 'translateX(100%)';
        transformX = -transformX;
      }

      // Calculate open/close percentage of sidenav, with open = 1 and close = 0
      this.percentOpen = Math.min(1, totalDeltaX / this._width);

      // Set transform and opacity styles
      this.el.style.transform = `${transformPrefix} translateX(${transformX}px)`;
      this._overlay.style.opacity = this.percentOpen;
    }

    /**
     * Handle Drag Target Release
     */
    _handleDragTargetRelease() {
      if (this.isDragged) {
        if (this.percentOpen > .5) {
          this.open();
        } else {
          this._animateOut();
        }

        this.isDragged = false;
      }
    }

    /**
     * Handle Close Drag
     * @param {Event} e
     */
    _handleCloseDrag(e) {
      if (this.isOpen) {

        // If not being dragged, set initial drag start variables
        if (!this.isDragged) {
          this._startDrag(e);
        }

        // Run touchmove updates
        this._dragMoveUpdate(e);

        // Calculate raw deltaX
        let totalDeltaX = this._xPos - this._startingXpos;

        // dragDirection is the attempted user drag direction
        let dragDirection = totalDeltaX > 0 ? 'right' : 'left';

        // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
        totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
        if (this.options.edge !== dragDirection) {
          totalDeltaX = 0;
        }

        let transformX = -totalDeltaX;
        if (this.options.edge === 'right') {
          transformX = -transformX;
        }

        // Calculate open/close percentage of sidenav, with open = 1 and close = 0
        this.percentOpen = Math.min(1, 1 - totalDeltaX / this._width);

        // Set transform and opacity styles
        this.el.style.transform = `translateX(${transformX}px)`;
        this._overlay.style.opacity = this.percentOpen;
      }
    }

    /**
     * Handle Close Release
     */
    _handleCloseRelease() {
      if (this.isOpen && this.isDragged) {
        if (this.percentOpen > .5) {
          this._animateIn();
        } else {
          this.close();
        }

        this.isDragged = false;
      }
    }


    /**
     * Handles closing of Sidenav when element with class .sidenav-close
     */
    _handleCloseTriggerClick(e) {
      let $closeTrigger = $(e.target).closest('.sidenav-close');
      if ($closeTrigger.length) {
        this.close();
      }
    }

    /**
     * Handle Window Resize
     */
    _handleWindowResize() {
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
      body.style.overflow = '';
    }

    open() {
      if (this.isOpen === true) {
        return;
      }

      this.isOpen = true;

      // Run onOpenStart callback
      if (typeof(this.options.onOpenStart) === 'function') {
        this.options.onOpenStart.call(this, this.el);
      }

      // Handle fixed Sidenav
      if (this.isFixed && window.innerWidth > 992) {
        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: 0,
          duration: 0,
          easing: 'easeOutQuad'
        });
        this._enableBodyScrolling();
        this._overlay.style.display = 'none';

      // Handle non-fixed Sidenav
      } else {
        this._preventBodyScrolling();

        if (!this.isDragged || this.percentOpen != 1) {
          this._animateIn();
        }
      }
    }

    close() {
      if (this.isOpen === false) {
        return;
      }

      this.isOpen = false;

      // Run onCloseStart callback
      if (typeof(this.options.onCloseStart) === 'function') {
        this.options.onCloseStart.call(this, this.el);
      }

      // Handle fixed Sidenav
      if (this.isFixed && window.innerWidth > 992) {
        let transformX = this.options.edge === 'left' ? '-105%' : '105%';
        this.el.style.transform = `translateX(${transformX})`;

      // Handle non-fixed Sidenav
      } else {
        this._enableBodyScrolling();

        if (!this.isDragged || this.percentOpen != 0) {
          this._animateOut();
        } else {
          this._overlay.style.display = 'none';
        }
      }
    }

    _animateIn() {
      this._animateSidenavIn();
      this._animateOverlayIn();
    }

    _animateSidenavIn() {
      let slideOutPercent = this.options.edge === 'left' ? -1 : 1;
      if (this.isDragged) {
        slideOutPercent = this.options.edge === 'left' ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
      }

      anim.remove(this.el);
      anim({
        targets: this.el,
        translateX:  [`${slideOutPercent * 100}%`, 0],
        duration: this.options.inDuration,
        easing: 'easeOutQuad',
        complete: () => {
          // Run onOpenEnd callback
          if (typeof(this.options.onOpenEnd) === 'function') {
            this.options.onOpenEnd.call(this, this.el);
          }
        }
      });
    }

    _animateOverlayIn() {
      let start = 0;
      if (this.isDragged) {
        start = this.percentOpen;
      } else {
        $(this._overlay).css({
          display: 'block'
        });
      }

      anim.remove(this._overlay);
      anim({
        targets: this._overlay,
        opacity: [start, 1],
        duration: this.options.inDuration,
        easing: 'easeOutQuad'
      });
    }

    _animateOut() {
      this._animateSidenavOut();
      this._animateOverlayOut();
    }

    _animateSidenavOut() {
      let endPercent = this.options.edge === 'left' ? -1 : 1;
      let slideOutPercent = 0;
      if (this.isDragged) {
        slideOutPercent = this.options.edge === 'left' ? endPercent + this.percentOpen : endPercent - this.percentOpen;
      }

      anim.remove(this.el);
      anim({
        targets: this.el,
        translateX: [`${slideOutPercent * 100}%`, `${endPercent * 105}%`],
        duration: this.options.outDuration,
        easing: 'easeOutQuad',
        complete: () => {
          // Run onOpenEnd callback
          if (typeof(this.options.onCloseEnd) === 'function') {
            this.options.onCloseEnd.call(this, this.el);
          }
        }
      });
    }

    _animateOverlayOut() {
      anim.remove(this._overlay);
      anim({
        targets: this._overlay,
        opacity: 0,
        duration: this.options.outDuration,
        easing: 'easeOutQuad',
        complete: () => {
          $(this._overlay).css('display', 'none');
        }
      });
    }
  }

  /**
   * @static
   * @memberof Sidenav
   * @type {Array.<Sidenav>}
   */
  Sidenav._sidenavs = [];

  window.M.Sidenav = Sidenav;

  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Sidenav, 'sidenav', 'M_Sidenav');
  }

})(cash, M.anime);
